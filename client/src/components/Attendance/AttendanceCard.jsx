import {
  CheckCircle2,
  XCircle,
  Phone,
} from "lucide-react";

function AttendanceCard({
  member,
  markAttendance,
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40">
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

            <div className="mt-2 flex items-center gap-2 text-slate-400">
              <Phone size={15} />
              <span>{member.phone}</span>
            </div>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            member.attendance
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {member.attendance ? "Present" : "Absent"}
        </span>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => markAttendance(member.id, true)}
          disabled={member.attendance}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all ${
            member.attendance
              ? "cursor-not-allowed bg-green-500 text-white"
              : "bg-slate-800 text-white hover:bg-green-500"
          }`}
        >
          <CheckCircle2 size={18} />
          Present
        </button>

        <button
          onClick={() => markAttendance(member.id, false)}
          disabled={!member.attendance}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all ${
            !member.attendance
              ? "cursor-not-allowed bg-red-500 text-white"
              : "bg-slate-800 text-white hover:bg-red-500"
          }`}
        >
          <XCircle size={18} />
          Absent
        </button>
      </div>
    </div>
  );
}

export default AttendanceCard;