import { useState, useEffect } from "react";
import "./App.css";

import Dashboard from "./Dashboard";
import Button from "./components/Button";

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

  // Member Status
  const [status, setStatus] = useState("Unpaid");

  // Members
  const [members, setMembers] = useState([]);

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

  // Backend Message
  const [apiMessage, setApiMessage] = useState("");
    useEffect(() => {
    fetch("http://localhost:5000/api/members")
      .then((res) => res.json())
      .then((data) => {
  console.log("API Data:", data);
  setMembers(data);
  console.log("State Updated");
})
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch((err) => console.error(err));
  }, []);
  function saveMember() {
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

  // UPDATE MEMBER
  if (isEditing) {
    fetch(`http://localhost:5000/api/members/${members[editIndex]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);

        const updatedMembers = members.map((member) =>
          member._id === data.member._id ? data.member : member
        );

        setMembers(updatedMembers);

        resetForm();
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating member");
      });

    return;
  }

  // ADD MEMBER
  fetch("http://localhost:5000/api/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberData),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);

      setMembers([...members, data.member]);

      resetForm();
    })
    .catch((err) => {
      console.error(err);
      alert("Error saving member");
    });
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
    const res = await fetch(
      `http://localhost:5000/api/members/${memberId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    alert(data.message);

    setMembers((prevMembers) =>
      prevMembers.filter((member) => member._id !== memberId)
    );
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
function markAttendance(index, attendanceStatus) {
  const member = members[index];

  const updatedMember = {
    ...member,
    attendance: attendanceStatus,
  };

  fetch(`http://localhost:5000/api/members/${member._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedMember),
  })
    .then((res) => res.json())
    .then((data) => {
      const updatedMembers = [...members];
      updatedMembers[index] = data.member;
      setMembers(updatedMembers);
    })
    .catch((err) => console.error(err));
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

  fetch(`http://localhost:5000/api/members/${member._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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
function receivePayment() {
  const updatedMember = {
    ...paymentMember,
    status: "Paid",
    paymentMethod: paymentMethod,
  };

  console.log(updatedMember);
  console.log("Selected Method:", paymentMethod);

  alert("Receive Payment button clicked!");

  fetch(`http://localhost:5000/api/members/${paymentMember._id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(updatedMember),
})
  .then((res) => res.json())
  .then((data) => {
  console.log(data);

  const updatedMembers = members.map((member) =>
    member._id === data.member._id ? data.member : member
  );

  setMembers(updatedMembers);

  setShowPaymentPopup(false);
})
  .catch((err) => console.error(err));
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

  return "🟢 Active";
}
if (page === "add-member") {
  return (
    <div className="container">
      <h1>
        {isEditing ? "✏️ Edit Member" : "👤 Add New Member"}
      </h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
  type="file"
  accept="image/*"
  onChange={(e) => setPhoto(e.target.files[0])}
/>
{photo && (
  <>
    <p>✅ Selected: {photo.name}</p>

    <img
      src={URL.createObjectURL(photo)}
      alt="Preview"
      width="120"
      style={{ borderRadius: "10px" }}
    />
  </>
)}

<br /><br />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br /><br />

      <select
        value={membership}
        onChange={(e) => setMembership(e.target.value)}
      >
        <option value="">Select Membership</option>
        <option value="1 Month">1 Month</option>
        <option value="3 Months">3 Months</option>
        <option value="6 Months">6 Months</option>
        <option value="12 Months">12 Months</option>
      </select>

      <br /><br />

      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={joinDate}
        onChange={(e) => setJoinDate(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Fees"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Unpaid">❌ Unpaid</option>
        <option value="Paid">✅ Paid</option>
      </select>

      <br /><br />

      <button onClick={saveMember}>
        {isEditing ? "Update Member" : "Save Member"}
      </button>

      <br /><br />

      <button onClick={() => setPage("home")}>
        Back
      </button>
    </div>
  );
}
if (page === "view-members") {
  return (
    <div className="container">
      
      <h1>📋 All Members</h1>

      <input
        type="text"
        placeholder="🔍 Search Member"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      {members.length === 0 ? (
        <p>No Members Found</p>
      ) : (
        members
          .filter((member) =>
            member.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((member, index) => (
            <div key={member._id}>
              <h3>{member.name}</h3>

              <p>Age: {member.age}</p>
              <p>Plan: {member.membership}</p>
              <p>Phone: {member.phone}</p>
              <p>Fees: ₹{member.fees}</p>
              <p>Status: {member.status}</p>
              <p>Attendance: {member.attendance}</p>
              <p>Join Date: {member.joinDate}</p>
              <p>Expiry Date: {member.expiryDate}</p>
              <p>{getExpiryStatus(member.expiryDate)}</p>
              <br />
{/* TODO: Remove after View Details popup is finalized */}
<button
  onClick={() => {
  const latestMember = members.find(
  (m) => m._id === member._id
);

setSelectedMember(latestMember);
setShowHistory(true);
}}
>
  📜 Payment History
</button>

<br /><br />
<button
  onClick={() => {
    setSelectedDetailsMember(member);
    setShowMemberDetails(true);
  }}
>
  👁 View
</button>

              <button
                onClick={() => {
                  setEditIndex(index);
                  setIsEditing(true);

                  setName(member.name);
                  setAge(member.age);
                  setMembership(member.membership);
                  setPhone(member.phone);
                  setJoinDate(member.joinDate);
                  setAmount(member.fees);
                  setStatus(member.status);

                  setPage("add-member");
                }}
              >
                ✏️ Edit
              </button>

              <button
                onClick={() => deleteMember(member._id)}
              >
                🗑 Delete
              </button>

              <hr />
            </div>
          ))
      )}
      {showMemberDetails && selectedDetailsMember && (
  <div className="history-popup">
    <div className="history-box">

      <h2>👤 Member Details</h2>

      <button
  onClick={() => {
    setSelectedMember(selectedDetailsMember);
    setShowHistory(true);
  }}
>
  📜 Payment History
</button>

<br /><br />

      <h3>{selectedDetailsMember.name}</h3>

      <p>Age: {selectedDetailsMember.age}</p>
      <p>Phone: {selectedDetailsMember.phone}</p>
      <p>Plan: {selectedDetailsMember.membership}</p>
      <p>Fees: ₹{selectedDetailsMember.fees}</p>
      <p>Status: {selectedDetailsMember.status}</p>
      <p>Attendance: {selectedDetailsMember.attendance}</p>
      <p>Join Date: {selectedDetailsMember.joinDate}</p>
      <p>Expiry Date: {selectedDetailsMember.expiryDate}</p>

      <button onClick={() => setShowMemberDetails(false)}>
        Close
      </button>

    </div>
  </div>
)}
      {showHistory && selectedMember && (
  <div className="history-popup">
    <div className="history-box">
      <h2>📜 Payment History</h2>

      <h3>{selectedMember.name}</h3>

      {selectedMember.paymentHistory?.length > 0 ? (
  selectedMember.paymentHistory.map((payment, index) => (
    <div key={index}>
      <hr />
      <p>💰 Amount: ₹{payment.amount}</p>
      <p>📅 Date: {payment.paymentDate}</p>
      <p>💳 Method: {payment.paymentMethod}</p>
    </div>
  ))
) : (
  <p>No Payment History Found</p>
)}

      <button onClick={() => setShowHistory(false)}>
        Close
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
        ((member, index) => (
          <div key={member._id}>
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
return (
  
  <div className="container">
    <Dashboard title="GYM OS 🏋️" />

    <p>{apiMessage}</p>

    <h2>Gym Management System</h2>
    <p>Welcome Back 👋</p>
    <p>Your complete Gym Management Dashboard</p>

    <div className="dashboard-grid">

      <div className="dashboard-card">
        <h3>👥 Total Members</h3>
        <h1>{members.length}</h1>
      </div>

      <div className="dashboard-card">
  <h3>💸 Today's Collection</h3>
  <h1>₹{todaysCollection}</h1>
  
</div>

      <div className="dashboard-card">
        <h3>💰 Total Fees</h3>
        <h1>₹{totalFees}</h1>
      </div>

      <div className="dashboard-card">
        <h3>✅ Paid Members</h3>
        <h1>{paidMembers}</h1>
      </div>

      <div className="dashboard-card">
        <h3>❌ Unpaid Members</h3>
        <h1>{unpaidMembers}</h1>
      </div>

      <div className="dashboard-card">
        <h3>🟢 Present Today</h3>
        <h1>{presentMembers}</h1>
      </div>

      <div className="dashboard-card">
        <h3>🔴 Absent Today</h3>
        <h1>{absentMembers}</h1>
      </div>

      <div className="dashboard-card">
        <h3>⚠️ Expiring Soon</h3>
        <h1>{expiringSoonMembers}</h1>
      </div>

    </div>

    <p>Designed & Developed by Mayank (@epicxditz1)</p>

    <Button
      text="Add Member"
      onClick={() => setPage("add-member")}
    />

    <Button
      text="View Members"
      onClick={() => setPage("view-members")}
    />

    <Button
      text="Fees"
      onClick={() => setPage("fees")}
    />

    <Button
  text="Attendance"
  onClick={() => setPage("attendance")}
/>
</div>
);
}

export default App;