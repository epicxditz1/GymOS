import { ArrowLeft, Users } from "lucide-react";

function MembersHeader({ setPage }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3">
          <Users size={36} className="text-cyan-400" />

          <h1 className="text-4xl font-bold text-white">
            Members
          </h1>
        </div>

        <p className="mt-2 text-slate-400">
          View and manage all gym members.
        </p>
      </div>

      <button
        onClick={() => setPage("home")}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white transition hover:border-cyan-500 hover:bg-slate-800"
      >
        <ArrowLeft size={18} />
        Dashboard
      </button>
    </div>
  );
}

export default MembersHeader;