import {
  Users,
  IndianRupee,
  CalendarCheck,
  Clock3,
} from "lucide-react";

function DashboardStats({
  totalMembers,
  todaysCollection,
  presentMembers,
  expiringSoonMembers,
}) {
  const stats = [
    {
      title: "Total Members",
      value: totalMembers,
      icon: Users,
      color: "text-cyan-400",
    },
    {
      title: "Today's Collection",
      value: `₹${todaysCollection}`,
      icon: IndianRupee,
      color: "text-green-400",
    },
    {
      title: "Today's Attendance",
      value: presentMembers,
      icon: CalendarCheck,
      color: "text-yellow-400",
    },
    {
      title: "Expiring Soon",
      value: expiringSoonMembers,
      icon: Clock3,
      color: "text-red-400",
    },
  ];

  return (
    <div className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {stat.value}
                </h2>
              </div>

              <div className="rounded-2xl bg-slate-800 p-4 transition-all duration-300 group-hover:scale-110">
                <Icon
                  size={30}
                  className={stat.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardStats;