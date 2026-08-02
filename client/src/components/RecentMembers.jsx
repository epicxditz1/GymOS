import {
  Users,
  Phone,
  CalendarDays,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

function RecentMembers({ members }) {
  const recentMembers = [...members]
    .slice(-5)
    .reverse();

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1220]/95 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.30)]">

      {/* Background Glow */}

      <div className="absolute -left-16 -top-16 h-60 w-60 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative p-7">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5">

              <Sparkles
                size={13}
                className="text-cyan-400"
              />

              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">

                MEMBERS

              </span>

            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-white">

              Recent Members

            </h2>

            <p className="mt-2 max-w-md text-sm leading-7 text-slate-400">

              Newly joined members are displayed here for quick access.

            </p>

          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3">

            <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">

              Total

            </p>

            <h3 className="mt-1 text-2xl font-black text-white">

              {recentMembers.length}

            </h3>

          </div>

        </div>

        {/* Empty State */}

        {recentMembers.length === 0 ? (

          <div className="mt-8 flex h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03]">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 border border-white/10">

              <Users
                size={34}
                className="text-slate-500"
              />

            </div>

            <h3 className="mt-6 text-xl font-bold text-white">

              No Members Found

            </h3>

            <p className="mt-3 max-w-sm text-center text-sm leading-7 text-slate-400">

              Add your first gym member and they will instantly appear here.

            </p>

          </div>

        ) : (

          <div className="mt-8 space-y-4">

                      {recentMembers.map((member, index) => (

              <div
                key={member._id || index}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-cyan-500/40
                  hover:bg-white/[0.05]
                "
              >

                {/* Hover Glow */}

                <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent" />

                <div className="relative flex items-center justify-between">

                  {/* Left */}

                  <div className="flex items-center gap-4">

                    {/* Avatar */}

                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 text-xl font-black text-white shadow-[0_10px_30px_rgba(34,211,238,0.30)]">

                      {member.name?.charAt(0).toUpperCase() || "M"}

                    </div>

                    <div>

                      <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">

                        {member.name}

                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">

                        <Phone
                          size={14}
                          className="text-cyan-400"
                        />

                        <span>

                          {member.phone}

                        </span>

                      </div>

                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                        <CalendarDays size={14} />

                        <span>

                          Recently Joined

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Right */}

                  <div className="flex flex-col items-end gap-3">

                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">

                      New

                    </span>

                    <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 transition-all duration-300 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10">

                      <ArrowUpRight
                        size={18}
                        className="text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default RecentMembers;