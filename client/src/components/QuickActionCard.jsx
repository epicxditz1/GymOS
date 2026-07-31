import { ArrowUpRight } from "lucide-react";

function QuickActionCard({
  title,
  subtitle,
  icon: Icon,
  color = "cyan",
  onClick,
}) {
  const themes = {
    cyan: {
      iconBg:
        "bg-cyan-500/10 border border-cyan-500/20",
      icon: "text-cyan-400",
      hover: "hover:border-cyan-500/40",
      glow: "bg-cyan-500/15",
    },

    violet: {
      iconBg:
        "bg-violet-500/10 border border-violet-500/20",
      icon: "text-violet-400",
      hover: "hover:border-violet-500/40",
      glow: "bg-violet-500/15",
    },

    emerald: {
      iconBg:
        "bg-emerald-500/10 border border-emerald-500/20",
      icon: "text-emerald-400",
      hover: "hover:border-emerald-500/40",
      glow: "bg-emerald-500/15",
    },

    amber: {
      iconBg:
        "bg-amber-500/10 border border-amber-500/20",
      icon: "text-amber-400",
      hover: "hover:border-amber-500/40",
      glow: "bg-amber-500/15",
    },
  };

  const theme = themes[color];

  return (
    <button
      onClick={onClick}
      className={`
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.04]
        p-6
        text-left
        backdrop-blur-3xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_20px_60px_rgba(34,211,238,0.12)]
        ${theme.hover}
      `}
    >
      {/* Glow */}

      <div
        className={`
          absolute
          -right-10
          -top-10
          h-40
          w-40
          rounded-full
          blur-3xl
          opacity-0
          transition-all
          duration-500
          group-hover:opacity-100
          ${theme.glow}
        `}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">

        {/* Top */}

        <div className="flex items-start justify-between">

          <div
            className={`
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:rotate-6
              ${theme.iconBg}
            `}
          >
            <Icon
              size={28}
              strokeWidth={2.2}
              className={theme.icon}
            />
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">

            <ArrowUpRight
              size={18}
              className="text-slate-300"
            />

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-8">

          <h3 className="text-xl font-bold tracking-tight text-white">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            {subtitle}
          </p>

        </div>

      </div>

    </button>
  );
}

export default QuickActionCard;