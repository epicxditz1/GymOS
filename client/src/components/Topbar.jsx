import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
  Activity,
} from "lucide-react";

function Topbar({ setSidebarOpen }) {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = today.getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <header className="sticky top-0 z-30 mb-8">

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0F172A]/90 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

        {/* Glow */}

        <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between px-5 md:px-7 py-5">

          {/* Left */}

          <div className="flex items-start gap-5">

            {/* Sidebar Button */}

            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10"
            >
              <Menu
                size={24}
                className="text-slate-300 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400"
              />
            </button>

            {/* Title */}

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1">

                  <Sparkles
                    size={14}
                    className="text-cyan-400"
                  />

                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                    GymOS
                  </span>

                </div>

                <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">

                  <Activity
                    size={14}
                    className="text-emerald-400"
                  />

                  <span className="text-xs font-semibold text-emerald-300">
                    Live Dashboard
                  </span>

                </div>

              </div>

              <h1 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-white">
                {greeting}, Mayank 👋
              </h1>

              <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-400">
                Welcome back to GymOS. Manage members, attendance,
                payments and daily operations from one dashboard.
              </p>

            </div>

          </div>

                    {/* Right */}

          <div className="flex flex-wrap items-center justify-end gap-4">

            {/* Search */}

            <button className="hidden lg:flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 text-slate-400 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400">

              <Search size={20} />

            </button>

            {/* Notifications */}

            <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 text-slate-400 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400">

              <Bell size={20} />

              <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_14px_#22d3ee]" />

            </button>

            {/* Date Card */}

            <div className="hidden xl:block rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-3">

              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">

                Today

              </p>

              <p className="mt-1 text-sm font-semibold text-white">

                {formattedDate}

              </p>

            </div>

            {/* Owner */}

            <button className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-2 pr-4 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 font-black text-white shadow-[0_10px_30px_rgba(34,211,238,0.35)]">

                M

              </div>

              <div className="hidden md:block text-left">

                <h3 className="text-sm font-bold text-white">

                  Mayank

                </h3>

                <p className="text-xs text-slate-400">

                  Gym Owner

                </p>

              </div>

              <ChevronDown
                size={18}
                className="hidden md:block text-slate-500 transition-transform duration-300 group-hover:rotate-180"
              />

            </button>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;