function RecentMembers({ members }) {
  const recentMembers = [...members].slice(-5).reverse();

  return (
    <div className="bg-slate-800 rounded-3xl border border-slate-700 p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        Recent Members
      </h2>

      {recentMembers.length === 0 ? (
        <p className="text-slate-400">
          No members added yet.
        </p>
      ) : (
        <div className="space-y-4">
          {recentMembers.map((member, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-slate-700 pb-3"
            >
              <div>
                <h3 className="font-semibold">
                  {member.name}
                </h3>

                <p className="text-sm text-slate-400">
                  {member.phone}
                </p>
              </div>

              <span className="text-cyan-400 text-sm">
                New
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentMembers;