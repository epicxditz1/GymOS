import { X, Calendar, CreditCard } from "lucide-react";

function RenewMembershipModal({
  show,
  onClose,
  membership,
  setMembership,
  paymentMethod,
  setPaymentMethod,
  onRenew,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0F172A] p-6 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Renew Membership
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Membership */}
        <div className="mb-5">
          <label className="mb-2 flex items-center gap-2 text-slate-300">
            <Calendar size={18} />
            Membership Plan
          </label>

          <select
            value={membership}
            onChange={(e) => setMembership(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none focus:border-cyan-400"
          >
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>12 Months</option>
          </select>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <label className="mb-2 flex items-center gap-2 text-slate-300">
            <CreditCard size={18} />
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none focus:border-cyan-400"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Bank Transfer</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-600 py-3 text-white hover:bg-slate-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={onRenew}
            className="flex-1 rounded-xl bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-600 transition"
          >
            Renew Membership
          </button>
        </div>

      </div>
    </div>
  );
}

export default RenewMembershipModal;