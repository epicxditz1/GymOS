function Topbar() {
  return (
    <div className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-8">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-slate-400 mt-1">
          Welcome back! Here's today's overview.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600">
          🔔
        </button>

        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
          M
        </div>
      </div>
    </div>
  );
}

export default Topbar;