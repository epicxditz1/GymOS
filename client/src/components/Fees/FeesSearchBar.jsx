import { Search, Filter } from "lucide-react";

function FeesSearchBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <section className="mt-10">

      <div className="flex flex-col gap-5 lg:flex-row">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400"
          />

          <input
            type="text"
            placeholder="Search by member name or phone..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-white/10
              bg-[#0B1220]/95
              pl-14
              pr-5
              text-white
              outline-none
              transition-all
              duration-300
              placeholder:text-slate-500
              focus:border-cyan-500
              focus:bg-white/[0.04]
            "
          />

        </div>

        {/* Filter */}

        <div className="relative w-full lg:w-64">

          <Filter
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
              h-14
              w-full
              appearance-none
              rounded-2xl
              border
              border-white/10
              bg-[#0B1220]/95
              pl-14
              pr-5
              text-white
              outline-none
              transition-all
              duration-300
              focus:border-cyan-500
            "
          >
            <option value="All">
              All Members
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Unpaid">
              Unpaid
            </option>

          </select>

        </div>

      </div>

    </section>
  );
}

export default FeesSearchBar;