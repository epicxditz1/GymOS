function Topbar({ setSidebarOpen }) {
  return (
    <div className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 mb-8">
      
      {/* Left */}
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="text-3xl hover:text-cyan-400 transition"
      >
        ☰
      </button>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="w-11 h-11 rounded-full bg-slate-700 hover:bg-slate-600 transition">
          🔔
        </button>

        <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-lg">
          M
        </div>
      </div>

    </div>
  );
}

export default Topbar;