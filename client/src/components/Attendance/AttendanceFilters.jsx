function AttendanceFilters({
  filter,
  setFilter,
}) {
  const filters = [
    "All",
    "Present",
    "Absent",
  ];

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`rounded-xl px-5 py-2 font-medium transition-all duration-300 ${
            filter === item
              ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
              : "bg-slate-900 border border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-white"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default AttendanceFilters;