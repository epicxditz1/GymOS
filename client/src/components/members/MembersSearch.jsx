import { Search } from "lucide-react";

function MembersSearch({
  search,
  setSearch,
}) {
  return (
    <div className="relative mb-8">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search by name or phone..."
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500"
      />
    </div>
  );
}

export default MembersSearch;