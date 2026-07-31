import { CalendarDays, Sparkles } from "lucide-react";

function DashboardHeader() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-3xl">

      {/* Background Glow */}

      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 backdrop-blur-xl">

            <Sparkles
              size={15}
              className="text-cyan-400"
            />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              GymOS Dashboard
            </span>

          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-white">

            Welcome Back 👋

          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">

            Monitor members, revenue, attendance and
            daily activities from one powerful dashboard.

          </p>

        </div>

        {/* Right */}

        <div className="flex flex-col gap-4">

          <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-900/50 px-6 py-5 backdrop-blur-2xl">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">

              <CalendarDays
                size={22}
                className="text-white"
              />

            </div>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">

                Today

              </p>

              <p className="mt-1 text-base font-semibold text-white">

                {formattedDate}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardHeader;