import {
  TrendingUp,
  Wallet,
  CalendarDays,
} from "lucide-react";

function HeroCard({
  amount,
  title,
  subtitle,
}) {
  const hour = new Date().getHours();

  let greeting = "Good Evening 👋";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour < 17) {
    greeting = "Good Afternoon 👋";
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#0F172A]/95 backdrop-blur-xl p-6 lg:p-8">

      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Side */}
        <div className="flex-1">

          <p className="text-sm font-medium tracking-wide text-cyan-400">
            {greeting}
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {title}
          </h1>

          <p className="mt-3 max-w-xl text-slate-400">
            {subtitle}
          </p>

          <div className="mt-8 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

              <Wallet
                className="text-cyan-400"
                size={28}
              />

            </div>

            <div>

              <p className="text-sm text-slate-400">
                Today's Revenue
              </p>

              <h2 className="mt-1 text-3xl font-bold text-white">
                ₹{amount}
              </h2>

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="grid grid-cols-2 gap-4 lg:w-[360px]">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:border-emerald-500/40">

            <div className="flex items-center gap-2 text-emerald-400">

              <TrendingUp size={18} />

              <span className="text-sm font-semibold">
                Revenue
              </span>

            </div>

            <p className="mt-4 text-lg font-semibold text-white">
              Updated Today
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Live collection data
            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:border-cyan-500/40">

            <div className="flex items-center gap-2 text-cyan-400">

              <CalendarDays size={18} />

              <span className="text-sm font-semibold">
                Today
              </span>

            </div>

            <p className="mt-4 text-lg font-semibold text-white">
              Daily Overview
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Manage today's activity
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default HeroCard;