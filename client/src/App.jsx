import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./Dashboard";
import Button from "./components/Button";
import MemberCard from "./components/MemberCard";
import Sidebar from "./components/Sidebar";
import HomeDashboard from "./pages/HomeDashboard";
import MembersPage from "./pages/MembersPage";
import {
  getMembers,
  addMember,
  updateMember,
  deleteMemberById,
  markAttendanceById,
  receivePaymentById,
} from "./services/memberService";
import useMembers from "./hooks/useMembers";
import AddMemberPage from "./pages/AddMemberPage";


function App() {
  // Navigation
  const [page, setPage] = useState("home");

  // Form Fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [membership, setMembership] = useState("");
  const [phone, setPhone] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [amount, setAmount] = useState("");
  const [photo, setPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
);
const [authPage, setAuthPage] = useState("login");

  // Member Status
  const [status, setStatus] = useState("Unpaid");

  // Members
  const {
  members,
  setMembers,
  saveMember,
  editMember,
} = useMembers();

  // Search
  const [search, setSearch] = useState("");

  // Edit
  const [isEditing, setIsEditing] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);
const [showHistory, setShowHistory] = useState(false);

const [showMemberDetails, setShowMemberDetails] = useState(false);
const [selectedDetailsMember, setSelectedDetailsMember] = useState(null);

  const [editIndex, setEditIndex] = useState(null);

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
const [paymentMember, setPaymentMember] = useState(null);
const [paymentMethod, setPaymentMethod] = useState("Cash");
const [sidebarOpen, setSidebarOpen] = useState(true);

  // Backend Message
  const [apiMessage, setApiMessage] = useState("");
   
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch((err) => console.error(err));
  }, []);
async function handleSaveMember() {
    console.log("isEditing:", isEditing);

  if (!name || !age || !membership || !phone || !joinDate || !amount) {
    alert("Please fill all fields!");
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
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
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
    expiryDate: expiryDate.toISOString().split("T")[0],
  };

  const formData = new FormData();

Object.keys(memberData).forEach((key) => {
  formData.append(key, memberData[key]);
});

console.log("PHOTO STATE:", photo);

if (photo) {
  formData.append("photo", photo);
}

for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
  // UPDATE MEMBER
  if (isEditing) {
    const updateFormData = new FormData();

Object.keys(memberData).forEach((key) => {
  updateFormData.append(key, memberData[key]);
});

if (photo) {
  updateFormData.append("photo", photo);
}

console.log("PHOTO STATE:", photo);

for (let pair of updateFormData.entries()) {
  console.log(pair[0], pair[1]);
}

try {
  const data = await editMember(
  members[editIndex]._id,
  updateFormData
);

  alert(data.message);

  resetForm();
} catch (err) {
  console.error(err);
  alert(err.message);
}

return;
    
  }

  // ADD MEMBER
  const token = localStorage.getItem("token");

try {
  const data = await saveMember(formData);

  alert(data.message);

  resetForm();
} catch (err) {
  console.error(err);
  alert("Error saving member");
}
  }
