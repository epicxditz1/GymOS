import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

import {
  AlertTriangle,
  Search,
  CalendarDays,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

function ExpiringMembersPage({
  members,
  getExpiryStatus,

  setSelectedMember,
}) {

  const navigate = useNavigate();
  
  const today = new Date();

  const expiringMembers = members
    .filter((member) => {
      if (!member.expiryDate) return false;

      const expiry = new Date(member.expiryDate);

      today.setHours(0, 0, 0, 0);
      expiry.setHours(0, 0, 0, 0);

      const diff = Math.ceil(
        (expiry - today) /
          (1000 * 60 * 60 * 24)
      );

      

      return diff >= 0 && diff <= 7;
    })
    .sort(
      (a, b) =>
        new Date(a.expiryDate) -
        new Date(b.expiryDate)
    );
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* Background */}

      <div className="absolute -left-44 -top-44 h-[520px] w-[520px] rounded-full bg-amber-500/10 blur-[170px]" />

      <div className="absolute right-[-180px] bottom-[-120px] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-[180px]" />

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <main className="mx-auto w-full max-w-[1650px] px-5 pb-12 lg:px-8 xl:px-10">

          {/* Header */}

          <section className="rounded-[34px] border border-white/10 bg-[#0B1220]/95 p-8 backdrop-blur-3xl">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2">

                  <Sparkles
                    size={14}
                    className="text-amber-400"
                  />

                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">

                    Membership Renewals

                  </span>

                </div>

                <h1 className="mt-6 text-5xl font-black">

                  Expiring Members

                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">

                  Track memberships that are about to expire
                  and renew them before they become inactive.

                </p>

              </div>

              <button
                onClick={() => navigate("/")}
                className="group flex items-center gap-3 self-start rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 transition-all duration-300 hover:border-amber-500/40 hover:bg-amber-500/10"
              >

                <ArrowLeft
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

            

              </button>

            </div>

          </section>

          {/* Stats */}

          <section className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-[#0B1220]/95 p-6">

              <p className="text-sm uppercase tracking-widest text-slate-500">

                Total Expiring

              </p>

              <h2 className="mt-3 text-5xl font-black text-white">

                {expiringMembers.length}

              </h2>

            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0B1220]/95 p-6">

              <p className="text-sm uppercase tracking-widest text-slate-500">

                Need Renewal

              </p>

              <h2 className="mt-3 text-5xl font-black text-amber-400">

                {expiringMembers.length}

              </h2>

            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0B1220]/95 p-6">

              <p className="text-sm uppercase tracking-widest text-slate-500">

                Status

              </p>

              <h2 className="mt-3 text-2xl font-black text-emerald-400">

                Live

              </h2>

            </div>

          </section>

                    <div className="mt-10">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-400"
              />

              <input
                type="text"
                placeholder="Search member... (UI Ready)"
                className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1220]/95 pl-14 pr-5 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-amber-500 focus:bg-white/[0.05]"
              />

            </div>

          </div>

          {/* Members */}

          <section className="mt-10">

            {expiringMembers.length === 0 ? (

              <div className="flex h-[420px] flex-col items-center justify-center rounded-[32px] border border-dashed border-white/10 bg-[#0B1220]/95">

                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-500/10">

                  <AlertTriangle
                    size={42}
                    className="text-amber-400"
                  />

                </div>

                <h2 className="mt-8 text-3xl font-black">

                  No Expiring Members 🎉

                </h2>

                <p className="mt-4 max-w-md text-center text-slate-400 leading-7">

                  Great job! There are currently no memberships
                  expiring within the next seven days.

                </p>

              </div>

            ) : (

              <div className="grid gap-6 lg:grid-cols-2">

                {expiringMembers.map((member) => {

                  const expiry = new Date(member.expiryDate);

                  const daysLeft = Math.ceil(
                    (expiry - today) /
                      (1000 * 60 * 60 * 24)
                  );

                  return (

                    <button
                      key={member._id}
                      onClick={() => {
                        setSelectedMember(member);
                        navigate("/member-profile");
                      }}
                      className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#0B1220]/95 p-7 text-left transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/40 hover:shadow-[0_20px_60px_rgba(245,158,11,0.12)]"
                    >

                      <div className="flex items-start justify-between">

                        <div className="flex items-center gap-5">

                          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 text-2xl font-black text-white shadow-lg shadow-amber-500/30">

                            {member.name?.charAt(0).toUpperCase() || "M"}

                          </div>

                          <div>

                            <h3 className="text-2xl font-black text-white">

                              {member.name}

                            </h3>

                            <p className="mt-2 text-slate-400">

                              {member.phone}

                            </p>

                            <p className="mt-2 text-sm text-slate-500">

                              {member.membership}

                            </p>

                          </div>

                        </div>

                        <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-300">

                          {daysLeft === 0
                            ? "Today"
                            : `${daysLeft} Days`}

                        </span>

                      </div>

                      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">

                        <div className="flex items-center justify-between">

                          <div>

                            <p className="text-xs uppercase tracking-widest text-slate-500">

                              Expiry Date

                            </p>

                            <h4 className="mt-2 text-lg font-bold text-white">

                              {member.expiryDate}

                            </h4>

                          </div>

                          <div className="text-right">

                            <p className="text-xs uppercase tracking-widest text-slate-500">

                              Status

                            </p>

                            <p className="mt-2 font-semibold text-amber-400">

                              {getExpiryStatus(member.expiryDate)}

                            </p>

                          </div>

                        </div>

                      </div>

                      <div className="mt-7 flex items-center justify-between">

                        <span className="text-sm text-slate-500">

                          Click to open profile

                        </span>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-amber-500/30 group-hover:bg-amber-500/10">

                          <CalendarDays
                            size={20}
                            className="text-amber-400"
                          />

                        </div>

                      </div>

                    </button>

                  );

                })}

              </div>

            )}

          </section>

        </main>

      </div>

    </div>
  );
}

export default ExpiringMembersPage;