import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
} from "lucide-react";

function Topbar({ setSidebarOpen }) {
  const today = new Date();

  const formattedDate = today.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <header className="mb-8">

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-3xl">

        {/* Glow */}

        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between px-7 py-5">

          {/* Left */}

          <div className="flex items-center gap-5">

            <button
              onClick={() =>
                setSidebarOpen((prev) => !prev)
              }
              className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10"
            >
              <Menu
                size={24}
                className="text-slate-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-400"
              />
            </button>

            <div>

              <div className="flex items-center gap-2">

                <Sparkles
                  size={16}
                  className="text-cyan-400"
                />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  GymOS
                </span>

              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-white">

                Dashboard

              </h1>

              <p className="mt-1 text-sm text-slate-400">

                Welcome back 👋 Manage your gym like a pro.

              </p>

            </div>

          </div>

          {/* Right */}

          <div className="flex items-center gap-4">

            {/* Search */}

            <button className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 text-slate-400 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400 md:flex">

              <Search size={20} />

            </button>

            {/* Notification */}

            <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 text-slate-400 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400">

              <Bell size={20} />

              <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />

            </button>

            {/* Date */}

            <div className="hidden rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-3 lg:block">

              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">

                Today

              </p>

              <p className="mt-1 text-sm font-semibold text-white">

                {formattedDate}

              </p>

            </div>

            {/* Profile */}

            <button className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-2 pr-4 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 font-bold text-white shadow-xl shadow-cyan-500/30">

                M

              </div>

              <div className="hidden text-left md:block">

                <h3 className="text-sm font-bold text-white">

                  Mayank

                </h3>

                <p className="text-xs text-slate-400">

                  Gym Owner

                </p>

              </div>

              <ChevronDown
                size={18}
                className="hidden text-slate-500 transition-transform duration-300 group-hover:rotate-180 md:block"
              />

            </button>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;