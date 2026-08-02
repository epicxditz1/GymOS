import {
  TrendingUp,
  Wallet,
  CalendarDays,
  Sparkles,
  ArrowUpRight,
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
    <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0B1220]/95 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)]">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-indigo-500/[0.05]" />

      <div className="absolute -left-24 -top-16 h-60 w-60 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -right-20 -bottom-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[130px]" />

      <div className="relative flex flex-col gap-8 px-8 py-8 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}

        <div className="flex-1 max-w-3xl">

         

          <p className="text-cyan-400 text-sm font-semibold">

{greeting}

</p>
<h1 className="mt-2 max-w-2xl text-3xl font-black tracking-tight text-white lg:text-5xl">
          
                      {title}
          </h1>
<p className="mt-3 max-w-xl text-slate-400 leading-7">
          

            {subtitle}

          </p>

          {/* Revenue */}

          <div className="mt-8 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 shadow-[0_0_35px_rgba(34,211,238,0.18)]">

              <Wallet
                size={24}
                className="text-cyan-400"
              />

            </div>

            <div>

              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">

                Today's Collection

              </p>

              <h2 className="mt-1 text-4xl font-black tracking-tight text-white">

                ₹{amount}

              </h2>

            </div>

          </div>

        </div>

        {/* RIGHT */}

                {/* RIGHT */}

        <div className="mt-8 flex flex-wrap gap-4 lg:mt-10">

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Revenue
            </p>

            <p className="mt-2 text-lg font-bold text-white">
              Live Tracking
            </p>

          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Attendance
            </p>

            <p className="mt-2 text-lg font-bold text-white">
              Daily Status
            </p>

          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              Members
            </p>

            <p className="mt-2 text-lg font-bold text-white">
              Active Database
            </p>

          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Renewals
            </p>

            <p className="mt-2 text-lg font-bold text-white">
              Expiring Plans
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroCard;