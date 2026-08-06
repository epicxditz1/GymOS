import {
  Check,
  Crown,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";

function Subscription() {
  const plans = [
    {
      name: "Free Trial",
      price: "₹0",
      duration: "7 Days",
      description: "Explore GymOS before upgrading.",
      icon: Rocket,
      features: [
        "Unlimited Members",
        "Attendance Management",
        "Fees Management",
        "Dashboard Analytics",
      ],
      button: "Current Plan",
      disabled: true,
    },
    {
      name: "Monthly",
      price: "₹199",
      duration: "30 Days",
      description: "Perfect for growing gyms.",
      icon: Zap,
      features: [
        "Everything in Free Trial",
        "Unlimited Members",
        "Payment Tracking",
        "Membership Renewals",
        "Full GymOS Access",
      ],
      button: "Upgrade Monthly",
    },
    {
      name: "3 Months",
      price: "₹499",
      duration: "90 Days",
      description: "Best value for serious gym owners.",
      icon: Crown,
      features: [
        "Everything in Monthly",
        "Unlimited Members",
        "Payment Tracking",
        "Membership Renewals",
        "Full GymOS Access",
      ],
      button: "Choose Best Value",
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">

        {/* HERO */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            <Sparkles size={16} />
            GymOS Plans
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Plan
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Continue growing your gym without interruptions.
            Start free and upgrade whenever you're ready.
          </p>
        </div>

        {/* PLANS */}

        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col overflow-hidden rounded-[32px] border p-8 transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular
                    ? "border-cyan-500/50 bg-gradient-to-b from-cyan-500/10 to-[#0B1220] shadow-2xl shadow-cyan-500/10"
                    : "border-white/10 bg-[#0B1220]/95 hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                    Best Value
                  </div>
                )}

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
                  <Icon
                    size={30}
                    className="text-cyan-400"
                  />
                </div>

                <h2 className="mt-7 text-2xl font-black">
                  {plan.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {plan.description}
                </p>

                <div className="mt-7 flex items-end gap-3">
                  <span className="text-5xl font-black">
                    {plan.price}
                  </span>

                  <span className="pb-2 text-sm font-medium text-slate-500">
                    / {plan.duration}
                  </span>
                </div>

                {plan.popular && (
                  <div className="mt-4 inline-flex w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
                    Save ₹98
                  </div>
                )}

                <div className="my-8 h-px bg-white/10" />

                <div className="flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                        <Check
                          size={15}
                          className="text-emerald-400"
                        />
                      </div>

                      <span className="text-sm text-slate-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  disabled={plan.disabled}
                  className={`mt-10 h-14 rounded-2xl font-bold transition-all duration-300 ${
                    plan.disabled
                      ? "cursor-default border border-white/10 bg-white/5 text-slate-500"
                      : plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:-translate-y-1 hover:shadow-cyan-500/30"
                      : "border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-sm text-slate-500">
          Start with 7 days free. Upgrade only when you need continued access.
        </p>
      </div>
    </div>
  );
}

export default Subscription;