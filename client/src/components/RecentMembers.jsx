import { UserRound, Phone, Users } from "lucide-react";

function RecentMembers({ members }) {
  const recentMembers = [...members].slice(-5).reverse();

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0F172A]/95 p-6 backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-white">
            Recent Members
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Newly registered gym members
          </p>
        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400">
          {recentMembers.length} Members
        </div>

      </div>

      {/* Empty State */}
      {recentMembers.length === 0 ? (

        <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/30">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">

            <Users
              size={30}
              className="text-slate-500"
            />

          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">
            No Members Yet
          </h3>

          <p className="mt-2 text-center text-sm text-slate-400">
            Add your first gym member to see them here.
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {recentMembers.map((member, index) => (

            <div
              key={index}
              className="
                group
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/40
                px-4
                py-4
                transition-all
                duration-300
                hover:border-cyan-500/40
                hover:bg-slate-900/70
                hover:-translate-y-1
              "
            >

              {/* Left */}
              <div className="flex items-center gap-4">

                {/* Avatar */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-lg font-bold text-cyan-400">

                  {member.name?.charAt(0).toUpperCase() || "M"}

                </div>

                <div>

                  <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">

                    <Phone size={14} />

                    <span>{member.phone}</span>

                  </div>

                </div>

              </div>

              {/* Badge */}
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                NEW
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default RecentMembers;