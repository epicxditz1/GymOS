import { ArrowLeft, Receipt } from "lucide-react";

function PaymentHeader({ setPage }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Receipt className="text-cyan-400" size={34} />
          Payment History
        </h1>

        <p className="text-slate-400 mt-2">
          View all payment records.
        </p>
      </div>

      <button
        onClick={() => setPage("home")}
        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition"
      >
        <ArrowLeft size={18} />
        Dashboard
      </button>
    </div>
  );
}

export default PaymentHeader;