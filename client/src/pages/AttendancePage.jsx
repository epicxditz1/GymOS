function AttendancePage({
  members,
  setPage,
  markAttendance,
}) {
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
              Attendance: {member.attendance || "Absent"}
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

export default AttendancePage;