function resetForm() {
  setName("");
  setAge("");
  setMembership("");
  setPhone("");
  setJoinDate("");
  setAmount("");
  setStatus("Unpaid");

  setIsEditing(false);
  setEditIndex(null);

  setPage("view-members");
}
async function deleteMember(memberId) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this member?"
  );

  if (!confirmDelete) return;

  try {
    const data = await deleteMemberById(memberId);

    alert(data.message);

    setMembers((prevMembers) =>
      prevMembers.filter((member) => member._id !== memberId)
    );
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

async function markAttendance(index, attendanceStatus) {
  const member = members[index];

  const updatedMember = {
    ...member,
    attendance: attendanceStatus,
  };

 try {
  const data = await markAttendanceById(
    member._id,
    updatedMember
  );

  const updatedMembers = [...members];
  updatedMembers[index] = data.member;
  setMembers(updatedMembers);
} catch (err) {
  console.error(err);
}
}
function toggleFeeStatus(index) {
  const member = members[index];

  console.log("Toggle Status Clicked:", member.status);

  const newStatus =
    member.status === "Paid" ? "Unpaid" : "Paid";

  const updatedMember = {
    ...member,
    status: newStatus,
  };

  const token = localStorage.getItem("token");

fetch(`http://localhost:5000/api/members/${member._id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(updatedMember),
})

    .then((res) => res.json())
    .then((data) => {
      console.log("Returned Member:", data.member);
      console.log(
        "Returned Payment History:",
        data.member.paymentHistory
      );

      const updatedMembers = [...members];
      updatedMembers[index] = data.member;
      setMembers(updatedMembers);
    })
    .catch((err) => console.error(err));
}
async function receivePayment() {
  const updatedMember = {
    ...paymentMember,
    status: "Paid",
    paymentMethod: paymentMethod,
  };

  console.log(updatedMember);
  console.log("Selected Method:", paymentMethod);

  alert("Receive Payment button clicked!");

  // Token fetch ke bahar
  try {
  const data = await receivePaymentById(
    paymentMember._id,
    updatedMember
  );

  const updatedMembers = members.map((member) =>
    member._id === data.member._id ? data.member : member
  );

  setMembers(updatedMembers);
  setShowPaymentPopup(false);
} catch (err) {
  console.error(err);
}
}
function getExpiryStatus(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffInDays = Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 0) return "🔴 Expired";

  if (diffInDays <= 7)
    return `🟠 ${diffInDays} day(s) left`;

  return `🟢 Active (${diffInDays} day(s) left)`;
}
if (!isLoggedIn) {
  return authPage === "login" ? (
    <Login
      setIsLoggedIn={setIsLoggedIn}
      goToSignup={() => setAuthPage("signup")}
    />
  ) : (
    <Signup
      goToLogin={() => setAuthPage("login")}
    />
  );
}
if (page === "add-member") {
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
    setPage={setPage}
  />
);
}
if (page === "view-members") {
  return (
    <MembersPage
  members={members}
  search={search}
  setSearch={setSearch}
  setPage={setPage}
/>
  );
}
if (page === "fees") {
  return (
    <div className="container">
      <h1>💰 Fees Management</h1>

      {members.length === 0 ? (
        <p>No Members Found</p>
      ) : (
        members.map((member, index) => (
          <div key={member._id}>
            <h3>{member.name}</h3>

            <p>Amount: ₹{member.fees}</p>

            <p>Status: {member.status}</p>

           <button
  onClick={() => {
    setPaymentMember(member);
    setShowPaymentPopup(true);
  }}
>
  💵 Receive Payment
</button>
{/* TODO: Remove this button after payment flow is finalized */}
            <button onClick={() => toggleFeeStatus(index)}>
              Change Status
            </button>

            <hr />
          </div>
        ))
      )}

      {showPaymentPopup && paymentMember && (
  <div className="history-popup">
    <div className="history-box">

      <h2>💵 Receive Payment</h2>

      <h3>{paymentMember.name}</h3>

      <p>Amount: ₹{paymentMember.fees}</p>

      <p>Select Payment Method</p>

      <select
  value={paymentMethod}
  onChange={(e) => setPaymentMethod(e.target.value)}
>
  <option value="Cash">Cash</option>
  <option value="UPI">UPI</option>
  <option value="Card">Card</option>
</select>

      <br /><br />

     <button onClick={receivePayment}>
  ✅ Receive Payment
</button>

      <button
        onClick={() => setShowPaymentPopup(false)}
      >
        ❌ Cancel
      </button>

    </div>
  </div>
)}

      <button onClick={() => setPage("home")}>
        Back
      </button>
    </div>
  );
}
if (page === "attendance") {
  return (
    <div className="container">
      <h1>📅 Attendance</h1>

      <p>Total Members: {members.length}</p>

      {members.length === 0 ? (
        <p>No Members Found</p>
      ) : (
        members.map((member, index) => (
          <div
  key={member._id}
  className="attendance-card"
>

          {member.photo && (
  <img
    src={member.photo}
    alt={member.name}
    width="100"
    height="100"
    style={{
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #555",
    }}
  />
)}

            <h3>{member.name}</h3>

            <p>
              Attendance:{" "}
              {member.attendance || "Absent"}
            </p>

            <button
              onClick={() =>
                markAttendance(index, "Present")
              }
            >
              ✅ Present
            </button>

            <button
              onClick={() =>
                markAttendance(index, "Absent")
              }
            >
              ❌ Absent
            </button>

            <hr />
          </div>
        ))
      )}

      <button onClick={() => setPage("home")}>
        Back
      </button>
    </div>
  );
}
if (page === "expiring-members") {
  return (
    <div className="container">
      <h1>⚠️ Expiring Members</h1>

      {members.filter((member) => {
  if (!member.expiryDate) return false;

  const today = new Date();
  const expiry = new Date(member.expiryDate);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffInDays = Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  return diffInDays >= 0 && diffInDays <= 7;
}).length === 0 ? (
  <p>🎉 No memberships are expiring in the next 7 days.</p>
) : (
  members
    .filter((member) => {
      if (!member.expiryDate) return false;

      const today = new Date();
      const expiry = new Date(member.expiryDate);

      today.setHours(0, 0, 0, 0);
      expiry.setHours(0, 0, 0, 0);

      const diffInDays = Math.ceil(
        (expiry - today) / (1000 * 60 * 60 * 24)
      );

      return diffInDays >= 0 && diffInDays <= 7;
    })
    .map((member) => (
      <div key={member._id}>
        <h3>{member.name}</h3>
        <p>📞 {member.phone}</p>
        <p>{getExpiryStatus(member.expiryDate)}</p>
        <hr />
      </div>
    ))
)}

      <button onClick={() => setPage("home")}>
        Back
      </button>
    </div>
  );
}

const paidMembers = members.filter(
  (member) => member.status === "Paid"
).length;

const unpaidMembers = members.filter(
  (member) => member.status === "Unpaid"
).length;

const totalFees = members.reduce(
  (total, member) => total + Number(member.fees || 0),
  0
);

const today = new Date().toLocaleDateString("en-GB");

console.log("Today:", today);

const todaysCollection = members.reduce((total, member) => {
  const todayPayments =
  
    member.paymentHistory?.filter(
      (payment) => {
      console.log(
  "Payment:",
  JSON.stringify(payment.paymentDate),
  "Today:",
  JSON.stringify(today)
);

      const formattedDate = payment.paymentDate
  .split("/")
  .map((part, index) =>
    index < 2 ? part.padStart(2, "0") : part
  )
  .join("/");

return formattedDate === today;
    }
  ) || [];

  console.log("Today's Payments:", todayPayments);

  const todayTotal = todayPayments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  return total + todayTotal;
}, 0);

console.log("Members:", JSON.stringify(members, null, 2));

const presentMembers = members.filter(
  (member) => member.attendance === "Present"
).length;

const absentMembers = members.filter(
  (member) =>
    (member.attendance || "Absent") === "Absent"
).length;

const expiringSoonMembers = members.filter(
  (member) => {
    if (!member.expiryDate) return false;

    const today = new Date();
    const expiry = new Date(member.expiryDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const diffInDays = Math.ceil(
      (expiry - today) /
        (1000 * 60 * 60 * 24)
    );

    return diffInDays >= 0 && diffInDays <= 7;
  }
).length;
if (page === "home") {
  return (
    <HomeDashboard
  setPage={setPage}
  members={members}
  paidMembers={paidMembers}
  unpaidMembers={unpaidMembers}
  todaysCollection={todaysCollection}
  presentMembers={presentMembers}
  absentMembers={absentMembers}
  expiringSoonMembers={expiringSoonMembers}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>
  );
}
}

export default App;