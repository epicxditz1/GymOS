function Card({
  children,
  className = "",
  hover = true,
}) {
  return (
    <div
      className={`
        bg-slate-900
        border
        border-slate-800
        rounded-3xl
        p-6
        shadow-lg
        transition-all
        duration-300
        ${
          hover
            ? "hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-cyan-500/10"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;