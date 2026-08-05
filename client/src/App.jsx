import { useState, useEffect } from "react";
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";

import HomeDashboard from "./pages/HomeDashboard";
import MembersPage from "./pages/MembersPage";
import MemberProfile from "./pages/MemberProfile";
import AddMemberPage from "./pages/AddMemberPage";
import FeesPage from "./pages/FeesPage";
import AttendancePage from "./pages/AttendancePage";
import ExpiringMembersPage from "./pages/ExpiringMembersPage";
import OwnerProfile from "./pages/OwnerProfile";

import { toast } from "sonner";

import { getExpiryStatus } from "./utils/dateUtils";

import {
  deleteMemberById,
  markAttendanceById,
  receivePaymentById,
} from "./services/memberService";

import useMembers from "./hooks/useMembers";
import useDashboardStats from "./hooks/useDashboardStats";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import api from "./services/api";

import OtpVerification from "./components/OtpVerification";

function App() {
  /* ==========================================================
                        NAVIGATION
  ========================================================== */
  const navigate = useNavigate();
  const location = useLocation();                                                                   
  const [page, setPage] = useState("home");

  useEffect(() => {
  switch (location.pathname) {
    case "/":
      setPage("home");
      break;

    case "/add-member":
      setPage("add-member");
      break;

    case "/view-members":
      setPage("view-members");
      break;

    case "/fees":
      setPage("fees");
      break;

    case "/attendance":
      setPage("attendance");
      break;

    case "/expiring-members":
      setPage("expiring-members");
      break;

    case "/owner-profile":
      setPage("owner-profile");
      break;

    case "/member-profile":
      setPage("member-profile");
      break;

    default:
      setPage("home");
  }
}, [location.pathname]);

function navigatePage(nextPage) {
  setPage(nextPage);

  switch (nextPage) {
    case "home":
      navigate("/");
      break;

    case "add-member":
      navigate("/add-member");
      break;

    case "view-members":
      navigate("/view-members");
      break;

    case "fees":
      navigate("/fees");
      break;

    case "attendance":
      navigate("/attendance");
      break;

    case "expiring-members":
      navigate("/expiring-members");
      break;

    case "owner-profile":
      navigate("/owner-profile");
      break;

    case "member-profile":
      navigate("/member-profile");
      break;

    default:
      navigate("/");
  }
}


  const [selectedMember, setSelectedMember] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* ==========================================================
                      AUTHENTICATION
  ========================================================== */

  const [isLoggedIn, setIsLoggedIn] = useState(false);

const [loadingAuth, setLoadingAuth] =
  useState(true);

  const [authPage, setAuthPage] =
    useState("login");

  const [pendingEmail, setPendingEmail] =
  useState("");

  const [showOTP, setShowOTP] =
  useState(false);  

  function goTo(path) {
  navigate(path);
}

function goHome() {
  navigate("/");
}

    useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    

    if (!token) {
      setIsLoggedIn(false);
      setLoadingAuth(false);
      return;
    }

    try {
      const { data } = await api.get("/users/me");

      localStorage.setItem(
        "owner",
        JSON.stringify(data)
      );

      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);

      localStorage.removeItem("token");
      localStorage.removeItem("owner");

      setIsLoggedIn(false);
    } finally {
      setLoadingAuth(false);
    }
  };

  checkAuth();
}, []);

  /* ==========================================================
                    MEMBER FORM
  ========================================================== */

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [membership, setMembership] =
    useState("");
  const [phone, setPhone] = useState("");
  const [joinDate, setJoinDate] =
    useState("");
  const [amount, setAmount] = useState("");
  const [photo, setPhoto] = useState(null);

  const [status, setStatus] =
    useState("Unpaid");

  /* ==========================================================
                  SEARCH & FILTER
  ========================================================== */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  /* ==========================================================
                      EDIT MODE
  ========================================================== */

  const [isEditing, setIsEditing] =
    useState(false);

  const [editIndex, setEditIndex] =
    useState(null);

  /* ==========================================================
                    PAYMENT POPUP
  ========================================================== */

  const [showPaymentPopup,
    setShowPaymentPopup] =
    useState(false);

  const [paymentMember,
    setPaymentMember] =
    useState(null);

  const [paymentMethod,
    setPaymentMethod] =
    useState("Cash");

  /* ==========================================================
                    MEMBERS HOOK
  ========================================================== */

  const {
    members,
    setMembers,
    saveMember,
    editMember,
  } = useMembers();

  /* ==========================================================
                  PAYMENT HISTORY
  ========================================================== */

  const [paymentHistory,
    setPaymentHistory] =
    useState([]);

  /* ==========================================================
                  LOAD PAYMENT HISTORY
  ========================================================== */

  useEffect(() => {
    const savedHistory =
      localStorage.getItem(
        "paymentHistory"
      );

    if (savedHistory) {
      setPaymentHistory(
        JSON.parse(savedHistory)
      );
    }
  }, []);

  /* ==========================================================
                    API TEST
  ========================================================== */

    /* ==========================================================
                      SAVE MEMBER
  ========================================================== */

  async function handleSaveMember() {
    if (
      !name ||
      !age ||
      !membership ||
      !phone ||
      !joinDate ||
      !amount
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const expiryDate = new Date(joinDate);

    switch (membership) {
      case "1 Month":
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        break;

      case "3 Months":
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        break;

      case "6 Months":
        expiryDate.setMonth(expiryDate.getMonth() + 6);
        break;

      case "12 Months":
        expiryDate.setFullYear(
          expiryDate.getFullYear() + 1
        );
        break;

      default:
        break;
    }

    const memberData = {
      name,
      age,
      membership,
      phone,
      fees: Number(amount),
      joinDate,
      status,
      attendance: "Absent",
      expiryDate: expiryDate
        .toISOString()
        .split("T")[0],
    };

    const formData = new FormData();

    Object.entries(memberData).forEach(
      ([key, value]) => {
        formData.append(key, value);
      }
    );

    if (photo) {
      formData.append("photo", photo);
    }

    /* -------------------------
          UPDATE MEMBER
    -------------------------- */

    if (isEditing) {
      try {
        const data = await editMember(
          members[editIndex]._id,
          formData
        );

        toast.success(data.message);

        resetForm();
      } catch (err) {
        console.error(err);
        toast.error(
          err.message ||
            "Failed to update member"
        );
      }

      return;
    }

    /* -------------------------
            ADD MEMBER
    -------------------------- */

    try {
      const data =
        await saveMember(formData);

      toast.success(data.message);

      resetForm();
    } catch (err) {
      console.error(err);
      toast.error(
        err.message ||
          "Error saving member"
      );
    }
  }

  /* ==========================================================
                      RESET FORM
  ========================================================== */

  function resetForm() {
    setName("");
    setAge("");
    setMembership("");
    setPhone("");
    setJoinDate("");
    setAmount("");

    setStatus("Unpaid");

    setPhoto(null);

    setIsEditing(false);
    setEditIndex(null);

    navigatePage("view-members");
  }

  /* ==========================================================
                      START EDIT
  ========================================================== */

  function startEdit(member) {
    setName(member.name);
    setAge(member.age);
    setMembership(member.membership);
    setPhone(member.phone);
    setJoinDate(member.joinDate);
    setAmount(member.fees);

    setStatus(member.status);

    setPhoto(member.photo || null);

    const index = members.findIndex(
      (m) => m._id === member._id
    );

    setEditIndex(index);
    setIsEditing(true);

    navigatePage("add-member");
  }
    /* ==========================================================
                    DELETE MEMBER
  ========================================================== */

  async function deleteMember(memberId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteMemberById(memberId);

      toast.success(data.message);

      setMembers((prevMembers) =>
        prevMembers.filter(
          (member) => member._id !== memberId
        )
      );
    } catch (err) {
      console.error(err);
      toast.error(
        err.message ||
          "Failed to delete member"
      );
    }
  }

  /* ==========================================================
                RENEW MEMBERSHIP
  ========================================================== */

  async function handleRenewMembership({
    memberId,
    plan,
    paymentMethod,
    newExpiryDate,
  }) {
    // TODO:
    // Replace this with renewMemberById()
    // after backend API is created.

    const updatedMembers = members.map(
      (member) =>
        member._id === memberId
          ? {
              ...member,
              membership: plan.title,
              fees: plan.price,
              status: "Paid",
              paymentMethod,
              expiryDate: newExpiryDate,
            }
          : member
    );

    setMembers(updatedMembers);

    const payment = {
      id: Date.now(),
      memberId,
      amount: plan.price,
      plan: plan.title,
      paymentMethod,
      paymentDate:
        new Date().toLocaleDateString(
          "en-GB"
        ),
    };

    const updatedHistory = [
      payment,
      ...paymentHistory,
    ];

    setPaymentHistory(updatedHistory);

    localStorage.setItem(
      "paymentHistory",
      JSON.stringify(updatedHistory)
    );

    toast.success(
      "Membership renewed successfully"
    );
  }

  /* ==========================================================
                MARK ATTENDANCE
  ========================================================== */

  async function markAttendance(
    memberId,
    attendanceStatus
  ) {
    try {
      const member = members.find(
        (m) => m._id === memberId
      );

      if (!member) {
        toast.error("Member not found");
        return;
      }

      const updatedMember = {
        ...member,
        attendance: attendanceStatus,
      };

      const data =
        await markAttendanceById(
          memberId,
          updatedMember
        );

      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member._id === memberId
            ? data.member
            : member
        )
      );

      toast.success(
        `Attendance marked as ${attendanceStatus}`
      );
    } catch (err) {
      console.error(err);
      toast.error(
        "Failed to mark attendance"
      );
    }
  }

  /* ==========================================================
                RECEIVE PAYMENT
  ========================================================== */

  async function receivePayment() {
    if (!paymentMember) {
      toast.error("No member selected");
      return;
    }

    toast.info("Processing payment...");

    const updatedMember = {
  ...paymentMember,
  status: "Paid",
  paymentMethod,

  paymentHistory: [
    ...(paymentMember.paymentHistory || []),

    {
      amount: paymentMember.fees,
      paymentDate: new Date().toLocaleDateString("en-GB"),
      paymentMethod,
      plan: paymentMember.membership,
    },
  ],
};

    try {
      const data =
        await receivePaymentById(
          paymentMember._id,
          updatedMember
        );

      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member._id ===
          data.member._id
            ? data.member
            : member
        )
      );

      setShowPaymentPopup(false);
      setPaymentMember(null);
      setPaymentMethod("Cash");

      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error(
        err.message ||
          "Payment failed"
      );
    }
  }
    /* ==========================================================
                    AUTH PAGES
  ========================================================== */
  
  if (loadingAuth) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090B] text-white">
      Loading...
    </div>
  );
}

 if (!isLoggedIn) {
  if (showOTP) {
    return (
      <OtpVerification
        email={pendingEmail}
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  return authPage === "login" ? (
    <Login
      setIsLoggedIn={setIsLoggedIn}
      goToSignup={() => setAuthPage("signup")}
    />
  ) : (
    <Signup
      goToLogin={() => setAuthPage("login")}
      setPendingEmail={setPendingEmail}
      setShowOTP={setShowOTP}
    />
  );
}



  /* ==========================================================
                    PAGE ROUTING
  ========================================================== */

  switch (page) {
    case "add-member":
      return (
        <AddMemberPage
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          membership={membership}
          setMembership={setMembership}
          phone={phone}
          setPhone={setPhone}
          joinDate={joinDate}
          setJoinDate={setJoinDate}
          amount={amount}
          setAmount={setAmount}
          status={status}
          setStatus={setStatus}
          photo={photo}
          setPhoto={setPhoto}
          isEditing={isEditing}
          saveMember={handleSaveMember}
          setPage={navigatePage}
        />
      );
    
      
    case "member-profile":
      console.log("editMember in App:", editMember);
      return (
        <MemberProfile
          member={selectedMember}
          setPage={navigatePage}
          startEdit={startEdit}
          setMembers={setMembers}
          editMember={editMember}
        />
      );

    case "view-members":
      return (
        <MembersPage
          members={members}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          deleteMember={deleteMember}
          startEdit={startEdit}
          setPage={navigatePage}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
        />
      );

    case "fees":
      return (
        <FeesPage
          members={members}
          setPage={navigatePage}
          setPaymentMember={setPaymentMember}
          setShowPaymentPopup={setShowPaymentPopup}
          showPaymentPopup={showPaymentPopup}
          paymentMember={paymentMember}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          receivePayment={receivePayment}
        />
      );

    case "attendance":
      return (
        <AttendancePage
          members={members}
          setPage={navigatePage}
          markAttendance={markAttendance}
        />
      );

    case "expiring-members":
      return (
        <ExpiringMembersPage
          members={members}
          getExpiryStatus={getExpiryStatus}
          setPage={navigatePage}
          setSelectedMember={setSelectedMember}
        />
      );

    case "owner-profile":
      return (
        <OwnerProfile
          setPage={navigatePage}
        />
      );

    case "home":
    default:
      break;
  }

  /* ==========================================================
                  DASHBOARD STATISTICS
  ========================================================== */

  const {
    paidMembers,
    unpaidMembers,
  } = useDashboardStats(members);

  const totalFees = members.reduce(
    (sum, member) =>
      sum + Number(member.fees || 0),
    0
  );

  const presentMembers = members.filter(
    (member) =>
      member.attendance === "Present"
  ).length;

  const absentMembers =
    members.length - presentMembers;

  const expiringSoonMembers =
    members.filter((member) => {
      if (!member.expiryDate) return false;

      const today = new Date();
      const expiry = new Date(member.expiryDate);

      today.setHours(0, 0, 0, 0);
      expiry.setHours(0, 0, 0, 0);

      const diff = Math.ceil(
        (expiry - today) /
          (1000 * 60 * 60 * 24)
      );

      return diff >= 0 && diff <= 7;
    }).length;

  const todaysCollection = members
  .flatMap((member) => member.paymentHistory || [])
  .filter(
    (payment) =>
      payment.paymentDate ===
      new Date().toLocaleDateString("en-GB")
  )
  .reduce(
    (sum, payment) =>
      sum + Number(payment.amount || 0),
    0
  );

  /* ==========================================================
                    HOME DASHBOARD
  ========================================================== */

  return (
    <HomeDashboard
      page={page}
      setPage={navigatePage}
      members={members}
      paidMembers={paidMembers}
      unpaidMembers={unpaidMembers}
      totalFees={totalFees}
      todaysCollection={todaysCollection}
      presentMembers={presentMembers}
      absentMembers={absentMembers}
      expiringSoonMembers={
      expiringSoonMembers}
      sidebarOpen={sidebarOpen}
setSidebarOpen={setSidebarOpen}
setSelectedMember={setSelectedMember}
    />
  );
}

export default App;