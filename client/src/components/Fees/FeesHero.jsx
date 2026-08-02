import {
  ArrowLeft,
  IndianRupee,
  Sparkles,
  Wallet,
} from "lucide-react";

function FeesHero({
  todaysCollection,
  totalRevenue,
  setPage,
}) {
  const hour = new Date().getHours();

  let greeting = "Good Evening 👋";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour < 17) {
    greeting = "Good Afternoon 👋";
  }

  return (
    <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#0B1220]/95 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)]">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-indigo-500/[0.05]" />

      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -right-20 -bottom-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[130px]" />

      <div className="relative flex flex-col gap-10 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">

        {/* Left */}

        <div className="flex-1">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

            <Sparkles
              size={14}
              className="text-cyan-400"
            />

            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">

              FEES MANAGEMENT

            </span>

          </div>

          <p className="mt-6 text-sm font-semibold tracking-wide text-cyan-400">

            {greeting}

          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight text-white lg:text-6xl">

            Fees Dashboard

          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">

            Track today's collections, pending payments,
            and manage all member fee records from one
            premium dashboard.

          </p>

          <div className="mt-10 flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 shadow-[0_0_35px_rgba(34,211,238,0.18)]">

              <Wallet
                size={30}
                className="text-cyan-400"
              />

            </div>

            <div>

              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">

                Today's Collection

              </p>

              <h2 className="mt-2 text-5xl font-black text-white">

                ₹{todaysCollection}

              </h2>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col gap-5 lg:w-[340px]">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">

                <IndianRupee
                  size={28}
                  className="text-emerald-400"
                />

              </div>

              <div>

                <p className="text-sm text-slate-400">

                  Total Revenue

                </p>

                <h3 className="mt-1 text-3xl font-black text-white">

                  ₹{totalRevenue}

                </h3>

              </div>

            </div>

          </div>

          <button
            onClick={() => setPage("home")}
            className="group flex items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] py-5 font-semibold transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10"
          >
            <ArrowLeft
              size={20}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Dashboard

          </button>

        </div>

      </div>

    </section>
  );
}

export default FeesHero;