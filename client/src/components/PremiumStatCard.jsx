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
      border: "hover:border-cyan-500/40 border-cyan-500/10",
      iconBg:
        "bg-cyan-500/10 group-hover:bg-cyan-500/20",
      icon: "text-cyan-400",
      glow:
        "from-cyan-500/20 via-cyan-500/5",
      shadow:
        "group-hover:shadow-cyan-500/20",
    },

    emerald: {
      border:
        "hover:border-emerald-500/40 border-emerald-500/10",
      iconBg:
        "bg-emerald-500/10 group-hover:bg-emerald-500/20",
      icon: "text-emerald-400",
      glow:
        "from-emerald-500/20 via-emerald-500/5",
      shadow:
        "group-hover:shadow-emerald-500/20",
    },

    amber: {
      border:
        "hover:border-amber-500/40 border-amber-500/10",
      iconBg:
        "bg-amber-500/10 group-hover:bg-amber-500/20",
      icon: "text-amber-400",
      glow:
        "from-amber-500/20 via-amber-500/5",
      shadow:
        "group-hover:shadow-amber-500/20",
    },

    violet: {
      border:
        "hover:border-violet-500/40 border-violet-500/10",
      iconBg:
        "bg-violet-500/10 group-hover:bg-violet-500/20",
      icon: "text-violet-400",
      glow:
        "from-violet-500/20 via-violet-500/5",
      shadow:
        "group-hover:shadow-violet-500/20",
    },

    rose: {
      border:
        "hover:border-rose-500/40 border-rose-500/10",
      iconBg:
        "bg-rose-500/10 group-hover:bg-rose-500/20",
      icon: "text-rose-400",
      glow:
        "from-rose-500/20 via-rose-500/5",
      shadow:
        "group-hover:shadow-rose-500/20",
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
        rounded-[30px]
        border
        bg-[#0B1220]/95
        backdrop-blur-3xl
        p-6
        min-h-[190px]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:scale-[1.02]
        hover:shadow-2xl
        ${theme.border}
        ${theme.shadow}
        ${onClick ? "cursor-pointer" : ""}
      `}
    >

      {/* Glow */}

      <div
        className={`
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-500
          bg-gradient-to-br
          ${theme.glow}
          to-transparent
        `}
      />

      {/* Blur Circle */}

      <div
        className={`
          absolute
          -right-10
          -top-10
          h-36
          w-36
          rounded-full
          ${theme.iconBg}
          blur-3xl
          opacity-40
        `}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">

        {/* Top */}

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">

              {title}

            </p>

            <h2 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight text-white">

              {value}

            </h2>

          </div>

          <div
            className={`
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-3xl
              ${theme.iconBg}
              transition-all
              duration-500
              group-hover:rotate-12
              group-hover:scale-110
            `}
          >

            <Icon
              size={30}
              strokeWidth={2.2}
              className={theme.icon}
            />

          </div>

        </div>
                {/* Bottom */}

        <div className="mt-8 border-t border-white/10 pt-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm leading-relaxed text-slate-400">

                {subtitle}

              </p>

              <div className="mt-3 flex items-center gap-2">

                <div
                  className={`
                    h-2.5
                    w-2.5
                    rounded-full
                    ${theme.iconBg}
                  `}
                />

                <span className="text-xs font-medium text-slate-500">

                  Live Data

                </span>

              </div>

            </div>

            <div
              className={`
                rounded-2xl
                border
                border-white/10
                px-3
                py-2
                text-xs
                font-semibold
                ${theme.icon}
                bg-white/5
                transition-all
                duration-300
                group-hover:scale-105
              `}
            >

              Active

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Glow */}

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

    </div>
  );
}

export default PremiumStatCard;