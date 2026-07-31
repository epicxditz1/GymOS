import { Users } from "lucide-react";

function AttendanceEmpty() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 py-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
        <Users size={40} className="text-slate-500" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        No Members Found
      </h2>

      <p className="mt-2 text-slate-400">
        Try changing your search or filter.
      </p>
    </div>
  );
}

export default AttendanceEmpty;