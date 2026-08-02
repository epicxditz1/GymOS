import {
  LayoutDashboard,
  Users,
  CreditCard,
  CalendarCheck,
  TriangleAlert,
  UserCircle,
  LogOut,
  Dumbbell,
  Sparkles,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({
  setPage,
  page,
  sidebarOpen,
  setSidebarOpen,
})
{

  const navigate = useNavigate();
const location = useLocation();

  const menuItems = [
    {
      id: "home",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "view-members",
      label: "Members",
      icon: Users,
    },
    {
      id: "fees",
      label: "Fees",
      icon: CreditCard,
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: CalendarCheck,
    },
    {
      id: "expiring-members",
      label: "Expiring",
      icon: TriangleAlert,
    },
    {
      id: "owner-profile",
      label: "Owner Profile",
      icon: UserCircle,
    },
  ];

  return (
    <>
      {/* Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-hidden border-r border-white/10 bg-[#050816]/95 backdrop-blur-3xl transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Glow */}

        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-indigo-500/10 blur-[120px]" />

        {/* Logo */}

        <div className="relative border-b border-white/10 p-7">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 shadow-[0_0_35px_rgba(34,211,238,0.35)]">

              <Dumbbell
                size={30}
                className="text-white"
              />

            </div>

            <div>

              <div className="flex items-center gap-2">

                <Sparkles
                  size={14}
                  className="text-cyan-400"
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Premium SaaS
                </span>

              </div>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-white">
                GymOS
              </h1>

              <p className="text-sm text-slate-400">
                Smart Gym Management
              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}

        <div className="relative flex-1 space-y-3 px-5 py-7">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
  item.id === "home"
    ? location.pathname === "/" || location.pathname === "/home"
    : location.pathname === "/" + item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
  navigate(item.id === "home" ? "/" : "/" + item.id);
  setSidebarOpen(false);
}}

                className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl px-5 py-4 transition-all duration-300 ${
                  active
                    ? "border border-cyan-500/30 bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-300 shadow-[0_10px_30px_rgba(34,211,238,0.12)]"
                    : "border border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-cyan-400" />
                )}

                <Icon
                  size={22}
                  className={`transition-all duration-300 ${
                    active
                      ? "scale-110"
                      : "group-hover:scale-110 group-hover:rotate-6"
                  }`}
                />

                <span className="font-semibold tracking-wide">
                  {item.label}
                </span>

              </button>
            );
          })}

        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 p-5">

          {/* Owner */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-black text-white shadow-lg shadow-cyan-500/30">

                M

              </div>

              <div>

                <h3 className="font-bold text-white">
                  Mayank
                </h3>

                <p className="text-xs text-slate-400">
                  Gym Owner
                </p>

              </div>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            className="group mt-5 flex w-full items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 py-4 font-semibold text-red-400 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500 hover:text-white">
            <LogOut
              size={20}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Logout

          </button>

          {/* Footer */}

          <div className="mt-6 border-t border-white/10 pt-5 text-center">

            <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
              GYMOS v1.0
            </p>

            <p className="mt-2 text-[11px] text-slate-600">
              Created with ❤️ by Mayank (@epicxditz1)
            </p>

          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;