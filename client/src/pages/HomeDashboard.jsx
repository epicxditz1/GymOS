
            

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardHeader from "../components/DashboardHeader";
import QuickActionCard from "../components/QuickActionCard";
import RecentMembers from "../components/RecentMembers";
import PremiumStatCard from "../components/PremiumStatCard";
import HeroCard from "../components/HeroCard";
import ExpiringMembersCard from "../components/ExpiringMembersCard";

import {
  Users,
  AlertTriangle,
  UserPlus,
  UsersRound,
  IndianRupee,
  CalendarDays,
} from "lucide-react";

function HomeDashboard({
  page,
  setPage,
  members,
  paidMembers,
  unpaidMembers,
  todaysCollection,
  presentMembers,
  absentMembers,
  expiringSoonMembers,
  sidebarOpen,
  setSidebarOpen,
  setSelectedMember,
}) {
  console.log("sidebarOpen:", sidebarOpen);
console.log("setSidebarOpen:", setSidebarOpen);
  return (
    <div className="relative min-h-screen bg-[#020617] text-white flex overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-180px] right-[-180px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-220px] left-[-180px] h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[160px] pointer-events-none" />
      {/* Sidebar */}
      <Sidebar
  page={page}
  setPage={setPage}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

      {/* Main Content */}
      <div
        onClick={() => {
          if (sidebarOpen) {
            setSidebarOpen(false);
          }
        }}
        className="flex-1 transition-all duration-300"
      >
        <Topbar setSidebarOpen={setSidebarOpen} />

        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-8">

          {/* Dashboard Header */}
          <DashboardHeader />

          {/* Hero Section */}
          <div className="mt-8">
            <HeroCard
              amount={todaysCollection}
              title="Today's Collection"
              subtitle="Revenue collected today"
            />
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            <PremiumStatCard
              title="Total Members"
              value={members.length}
              icon={Users}
              color="cyan"
              subtitle="Active gym members"
            />

            <PremiumStatCard
              title="Present Today"
              value={presentMembers}
              icon={Users}
              color="emerald"
              subtitle="Attendance marked"
            />

            <PremiumStatCard
              title="Today's Revenue"
              value={`₹${todaysCollection}`}
              icon={IndianRupee}
              color="amber"
              subtitle="Collection received"
            />

            <PremiumStatCard
              title="Expiring Soon"
              value={expiringSoonMembers}
              icon={AlertTriangle}
              color="violet"
              subtitle="Needs renewal"
            />

          </div>
                    {/* Quick Actions */}
          <section className="mt-12">

            <div className="mb-7">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Quick Actions
              </h2>

              <p className="text-slate-400 mt-2">
                Manage your gym quickly using these shortcuts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

              <QuickActionCard
                title="Add Member"
                subtitle="Register a new member"
                icon={UserPlus}
                color="cyan"
                onClick={() => setPage("add-member")}
              />

              <QuickActionCard
                title="View Members"
                subtitle="Browse all members"
                icon={UsersRound}
                color="violet"
                onClick={() => setPage("view-members")}
              />

              <QuickActionCard
                title="Fees"
                subtitle="Manage payments"
                icon={IndianRupee}
                color="emerald"
                onClick={() => setPage("fees")}
              />

              <QuickActionCard
                title="Attendance"
                subtitle="Mark today's attendance"
                icon={CalendarDays}
                color="amber"
                onClick={() => setPage("attendance")}
              />

            </div>

          </section>

          {/* Bottom Section */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">

            <RecentMembers members={members} />

            <ExpiringMembersCard
              members={members}
              setPage={setPage}
              setSelectedMember={setSelectedMember}
            />

          </section>

          {/* Footer */}
          <footer className="mt-14 border-t border-slate-800 pt-8 pb-6">

            <div className="text-center">

              <p className="text-slate-500 text-sm">
                Designed & Developed with ❤️ by
              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                Mayank 
              </h3>

              <p className="text-slate-500 text-sm">
                (@epicxditz)
              </p>



              <p className="mt-2 text-xs text-slate-600">
                GymOS © 2026 • India's Premium Gym Management Software
              </p>

            </div>

          </footer>

        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;