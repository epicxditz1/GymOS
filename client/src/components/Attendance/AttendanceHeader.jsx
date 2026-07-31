import { ArrowLeft } from "lucide-react";

function AttendanceHeader({ setPage }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white">
          📅 Attendance
        </h1>

        <p className="mt-2 text-slate-400">
          Track and manage today's attendance.
        </p>
      </div>

      <button
        onClick={() => setPage("home")}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white transition-all duration-300 hover:border-cyan-500 hover:bg-slate-800"
      >
        <ArrowLeft size={18} />
        Dashboard
      </button>
    </div>
  );
}

export default AttendanceHeader;