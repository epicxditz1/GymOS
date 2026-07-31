function ExpiringMembersPage({
  members,
  getExpiryStatus,
  setPage,
  setSelectedMember,
}) {
  const expiringMembers = members.filter((member) => {
    if (!member.expiryDate) return false;

    const today = new Date();
    const expiry = new Date(member.expiryDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const diffInDays = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    return diffInDays >= 0 && diffInDays <= 7;
  });

  return (
    <div className="container">
      <h1>⚠️ Expiring Members</h1>

      {expiringMembers.length === 0 ? (
        <p>🎉 No memberships are expiring in the next 7 days.</p>
      ) : (
        expiringMembers.map((member) => (
          <div key={member._id}>
  <h3>{member.name}</h3>
  <p>📞 {member.phone}</p>
  <p>{getExpiryStatus(member.expiryDate)}</p>

  <button
    onClick={() => {
      setSelectedMember(member);
      setPage("member-profile");
    }}
  >
    View Profile
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

export default ExpiringMembersPage;