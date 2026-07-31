import MemberCard from "./MemberCard";
import MembersEmpty from "./MembersEmpty";

function MembersGrid({
  members,
  setSelectedMember,
  setPage,
}) {
  if (members.length === 0) {
    return <MembersEmpty />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          setSelectedMember={setSelectedMember}
          setPage={setPage}
        />
      ))}
    </div>
  );
}

export default MembersGrid;