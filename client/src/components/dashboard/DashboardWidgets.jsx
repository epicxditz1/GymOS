import {
  IndianRupee,
  CalendarCheck,
  Clock3,
  TrendingUp,
} from "lucide-react";

function DashboardWidgets({
  todaysCollection,
  presentMembers,
  totalMembers,
  expiringSoonMembers,
}) {
  const attendancePercentage =
    totalMembers === 0
      ? 0
      : Math.round(
          (presentMembers / totalMembers) * 100
        );

  return (
    <div className="grid gap-6 lg:grid-cols-2">

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-3">
          <IndianRupee
            className="text-green-400"
            size={28}
          />
          <h2 className="text-xl font-bold">
            Today's Collection
          </h2>
        </div>

        <h3 className="text-5xl font-bold text-green-400">
          ₹{todaysCollection}
        </h3>

        <p className="mt-3 text-slate-400">
          Total payment received today.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-3">
          <CalendarCheck
            className="text-yellow-400"
            size={28}
          />
          <h2 className="text-xl font-bold">
            Attendance
          </h2>
        </div>

        <h3 className="text-5xl font-bold text-yellow-400">
          {attendancePercentage}%
        </h3>

        <p className="mt-3 text-slate-400">
          {presentMembers} of {totalMembers} members are present.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-3">
          <Clock3
            className="text-red-400"
            size={28}
          />
          <h2 className="text-xl font-bold">
            Expiring Soon
          </h2>
        </div>

        <h3 className="text-5xl font-bold text-red-400">
          {expiringSoonMembers}
        </h3>

        <p className="mt-3 text-slate-400">
          Memberships expiring within 7 days.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-3">
          <TrendingUp
            className="text-cyan-400"
            size={28}
          />
          <h2 className="text-xl font-bold">
            Growth
          </h2>
        </div>

        <h3 className="text-5xl font-bold text-cyan-400">
          🚀
        </h3>

        <p className="mt-3 text-slate-400">
          Analytics module coming in the next version.
        </p>
      </div>

    </div>
  );
}

export default DashboardWidgets;