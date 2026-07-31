function PremiumStatCard({
  title,
  value,
  icon: Icon,
  color = "cyan",
  subtitle,
  onClick,
}) {
  const colors = {
    cyan: {
      border: "hover:border-cyan-500/40",
      iconBg: "bg-cyan-500/10",
      icon: "text-cyan-400",
      glow: "from-cyan-500/20",
    },

    emerald: {
      border: "hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/10",
      icon: "text-emerald-400",
      glow: "from-emerald-500/20",
    },

    amber: {
      border: "hover:border-amber-500/40",
      iconBg: "bg-amber-500/10",
      icon: "text-amber-400",
      glow: "from-amber-500/20",
    },

    rose: {
      border: "hover:border-rose-500/40",
      iconBg: "bg-rose-500/10",
      icon: "text-rose-400",
      glow: "from-rose-500/20",
    },

    violet: {
      border: "hover:border-violet-500/40",
      iconBg: "bg-violet-500/10",
      icon: "text-violet-400",
      glow: "from-violet-500/20",
    },
  };

  const theme = colors[color];

  return (
    <div
      onClick={onClick}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-[#0F172A]/95
        backdrop-blur-xl
        p-5
        min-h-[165px]
        transition-all
        duration-300
        hover:-translate-y-1.5
        hover:scale-[1.02]
        hover:shadow-2xl
        ${theme.border}
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {/* Hover Glow */}
      <div
        className={`
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
          bg-gradient-to-br
          ${theme.glow}
          to-transparent
        `}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400 tracking-wide">
              {title}
            </p>

            <h2 className="mt-2 text-3xl lg:text-4xl font-bold tracking-tight text-white">
              {value}
            </h2>
          </div>

          <div
            className={`
              h-12
              w-12
              rounded-2xl
              ${theme.iconBg}
              flex
              items-center
              justify-center
              transition-transform
              duration-300
              group-hover:rotate-6
              group-hover:scale-110
            `}
          >
            <Icon
              className={theme.icon}
              size={24}
              strokeWidth={2.2}
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 border-t border-slate-800 pt-3">
          <p className="text-sm text-slate-500 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PremiumStatCard;