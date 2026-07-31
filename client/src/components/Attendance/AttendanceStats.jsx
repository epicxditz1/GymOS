import {
  Users,
  CheckCircle2,
  XCircle,
  CalendarCheck,
} from "lucide-react";

function AttendanceStats({
  totalMembers,
  presentMembers,
  absentMembers,
  attendancePercentage,
}) {
  const stats = [
    {
      title: "Total Members",
      value: totalMembers,
      icon: Users,
      iconColor: "text-cyan-400",
    },
    {
      title: "Present",
      value: presentMembers,
      icon: CheckCircle2,
      iconColor: "text-green-400",
    },
    {
      title: "Absent",
      value: absentMembers,
      icon: XCircle,
      iconColor: "text-red-400",
    },
    {
      title: "Attendance %",
      value: `${attendancePercentage}%`,
      icon: CalendarCheck,
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
          >
            <Icon
              size={34}
              className={`mb-4 ${stat.iconColor}`}
            />

            <p className="text-slate-400">
              {stat.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {stat.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default AttendanceStats;