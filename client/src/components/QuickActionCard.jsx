function QuickActionCard({
  title,
  icon,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        bg-slate-800
        hover:bg-slate-700
        rounded-3xl
        h-40
        p-6
        flex
        flex-col
        justify-center
        items-center
        border
        border-slate-700
        shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      <div className="text-5xl">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold">
        {title}
      </h3>
    </button>
  );
}

export default QuickActionCard;