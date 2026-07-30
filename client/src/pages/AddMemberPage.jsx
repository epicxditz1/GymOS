function AddMemberPage({
  name,
  setName,
  age,
  setAge,
  membership,
  setMembership,
  phone,
  setPhone,
  joinDate,
  setJoinDate,
  amount,
  setAmount,
  status,
  setStatus,
  photo,
  setPhoto,
  isEditing,
  saveMember,
  setPage,
}) {
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
  name="photo"
  accept="image/*"
  onChange={(e) => {
    console.log("Selected file:", e.target.files[0]);
    setPhoto(e.target.files[0]);
  }}
/>

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

export default AddMemberPage;