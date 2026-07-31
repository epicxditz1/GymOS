import { Search } from "lucide-react";

function PaymentSearch({
  search,
  setSearch,
  paymentFilter,
  setPaymentFilter,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search member..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-cyan-500 transition"
        />
      </div>

      {/* Payment Method Filter */}
      <select
        value={paymentFilter}
        onChange={(e) =>
          setPaymentFilter(e.target.value)
        }
        className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition"
      >
        <option value="All">All Payments</option>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
      </select>
    </div>
  );
}

export default PaymentSearch;