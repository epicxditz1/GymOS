import {
  Calendar,
  IndianRupee,
  CreditCard,
} from "lucide-react";

function RenewalSummary({
  member,
  selectedPlan,
  paymentMethod,
  newExpiryDate,
}) {
  if (!selectedPlan) return null;

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-bold text-white">
        Renewal Summary
      </h2>

      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <span className="text-slate-400">
            Member
          </span>

          <span className="font-semibold text-white">
            {member.name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">
            Plan
          </span>

          <span className="font-semibold text-cyan-400">
            {selectedPlan.title}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400">
            <IndianRupee size={16} />
            Amount
          </span>

          <span className="font-bold text-green-400">
            ₹{selectedPlan.price}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400">
            <CreditCard size={16} />
            Payment
          </span>

          <span className="font-semibold text-white">
            {paymentMethod}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400">
            <Calendar size={16} />
            New Expiry
          </span>

          <span className="font-semibold text-yellow-400">
            {newExpiryDate}
          </span>
        </div>

      </div>
    </div>
  );
}

export default RenewalSummary;