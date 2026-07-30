function MembersPage({
  members,
  search,
  setSearch,
  setPage,
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

      {members.length === 0 ? (
        <p>No Members Found</p>
      ) : (
        members
  .filter((member) =>
    member.name?.toLowerCase().includes(search.toLowerCase()) ||
    member.phone?.includes(search)
  )
  .map((member) => (
          <div key={member._id}>
            <h3>{member.name}</h3>
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