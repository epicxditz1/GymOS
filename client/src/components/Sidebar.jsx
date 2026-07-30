function Sidebar({ setPage, sidebarOpen, setSidebarOpen }) {
  return (
    <div
  className={`fixed top-0 left-0 z-50 w-64 h-screen bg-slate-800 border-r border-slate-700 p-6 transform transition-transform duration-300 ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
     <h1 className="text-3xl font-bold text-cyan-400">
        🏋️ GymOS</h1>
    

      <p className="text-slate-400 mt-2">
        Gym Management SaaS
      </p>
      <div className="mt-8 space-y-3">
  <button
  onClick={() => {
  setPage("home");
  setSidebarOpen(false);
}}
  className="w-full text-left p-3 rounded-lg hover:bg-slate-700"
>
  🏠 Dashboard
</button>

  <button
  onClick={() => setPage("view-members")}
  className="w-full text-left p-3 rounded-lg hover:bg-slate-700"
>
  👥 Members
</button>

  <button
  onClick={() => setPage("fees")}
  className="w-full text-left p-3 rounded-lg hover:bg-slate-700"
>
  💰 Fees
</button>

  <button
  onClick={() => setPage("attendance")}
  className="w-full text-left p-3 rounded-lg hover:bg-slate-700"
>
  📅 Attendance
</button>

  <button
  onClick={() => setPage("expiring-members")}
  className="w-full text-left p-3 rounded-lg hover:bg-slate-700"
>
  ⚠️ Expiring
</button>

  <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.reload();
  }}
  className="w-full text-left p-3 rounded-lg text-red-400 hover:bg-red-900/30"
>
  🚪 Logout
</button>
</div>
    </div>
  );
}

export default Sidebar;