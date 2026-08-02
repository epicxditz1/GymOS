import {
  AlertTriangle,
  Calendar,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

function ExpiringMembersCard({
  members = [],
  setPage,
  setSelectedMember,
}) {
  const today = new Date();

  const expiringMembers = members
    .filter((member) => {
      if (!member.expiryDate) return false;

      const expiry = new Date(member.expiryDate);

      const diff =
        (expiry - today) /
        (1000 * 60 * 60 * 24);

      return diff >= 0 && diff <= 7;
    })
    .sort(
      (a, b) =>
        new Date(a.expiryDate) -
        new Date(b.expiryDate)
    );

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1220]/95 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.30)]">

      {/* Background Glow */}

      <div className="absolute -left-16 -top-16 h-60 w-60 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="absolute -right-16 bottom-0 h-60 w-60 rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="relative p-7">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5">

              <Sparkles
                size={13}
                className="text-amber-400"
              />

              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">

                RENEWALS

              </span>

            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-white">

              Expiring Members

            </h2>

            <p className="mt-2 max-w-md text-sm leading-7 text-slate-400">

              Members whose memberships are ending within the next 7 days.

            </p>

          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-3">

            <p className="text-xs uppercase tracking-[0.18em] text-amber-300">

              Total

            </p>

            <h3 className="mt-1 text-2xl font-black text-white">

              {expiringMembers.length}

            </h3>

          </div>

        </div>

        {/* Empty State */}

        {expiringMembers.length === 0 ? (

          <div className="mt-8 flex h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03]">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 border border-white/10">

              <AlertTriangle
                size={34}
                className="text-slate-500"
              />

            </div>

            <h3 className="mt-6 text-xl font-bold text-white">

              Everything Looks Good 🎉

            </h3>

            <p className="mt-3 max-w-sm text-center text-sm leading-7 text-slate-400">

              No memberships are expiring this week.

            </p>

          </div>

        ) : (

          <div className="mt-8 space-y-4">

                      {expiringMembers.map((member) => {
              const daysLeft = Math.ceil(
                (new Date(member.expiryDate) - today) /
                  (1000 * 60 * 60 * 24)
              );

              return (
                <button
                  key={member._id}
                  onClick={() => {
                    setSelectedMember(member);
                    setPage("member-profile");
                  }}
                  className="
                    group
                    relative
                    w-full
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                    text-left
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-amber-500/40
                    hover:bg-white/[0.05]
                  "
                >
                  {/* Hover Glow */}

                  <div className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent" />

                  <div className="relative flex items-center justify-between">

                    {/* Left */}

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 text-xl font-black text-white shadow-[0_10px_30px_rgba(245,158,11,0.35)]">

                        {member.name?.charAt(0).toUpperCase() || "M"}

                      </div>

                      <div>

                        <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-amber-300">

                          {member.name}

                        </h3>

                        <p className="mt-2 text-sm text-slate-400">

                          {member.membership}

                        </p>

                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                          <Calendar
                            size={14}
                            className="text-amber-400"
                          />

                          <span>

                            {member.expiryDate}

                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Right */}

                    <div className="flex flex-col items-end gap-4">

                      <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">

                        {daysLeft === 0
                          ? "Expires Today"
                          : `${daysLeft} Days Left`}

                      </span>

                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 transition-all duration-300 group-hover:border-amber-500/30 group-hover:bg-amber-500/10">

                        <ChevronRight
                          size={20}
                          className="text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                        />

                      </div>

                    </div>

                  </div>

                </button>
              );
            })}

          </div>

        )}

      </div>

    </section>
  );
}

export default ExpiringMembersCard;