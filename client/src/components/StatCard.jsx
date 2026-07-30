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
        bg-slate-800/80
        backdrop-blur-md
        rounded-3xl
        border ${border}
        p-6
        h-40
        shadow-xl
        hover:-translate-y-2
        hover:shadow-cyan-500/10
        transition-all
        duration-300
      `}
    >
      <div className="flex justify-between items-start h-full">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">
              {title}
            </p>

            <h2 className={`text-5xl font-bold mt-3 ${color}`}>
              {value}
            </h2>
          </div>

          <p className="text-xs text-slate-500">
            Updated just now
          </p>
        </div>

        <div className="text-5xl opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;