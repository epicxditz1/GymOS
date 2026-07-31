import {
  AlertTriangle,
  Calendar,
  ChevronRight,
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
    <div className="rounded-3xl border border-slate-800 bg-[#0F172A]/95 backdrop-blur-xl p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <div className="flex items-center gap-3">

            <AlertTriangle
              size={22}
              className="text-amber-400"
            />

            <h2 className="text-xl font-bold text-white">
              Expiring Soon
            </h2>

          </div>

          <p className="mt-1 text-sm text-slate-400">
            Memberships ending within the next 7 days
          </p>

        </div>

        <div className="rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400">
          {expiringMembers.length} Members
        </div>

      </div>

      {/* Empty */}

      {expiringMembers.length === 0 ? (

        <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/30">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">

            <AlertTriangle
              size={30}
              className="text-slate-500"
            />

          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">
            All Memberships Safe 🎉
          </h3>

          <p className="mt-2 text-center text-sm text-slate-400">
            No memberships are expiring this week.
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {expiringMembers.map((member) => {

            const daysLeft = Math.ceil(
              (new Date(member.expiryDate) -
                today) /
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
                  w-full
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900/40
                  p-4
                  transition-all
                  duration-300
                  hover:border-amber-500/40
                  hover:bg-slate-900/70
                  hover:-translate-y-1
                  text-left
                "
              >

                <div className="flex items-center justify-between">

                  {/* Left */}

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-lg font-bold text-amber-400">

                      {member.name?.charAt(0).toUpperCase() || "M"}

                    </div>

                    <div>

                      <h3 className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {member.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        {member.membership}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">

                        <Calendar size={13} />

                        {member.expiryDate}

                      </div>

                    </div>

                  </div>

                  {/* Right */}

                  <div className="flex flex-col items-end">

                    <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">

                      {daysLeft === 0
                        ? "Expires Today"
                        : `${daysLeft} Days Left`}

                    </span>

                    <ChevronRight
                      size={22}
                      className="
                        mt-5
                        text-slate-600
                        transition-all
                        duration-300
                        group-hover:text-white
                        group-hover:translate-x-1
                      "
                    />

                  </div>

                </div>

              </button>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default ExpiringMembersCard;