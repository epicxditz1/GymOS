import { Calendar, Phone } from "lucide-react";

function RecentMembers({
  members,
  setSelectedMember,
  setPage,
}) {
  const recentMembers = [...members]
    .reverse()
    .slice(0, 5);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Recent Members
      </h2>

      {recentMembers.length === 0 ? (
        <p className="text-slate-400">
          No members added yet.
        </p>
      ) : (
        <div className="space-y-4">
          {recentMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => {
                setSelectedMember(member);
                setPage("member-profile");
              }}
              className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-800 p-4 transition-all duration-300 hover:border-cyan-500 hover:bg-slate-800"
            >
              <div className="flex items-center gap-4">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-white">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-white">
                    {member.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {member.membership}
                  </p>

                  <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Phone size={12} />
                      {member.phone}
                    </span>

                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {member.joinDate}
                    </span>
                  </div>
                </div>
              </div>

              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                View
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentMembers;