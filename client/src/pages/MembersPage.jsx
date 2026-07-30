function MembersPage({
  members,
  search,
  setSearch,
  setPage,
  statusFilter,
  setStatusFilter,
  deleteMember,
  startEdit,
}) {
  return (
    <div className="container">
      <h1>📋 All Members</h1>

      <input
        type="text"
        placeholder="🔍 Search Member"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Members</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
      </select>

      <br />
      <br />

      {members.length === 0 ? (
        <p>No Members Found</p>
      ) : (
        members
          .filter((member) => {
            const matchesSearch =
              member.name
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
              member.phone?.includes(search);

            const matchesStatus =
              statusFilter === "All" ||
              member.status === statusFilter;

            return matchesSearch && matchesStatus;
          })
          .map((member) => (
            <div key={member._id}>
              <h3>{member.name}</h3>

              <button
                onClick={() => deleteMember(member._id)}
              >
                🗑 Delete
              </button>

              <button
                onClick={() => startEdit(member)}
              >
                ✏️ Edit
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

export default MembersPage;