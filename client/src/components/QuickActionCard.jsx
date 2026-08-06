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
        border-slate-800
        bg-[#0B1220]/95
        backdrop-blur-3xl
        p-6 h-full
        text-left
        transition-all
        duration-500
        hover:-translate-y-3
        hover:scale-[1.03]
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

        <div className="flex items-center">

          <div
            className={`
              flex
              h-14
              w-14
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
              size={26}
              strokeWidth={2.2}
              className={theme.icon}
            />
          </div>

        </div>

        {/* Bottom */}

        <div className="mt-8">

          <h3 className="mt-2 text-xl font-bold text-white">

            {title}

          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-400">

            {subtitle}

          </p>

        </div>

        {/* Bottom Status */}

        {/* Bottom */}

<div className="mt-8 border-t border-white/10 pt-5">

  <div className="flex items-center justify-between">

    <span className="text-sm font-semibold text-slate-300 transition-colors group-hover:text-white">
      Open
    </span>

    <ArrowUpRight
      size={18}
      className="text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
    />

  </div>

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