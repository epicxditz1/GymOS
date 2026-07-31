import { ChevronRight } from "lucide-react";

function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
  onClick,
}) {
  const colors = {
    blue: "from-cyan-500/20 to-blue-600/5 border-cyan-400/20 text-cyan-400",
    green:
      "from-emerald-500/20 to-green-600/5 border-emerald-400/20 text-emerald-400",
    red: "from-red-500/20 to-red-600/5 border-red-400/20 text-red-400",
    orange:
      "from-orange-500/20 to-amber-600/5 border-orange-400/20 text-orange-400",
    purple:
      "from-violet-500/20 to-purple-600/5 border-violet-400/20 text-violet-400",
  };

  return (
    <div
      onClick={onClick}
      className={`
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      ${colors[color]}
      bg-gradient-to-br
      p-6
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      hover:shadow-cyan-500/10
      `}
    >
      {/* Glow */}
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-all" />

      {/* Top */}
      <div className="flex items-center justify-between">
        <div
          className={`rounded-2xl p-3 bg-white/5 backdrop-blur-md ${colors[color]}`}
        >
          <Icon size={26} />
        </div>

        <ChevronRight
          size={18}
          className="text-slate-500 group-hover:translate-x-1 transition-all"
        />
      </div>

      {/* Value */}
      <h1 className="mt-8 text-5xl font-black tracking-tight text-white">
        {value}
      </h1>

      {/* Title */}
      <p className="mt-2 uppercase tracking-[0.35em] text-xs text-slate-400">
        {title}
      </p>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between">
        <span className="text-sm text-slate-400">{subtitle}</span>

        <div
          className={`h-2 w-2 rounded-full animate-pulse ${colors[color]}`}
        />
      </div>
    </div>
  );
}

export default DashboardCard;