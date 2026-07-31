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
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-44 -top-44 h-[600px] w-[600px] rounded-full bg-cyan-500/12 blur-[180px]" />

        <div className="absolute -right-44 bottom-0 h-[600px] w-[600px] rounded-full bg-indigo-500/12 blur-[180px]" />

        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/5 blur-[160px]" />

      </div>

      {/* Sidebar */}

      <Sidebar
        page={page}
        setPage={setPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}

      <main
        onClick={() => {
          if (sidebarOpen) {
            setSidebarOpen(false);
          }
        }}
        className="relative z-10 flex-1 transition-all duration-300"
      >

        <div className="mx-auto max-w-[1650px] px-6 py-6 lg:px-10">

          {/* Topbar */}

          <Topbar
            setSidebarOpen={setSidebarOpen}
          />

          {/* Header */}

          <DashboardHeader />

          {/* Hero */}

          <div className="mt-8">

            <HeroCard
              amount={todaysCollection}
              title="Today's Collection"
              subtitle="Revenue collected today"
            />

          </div>

          {/* KPI Section */}

          <section className="mt-10">

            <div className="mb-7">

              <h2 className="text-2xl font-black tracking-tight text-white">

                Business Overview

              </h2>

              <p className="mt-2 text-slate-400">

                Live insights about today's gym performance.

              </p>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                            <PremiumStatCard
                title="Total Members"
                value={members.length}
                icon={Users}
                color="cyan"
                subtitle="Registered members"
              />

              <PremiumStatCard
                title="Present Today"
                value={presentMembers}
                icon={Users}
                color="emerald"
                subtitle="Today's attendance"
              />

              <PremiumStatCard
                title="Today's Revenue"
                value={`₹${todaysCollection}`}
                icon={IndianRupee}
                color="amber"
                subtitle="Today's collection"
              />

              <PremiumStatCard
                title="Expiring Soon"
                value={expiringSoonMembers}
                icon={AlertTriangle}
                color="violet"
                subtitle="Needs renewal"
              />

            </div>

          </section>

          {/* Quick Actions */}

          <section className="mt-14">

            <div className="mb-8 flex items-end justify-between">

              <div>

                <h2 className="text-2xl font-black tracking-tight text-white">

                  Quick Actions

                </h2>

                <p className="mt-2 text-slate-400">

                  Access your most frequently used tools instantly.

                </p>

              </div>

              <span className="hidden rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 lg:block">

                Productivity

              </span>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

              <QuickActionCard
                title="Add Member"
                subtitle="Register a new gym member"
                icon={UserPlus}
                color="cyan"
                onClick={() => setPage("add-member")}
              />

              <QuickActionCard
                title="Members"
                subtitle="View and manage members"
                icon={UsersRound}
                color="violet"
                onClick={() => setPage("view-members")}
              />

              <QuickActionCard
                title="Fees"
                subtitle="Track fee payments"
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

          <section className="mt-14">

            <div className="mb-8 flex items-end justify-between">

              <div>

                <h2 className="text-2xl font-black tracking-tight text-white">

                  Gym Insights

                </h2>

                <p className="mt-2 text-slate-400">

                  Recently joined members and memberships requiring attention.

                </p>

              </div>

              <span className="hidden rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300 lg:block">

                Live Updates

              </span>

            </div>

            <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">

              {/* Recent Members */}

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-3xl">

                <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-[120px]" />

                <div className="relative z-10">

                  <RecentMembers
                    members={members}
                  />

                </div>

              </div>

              {/* Expiring Members */}

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-3xl">

                <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-violet-500/10 blur-[120px]" />

                <div className="relative z-10">

                  <ExpiringMembersCard
                    members={members}
                    setPage={setPage}
                    setSelectedMember={setSelectedMember}
                  />

                </div>

              </div>

            </div>

          </section>

                    {/* Footer */}

          <footer className="mt-16 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] backdrop-blur-3xl">

            <div className="relative">

              {/* Glow */}

              <div className="absolute -left-16 -bottom-16 h-52 w-52 rounded-full bg-cyan-500/10 blur-[120px]" />

              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-indigo-500/10 blur-[120px]" />

              <div className="relative z-10 flex flex-col items-center px-8 py-10 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 shadow-[0_0_35px_rgba(34,211,238,0.35)]">

                  <Users
                    size={28}
                    className="text-white"
                  />

                </div>

                <h2 className="mt-6 text-2xl font-black tracking-tight text-white">

                  GymOS

                </h2>

                <p className="mt-3 max-w-xl text-slate-400 leading-7">

                  A modern SaaS platform built to help gym owners
                  manage members, attendance, fees and daily
                  operations with speed and simplicity.

                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300">
                    Premium UI
                  </span>

                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-300">
                    Secure
                  </span>

                  <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm font-semibold text-violet-300">
                    Made in India 🇮🇳
                  </span>

                </div>

                <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <p className="mt-8 text-sm text-slate-500">

                  Designed & Developed by

                  <span className="mx-2 font-bold text-white">
                    Mayank
                  </span>

                  • GymOS © {new Date().getFullYear()}

                </p>

              </div>

            </div>

          </footer>

        </div>

      </main>

    </div>
  );
}

export default HomeDashboard;
            

