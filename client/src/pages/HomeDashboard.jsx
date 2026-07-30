import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import QuickActionCard from "../components/QuickActionCard";
import RecentMembers from "../components/RecentMembers";

import {
  Users,
  Wallet,
  XCircle,
  AlertTriangle,
  UserPlus,
  UsersRound,
  IndianRupee,
  CalendarDays,
} from "lucide-react";

function HomeDashboard({
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
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <Sidebar
        setPage={setPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Topbar setSidebarOpen={setSidebarOpen} />

        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Header */}
          <DashboardHeader />

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              title="Total Members"
              value={members.length}
              icon={<Users size={42} />}
              color="text-white"
              border="border-cyan-500/40"
            />

            <StatCard
              title="Today's Collection"
              value={`₹${todaysCollection}`}
              icon={<Wallet size={42} />}
              color="text-green-400"
              border="border-green-500/40"
            />

            <StatCard
              title="Unpaid Members"
              value={unpaidMembers}
              icon={<XCircle size={42} />}
              color="text-red-400"
              border="border-red-500/40"
            />

            <StatCard
              title="Expiring Soon"
              value={expiringSoonMembers}
              icon={<AlertTriangle size={42} />}
              color="text-yellow-400"
              border="border-yellow-500/40"
            />

          </div>

          {/* Quick Actions */}
          <div className="mt-14">
            <h2 className="text-2xl font-bold mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              <QuickActionCard
                title="Add Member"
                icon={<UserPlus size={42} />}
                onClick={() => setPage("add-member")}
              />

              <QuickActionCard
                title="View Members"
                icon={<UsersRound size={42} />}
                onClick={() => setPage("view-members")}
              />

              <QuickActionCard
                title="Fees"
                icon={<IndianRupee size={42} />}
                onClick={() => setPage("fees")}
              />

              <QuickActionCard
                title="Attendance"
                icon={<CalendarDays size={42} />}
                onClick={() => setPage("attendance")}
              />

            </div>
          </div>

          {/* Gym Statistics */}
          <div className="mt-14">
            <h2 className="text-2xl font-bold mb-6">
              Gym Statistics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-slate-800 rounded-3xl border border-slate-700 p-6 shadow-lg">
                <p className="text-slate-400">
                  Paid Members
                </p>

                <h2 className="text-5xl font-bold text-green-400 mt-3">
                  {paidMembers}
                </h2>
              </div>

              <div className="bg-slate-800 rounded-3xl border border-slate-700 p-6 shadow-lg">
                <p className="text-slate-400">
                  Present Today
                </p>

                <h2 className="text-5xl font-bold text-cyan-400 mt-3">
                  {presentMembers}
                </h2>
              </div>

              <div className="bg-slate-800 rounded-3xl border border-slate-700 p-6 shadow-lg">
                <p className="text-slate-400">
                  Absent Today
                </p>

                <h2 className="text-5xl font-bold text-orange-400 mt-3">
                  {absentMembers}
                </h2>
              </div>
{/* Recent Members */}
<div className="mt-14">
  <RecentMembers members={members} />
</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;