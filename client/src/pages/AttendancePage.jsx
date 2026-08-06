import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  Users,
  CheckCircle2,
  XCircle,
  CalendarCheck,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


function AttendancePage({
  members,
  markAttendance,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const presentMembers = members.filter(
    (member) => member.attendance === "Present"
  ).length;

  const absentMembers =
    members.length - presentMembers;

  const attendancePercentage =
    members.length === 0
      ? 0
      : Math.round(
          (presentMembers / members.length) * 100
        );

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        member.phone?.includes(search);

      const matchesFilter =
        filter === "All" ||
        member.attendance === filter;
const navigate = useNavigate();
      return (
        matchesSearch && matchesFilter
      );
    });
  }, [members, search, filter]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-cyan-500/15 blur-[170px]" />

        <div className="absolute -right-40 bottom-0 h-[550px] w-[550px] rounded-full bg-indigo-500/15 blur-[170px]" />

        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/5 blur-[150px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">

        {/* Hero */}

        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-3xl">

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-[120px]" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

                <Sparkles
                  size={15}
                  className="text-cyan-400"
                />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Daily Attendance
                </span>

              </div>

              <h1 className="mt-6 text-5xl font-black tracking-tight text-white">
                Member Attendance
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
                Mark attendance, monitor member
                activity and manage daily records
                from one premium dashboard.
              </p>

            </div>

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500"
            >
              <ArrowLeft size={20} />
          
            </button>

          </div>

        </div>

        {/* Statistics Cards */}

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    {/* Total Members */}

          <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]">

            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20" />

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">

                  <Users
                    size={30}
                    className="text-cyan-400"
                  />

                </div>

                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  Total
                </span>

              </div>

              <p className="mt-8 text-sm text-slate-400">
                Total Members
              </p>

              <h2 className="mt-3 text-5xl font-black text-white">
                {members.length}
              </h2>

            </div>

          </div>

          {/* Present */}

          <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/40 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)]">

            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20" />

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">

                  <CheckCircle2
                    size={30}
                    className="text-emerald-400"
                  />

                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Present
                </span>

              </div>

              <p className="mt-8 text-sm text-slate-400">
                Present Today
              </p>

              <h2 className="mt-3 text-5xl font-black text-emerald-400">
                {presentMembers}
              </h2>

            </div>

          </div>

          {/* Absent */}

          <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:border-red-500/40 hover:shadow-[0_20px_60px_rgba(239,68,68,0.15)]">

            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-red-500/10 blur-3xl group-hover:bg-red-500/20" />

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">

                  <XCircle
                    size={30}
                    className="text-red-400"
                  />

                </div>

                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
                  Absent
                </span>

              </div>

              <p className="mt-8 text-sm text-slate-400">
                Absent Today
              </p>

              <h2 className="mt-3 text-5xl font-black text-red-400">
                {absentMembers}
              </h2>

            </div>

          </div>

          {/* Attendance Rate */}

          <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/40 hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)]">

            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-500/10 blur-3xl group-hover:bg-amber-500/20" />

            <div className="relative z-10">

              <div className="flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">

                  <CalendarCheck
                    size={30}
                    className="text-amber-400"
                  />

                </div>

                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                  Live
                </span>

              </div>

              <p className="mt-8 text-sm text-slate-400">
                Attendance Rate
              </p>

              <h2 className="mt-3 text-5xl font-black text-amber-400">
                {attendancePercentage}%
              </h2>

            </div>

          </div>

        </div>

                {/* Search & Filter */}

        <div className="mt-8 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-3xl">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by name or phone..."
                className="h-14 w-full rounded-2xl border border-white/10 bg-slate-900/60 pl-14 pr-5 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
              />

            </div>

            {/* Filters */}

            <div className="flex flex-wrap gap-3">

              {["All", "Present", "Absent"].map(
                (status) => (

                  <button
                    key={status}
                    onClick={() =>
                      setFilter(status)
                    }
                    className={`rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                      filter === status
                        ? status === "Present"
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                          : status === "Absent"
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                          : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                        : "border border-white/10 bg-slate-900/60 text-slate-400 hover:border-cyan-500 hover:text-white"
                    }`}
                  >
                    {status}
                  </button>

                )
              )}

            </div>

          </div>

          <div className="mt-6 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <Users
                size={18}
                className="text-cyan-400"
              />

              <span className="text-sm text-slate-400">

                <span className="text-sm text-slate-400">
  Total Results :
  <span className="ml-2 font-bold text-white">
    {filteredMembers.length}
  </span>
</span>

              </span>

            </div>

            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">

              Live Attendance

            </span>

          </div>

        </div>

        {/* Empty State */}

        {filteredMembers.length === 0 ? (

          <div className="mt-8 rounded-[32px] border border-dashed border-white/10 bg-white/[0.03] p-20 text-center backdrop-blur-3xl">

            <Users
              size={70}
              className="mx-auto text-slate-600"
            />

            <h2 className="mt-6 text-3xl font-black text-white">

              No Members Found

            </h2>

            <p className="mt-3 text-slate-400">

              No members match the current search or filter.

            </p>

          </div>

        ) : (

          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            {filteredMembers.map((member) => (
                          <div
              key={member._id}
              className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-[0_25px_70px_rgba(34,211,238,0.12)]"
            >
              {/* Glow */}

              <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-cyan-500/10 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />

              <div className="relative z-10">

                {/* Header */}

                <div className="flex items-center gap-5">

                  {member.photo ? (

                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-20 w-20 rounded-2xl border-2 border-cyan-500/20 object-cover"
                    />

                  ) : (

                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-3xl font-black text-white shadow-xl">

                      {member.name?.charAt(0).toUpperCase()}

                    </div>

                  )}

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold tracking-tight text-white">

                      {member.name}

                    </h2>

                    <p className="mt-2 text-slate-400">

                      {member.phone}

                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">

                      <span className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-300">

                        {member.membership}

                      </span>

                      <span className="rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-xs text-slate-400">

                        Joined : {member.joinDate}

                      </span>

                    </div>

                  </div>

                </div>

                {/* Divider */}

                <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Buttons */}

                <div className="grid grid-cols-2 gap-4">

                  <button
                    onClick={() =>
                      markAttendance(
                        member._id,
                        "Present"
                      )
                    }
                    disabled={
                      member.attendance ===
                      "Present"
                    }
                    className={`rounded-2xl py-4 text-sm font-semibold transition-all duration-300 ${
                      member.attendance ===
                      "Present"
                        ? "bg-emerald-500 text-white cursor-not-allowed"
                        : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500 hover:text-white hover:scale-[1.03]"
                    }`}
                  >
                     Mark Present
                  </button>

                  <button
                    onClick={() =>
                      markAttendance(
                        member._id,
                        "Absent"
                      )
                    }
                    disabled={
                      member.attendance ===
                      "Absent"
                    }
                    className={`rounded-2xl py-4 text-sm font-semibold transition-all duration-300 ${
                      member.attendance ===
                      "Absent"
                        ? "bg-red-500 text-white cursor-not-allowed"
                        : "border border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white hover:scale-[1.03]"
                    }`}
                  >
                     Mark Absent
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        )}

        <div className="h-10" />

      </div>

      {/* Bottom Glow */}

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

    </div>
  );
}

export default AttendancePage;
