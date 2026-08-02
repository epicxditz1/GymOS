import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
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
  Sparkles,
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
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* Background */}

      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-[170px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[180px]" />

      {/* Sidebar */}

      <Sidebar
        page={page}
        setPage={setPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}

      <div
        onClick={() => {
          if (sidebarOpen) {
            setSidebarOpen(false);
          }
        }}
        className="relative flex-1 transition-all duration-300"
      >

        <Topbar
  setSidebarOpen={setSidebarOpen}
  setPage={setPage}
  members={members}
  setSelectedMember={setSelectedMember}
/>

        <main className="mx-auto w-full max-w-[1650px] px-5 pb-12 lg:px-8 xl:px-10">

          {/* Hero */}

          <HeroCard
  amount={todaysCollection}
  title="Welcome back to GymOS"
  subtitle="Manage members, payments, attendance and renewals from one powerful dashboard."
/>

          {/* Stats */}

          <section className="mt-8">

            <div className="mb-7 flex items-center gap-3">

              <Sparkles
                size={18}
                className="text-cyan-400"
              />

              <h2 className="text-3xl font-black tracking-tight text-white">

                Dashboard Overview

              </h2>

            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-4">

                        <PremiumStatCard
              title="Total Members"
              value={members.length}
              icon={Users}
              color="cyan"
              subtitle="Active registered members"
            />

            <PremiumStatCard
              title="Present Today"
              value={presentMembers}
              icon={Users}
              color="emerald"
              subtitle="Attendance marked today"
            />

            <PremiumStatCard
              title="Today's Revenue"
              value={`₹${todaysCollection}`}
              icon={IndianRupee}
              color="amber"
              subtitle="Collection received today"
            />

            <PremiumStatCard
              title="Expiring Soon"
              value={expiringSoonMembers}
              icon={AlertTriangle}
              color="violet"
              subtitle="Membership renewals pending"
            />

            </div>

          </section>

          {/* Quick Actions */}

          <section className="mt-10">

            <div className="mb-8 flex items-center gap-3">

              <Sparkles
                size={18}
                className="text-cyan-400"
              />

              <h2 className="text-3xl font-black tracking-tight text-white">

                Quick Actions

              </h2>

            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-4">

              <QuickActionCard
                title="Add Member"
                subtitle="Register a new member into your gym."
                icon={UserPlus}
                color="cyan"
                onClick={() => setPage("add-member")}
              />

              <QuickActionCard
                title="View Members"
                subtitle="Browse and manage all registered members."
                icon={UsersRound}
                color="violet"
                onClick={() => setPage("view-members")}
              />

              <QuickActionCard
                title="Fees"
                subtitle="Manage payments and fee collection."
                icon={IndianRupee}
                color="emerald"
                onClick={() => setPage("fees")}
              />

              <QuickActionCard
                title="Attendance"
                subtitle="Mark today's attendance in one click."
                icon={CalendarDays}
                color="amber"
                onClick={() => setPage("attendance")}
              />

            </div>

          </section>

          {/* Bottom Cards */}

          <section className="mt-10 grid grid-cols-1 gap-6 2xl:grid-cols-2">

            <RecentMembers
              members={members}
            />

            <ExpiringMembersCard
              members={members}
              setPage={setPage}
              setSelectedMember={setSelectedMember}
            />

          </section>

          {/* Footer */}

          <footer className="mt-14 border-t border-white/10 pt-10 pb-8">

            <div className="flex flex-col items-center justify-between gap-5 text-center lg:flex-row">

              <div>

                <h3 className="text-2xl font-black text-white">

                  GymOS

                </h3>

                <p className="mt-2 text-sm text-slate-400">

                  Premium Gym Management Software

                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">

                  Designed & Developed by

                </p>

                <h4 className="mt-2 text-lg font-bold text-white">

                  Mayank

                </h4>

                <p className="text-sm text-cyan-400">

                  @epicxditz

                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">

                  GymOS © 2026

                </p>

                <p className="mt-2 text-sm text-slate-600">

                  Built with React • Tailwind CSS • Node.js

                </p>

              </div>

            </div>

          </footer>

        </main>

      </div>

    </div>
  );
}

export default HomeDashboard;