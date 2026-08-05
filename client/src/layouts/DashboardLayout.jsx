import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

function DashboardLayout({
  members,
  sidebarOpen,
  setSidebarOpen,
  setSelectedMember,
}) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* Background */}

      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-[170px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[180px]" />

      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}

      <div
        className="relative flex-1 transition-all duration-300"
        onClick={() => {
          if (sidebarOpen) {
            setSidebarOpen(false);
          }
        }}
      >
        <Topbar
          setSidebarOpen={setSidebarOpen}
          members={members}
          setSelectedMember={setSelectedMember}
        />

        <main className="relative z-0 mx-auto w-full max-w-[1650px] px-5 pb-12 lg:px-8 xl:px-10">

          <Outlet
  context={{
    members,
    sidebarOpen,
    setSidebarOpen,
    setSelectedMember,
  }}
/>

        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;