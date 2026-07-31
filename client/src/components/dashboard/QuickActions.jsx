import {
  UserPlus,
  Wallet,
  CalendarCheck,
  Users,
} from "lucide-react";

function QuickActions({ setPage }) {
  const actions = [
    {
      title: "Add Member",
      icon: UserPlus,
      page: "add-member",
      color: "hover:border-cyan-500",
    },
    {
      title: "Members",
      icon: Users,
      page: "members",
      color: "hover:border-blue-500",
    },
    {
      title: "Fees",
      icon: Wallet,
      page: "fees",
      color: "hover:border-green-500",
    },
    {
      title: "Attendance",
      icon: CalendarCheck,
      page: "attendance",
      color: "hover:border-yellow-500",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="mb-5 text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => setPage(action.page)}
              className={`group rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left transition-all duration-300 hover:-translate-y-2 ${action.color}`}
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 transition-all duration-300 group-hover:scale-110">
                <Icon
                  size={28}
                  className="text-cyan-400"
                />
              </div>

              <h3 className="text-lg font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Open {action.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;