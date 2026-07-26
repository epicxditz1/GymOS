import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";
import './App.css'
import Button from './components/Button'

function App() {
  const [page, setPage] = useState("home")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [membership, setMembership] = useState("")
  const [phone, setPhone] = useState("")
  const [joinDate, setJoinDate] = useState("")
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Unpaid");
  const [apiMessage, setApiMessage] = useState("");

useEffect(() => {
  fetch("http://localhost:5000/api/members")
    .then((res) => res.json())
    .then((data) => {
      setMembers(data);
    })
    .catch((err) => {
      console.error("Error fetching members:", err);
    });
}, []);
useEffect(() => {
  fetch("/api")
    .then((res) => res.json())
    .then((data) => {
      setApiMessage(data.message);
    })
    .catch((err) => console.error(err));
}, []);
  function saveMember() {
  if (!name || !age || !membership || !phone || !joinDate || !amount) {
    alert("Please fill all fields!");
    return;
  }

 if (isEditing) {
  fetch(`http://localhost:5000/api/members/${members[editIndex]._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      age,
      membership,
      phone,
      fees: Number(amount),
      joinDate,
      status,
    }),
  })
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    })
    .then((data) => {
      alert(data.message);

      setMembers((prevMembers) =>
        prevMembers.map((member, index) =>
          index === editIndex ? data.member : member
        )
      );

      setIsEditing(false);
      setEditIndex(null);

      setName("");
      setAge("");
      setMembership("");
      setPhone("");
      setJoinDate("");
      setAmount("");
      setStatus("Unpaid");

      setPage("view-members");
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
    });

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

  const newMember = {
    name,
    age,
    membership,
    phone,
    joinDate,
    expiryDate: expiryDate.toISOString().split("T")[0],
    amount,
    status,
    attendance: "Absent",
  };

  fetch("http://localhost:5000/api/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      age,
      membership,
      phone,
      fees: Number(amount),
      joinDate,
      expiryDate: expiryDate.toISOString().split("T")[0],
    }),
  })
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    })
    .then((data) => {
      alert(data.message);

      setMembers((prevMembers) => [...prevMembers, data.member]);

      setName("");
      setAge("");
      setMembership("");
      setPhone("");
      setJoinDate("");
      setAmount("");
      setStatus("Unpaid");

      setPage("view-members");
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
    });
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
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}
function markAttendance(index, attendanceStatus) {
  const updatedMembers = [...members];

  updatedMembers[index].attendance = attendanceStatus;

  setMembers(updatedMembers);

  localStorage.setItem(
    "members",
    JSON.stringify(updatedMembers)
  );
}
function toggleFeeStatus(index) {
  const updatedMembers = [...members];

  updatedMembers[index].status =
    updatedMembers[index].status === "Paid"
      ? "Unpaid"
      : "Paid";

  setMembers(updatedMembers);

  localStorage.setItem(
    "members",
    JSON.stringify(updatedMembers)
  );
}
function getExpiryStatus(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffInDays = Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 0) {
    return "🔴 Expired";
  } else if (diffInDays <= 7) {
    return `🟠 ${diffInDays} day(s) left`;
  } else {
    return "🟢 Active";
  }
}
  if (page === "add-member") {
  return (
    <div className="container">
      <h1>👤 Add New Member</h1>

      <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}/>

      <br /><br />

      <input
         type="number"
         placeholder="Enter Age"
         min="14"
         max="80"
         value={age}
         onChange={(e) => setAge(e.target.value)}
      />

      <br /><br />

    <select
  value={membership}
  onChange={(e) => setMembership(e.target.value)}
>
  <option value="">Select Membership Plan</option>
  <option value="1 Month">1 Month</option>
  <option value="3 Months">3 Months</option>
  <option value="6 Months">6 Months</option>
  <option value="12 Months">12 Months</option>
</select>

    <br /><br />

    <input
        type="tel"
        placeholder="Enter Phone Number"
        value={phone}
       onChange={(e) => setPhone(e.target.value)}/>

      <br /><br />

      <input
        type="date"
        value={joinDate}
        onChange={(e) => setJoinDate(e.target.value)}
      />

      <br /><br />

      <input
  type="number"
  placeholder="Enter Fees Amount"
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
  )
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
          <div key={index}>
            <h3>{member.name}</h3>
            <p>Age: {member.age}</p>
            <p>Plan: {member.membership}</p>
            <p>Phone: {member.phone}</p>
            <p>Fees: ₹{member.fees}</p>
            <p>Status: {member.status}</p>
            <p>Join Date: {member.joinDate}</p>
            <p>Expiry Date: {member.expiryDate}</p>
            <p>Membership: {getExpiryStatus(member.expiryDate)}</p>
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

<br /><br />
            <button onClick={() => deleteMember(member._id)}>
  🗑 Delete
</button>

<br /><br />
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
  if (page === "fees") {
  return (
    <div className="container">
      <h1>💰 Fees Management</h1>

      {members.length === 0 ? (
  <p>No Members Found</p>
) : (
  members.map((member, index) => (
    <div key={index}>
      <h3>{member.name}</h3>

      <p>Amount: ₹{member.fees}</p>

      <p>Status: {member.status}</p>
      <button onClick={() => toggleFeeStatus(index)}>
  Change Status
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
if (page === "attendance") {
  return (
    <div className="container">
      <h1>📅 Attendance</h1>
      <p>Total Members: {members.length}</p>

      {members.length === 0 ? (
  <p>No Members Found</p>
) : (
  members.map((member, index) => (
    <div key={index}>
      <h3>{member.name}</h3>
      <p>Attendance: {member.attendance || "Absent"}</p>
      <button
  onClick={() => markAttendance(index, "Present")}
>
  ✅ Present
</button>

<button
  onClick={() => markAttendance(index, "Absent")}
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
  (total, member) => total + Number(member.amount || 0),
  0
);
const presentMembers = members.filter(
  (member) => member.attendance === "Present"
).length;

const absentMembers = members.filter(
  (member) => (member.attendance || "Absent") === "Absent"
).length;
const expiringSoonMembers = members.filter((member) => {
  if (!member.expiryDate) return false;

  const today = new Date();
  const expiry = new Date(member.expiryDate);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffInDays = Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  return diffInDays >= 0 && diffInDays <= 7;
}).length;
  return (
    <div className="container">

      <Dashboard title="GYM OS🏋️" />

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
      <p>Designed & developed by Mayank
           (@epicxditz1)</p>
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
  )
}

export default App