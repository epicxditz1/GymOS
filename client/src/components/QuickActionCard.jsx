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
        "bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20",
      icon: "text-cyan-400",
      hover:
        "hover:border-cyan-500/40 hover:shadow-cyan-500/20",
      glow:
        "from-cyan-500/20 via-cyan-500/5",
      badge:
        "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
    },

    violet: {
      iconBg:
        "bg-violet-500/10 border border-violet-500/20 group-hover:bg-violet-500/20",
      icon: "text-violet-400",
      hover:
        "hover:border-violet-500/40 hover:shadow-violet-500/20",
      glow:
        "from-violet-500/20 via-violet-500/5",
      badge:
        "text-violet-300 bg-violet-500/10 border-violet-500/20",
    },

    emerald: {
      iconBg:
        "bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20",
      icon: "text-emerald-400",
      hover:
        "hover:border-emerald-500/40 hover:shadow-emerald-500/20",
      glow:
        "from-emerald-500/20 via-emerald-500/5",
      badge:
        "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    },

    amber: {
      iconBg:
        "bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20",
      icon: "text-amber-400",
      hover:
        "hover:border-amber-500/40 hover:shadow-amber-500/20",
      glow:
        "from-amber-500/20 via-amber-500/5",
      badge:
        "text-amber-300 bg-amber-500/10 border-amber-500/20",
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
        rounded-[30px]
        border
        border-white/10
        bg-[#0B1220]/95
        backdrop-blur-3xl
        p-7
        text-left
        transition-all
        duration-500
        hover:-translate-y-2
        hover:scale-[1.02]
        hover:shadow-2xl
        ${theme.hover}
      `}
    >
      {/* Background Glow */}

      <div
        className={`
          absolute
          inset-0
          opacity-0
          transition-all
          duration-500
          group-hover:opacity-100
          bg-gradient-to-br
          ${theme.glow}
          to-transparent
        `}
      />

      {/* Blur Circle */}

      <div
        className={`
          absolute
          -right-12
          -top-12
          h-44
          w-44
          rounded-full
          blur-3xl
          opacity-40
          ${theme.iconBg}
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
              rounded-3xl
              transition-all
              duration-500
              group-hover:rotate-12
              group-hover:scale-110
              ${theme.iconBg}
            `}
          >
            <Icon
              size={30}
              strokeWidth={2.2}
              className={theme.icon}
            />
          </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-white/20">

            <ArrowUpRight
              size={18}
              className="text-slate-300 transition-transform duration-300 group-hover:rotate-45"
            />

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-8">

          <div
            className={`
              inline-flex
              items-center
              rounded-full
              border
              px-3
              py-1
              text-[11px]
              font-bold
              uppercase
              tracking-[0.18em]
              ${theme.badge}
            `}
          >
            Quick Action
          </div>

          <h3 className="mt-5 text-2xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-white">

            {title}

          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-400">

            {subtitle}

          </p>

        </div>

        {/* Bottom Status */}

        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">

          <span className="text-xs font-medium tracking-wide text-slate-500">

            Click to Continue

          </span>

          <div
            className={`
              h-2.5
              w-2.5
              rounded-full
              ${theme.iconBg}
            `}
          />

        </div>

      </div>

      {/* Bottom Animated Border */}

      <div
        className={`
          absolute
          bottom-0
          left-0
          h-[3px]
          w-0
          bg-gradient-to-r
          ${theme.glow}
          to-transparent
          transition-all
          duration-500
          group-hover:w-full
        `}
      />

    </button>
  );
}

export default QuickActionCard;