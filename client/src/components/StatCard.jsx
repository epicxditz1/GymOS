function StatCard({
  title,
  value,
  icon,
  color,
  border,
}) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[28px]
        border ${border}
        bg-white/[0.04]
        p-6
        backdrop-blur-3xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-cyan-500/40
        hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]
      `}
    >
      {/* Glow */}

      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/20" />

      {/* Content */}

      <div className="relative z-10 flex h-full flex-col justify-between">

        {/* Top */}

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm font-medium tracking-wide text-slate-400">
              {title}
            </p>

            <h2
              className={`mt-4 text-5xl font-black tracking-tight ${color}`}
            >
              {value}
            </h2>

          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">

            {icon}

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-8 flex items-center justify-between">

          <span className="text-xs font-medium tracking-wide text-slate-500">
            Updated just now
          </span>

          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            Live
          </span>

        </div>

      </div>

    </div>
  );
}

export default StatCard;