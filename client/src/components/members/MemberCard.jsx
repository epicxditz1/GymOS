import {
  Phone,
  Calendar,
  ChevronRight,
} from "lucide-react";

function MemberCard({
  member,
  setSelectedMember,
  setPage,
}) {
  const isExpired =
    new Date(member.expiryDate) < new Date();

  return (
    <div
      onClick={() => {
        setSelectedMember(member);
        setPage("member-profile");
      }}
      className="cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="h-16 w-16 rounded-full border-2 border-cyan-500 object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-2xl font-bold text-white">
              {member.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-white">
              {member.name}
            </h2>

            <p className="text-sm text-slate-400">
              {member.membership}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isExpired
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {isExpired ? "Expired" : "Active"}
          </span>

          <ChevronRight
            size={20}
            className="text-slate-500"
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-400">
          <Phone size={16} />
          <span>{member.phone}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <Calendar size={16} />
          <span>
            Joined: {member.joinDate}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <Calendar size={16} />
          <span>
            Expires: {member.expiryDate}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;