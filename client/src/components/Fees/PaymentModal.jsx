import {
  IndianRupee,
  CreditCard,
  X,
  CheckCircle2,
} from "lucide-react";

function PaymentModal({
  showPaymentPopup,
  paymentMember,
  paymentMethod,
  setPaymentMethod,
  receivePayment,
  setShowPaymentPopup,
}) {
  if (!showPaymentPopup || !paymentMember) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1220]/95 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

        {/* Glow */}

        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative">

          {/* Close */}

          <button
            onClick={() => setShowPaymentPopup(false)}
            className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-red-500/40 hover:bg-red-500/10"
          >
            <X size={18} />
          </button>

          {/* Icon */}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10">

            <IndianRupee
              size={38}
              className="text-cyan-400"
            />

          </div>

          <h2 className="mt-6 text-center text-3xl font-black text-white">

            Receive Payment

          </h2>

          <p className="mt-2 text-center text-slate-400">

            Confirm payment for this member.

          </p>

          {/* Member */}

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">

            <p className="text-sm text-slate-400">

              Member

            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">

              {paymentMember.name}

            </h3>

          </div>

          {/* Amount */}

          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">

            <p className="text-sm text-slate-400">

              Amount

            </p>

            <h3 className="mt-2 text-3xl font-black text-emerald-400">

              ₹{paymentMember.fees}

            </h3>

          </div>

          {/* Method */}

          <div className="mt-6">

            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-400">

              <CreditCard size={16} />

              Payment Method

            </label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
              className="h-14 w-full rounded-2xl border border-white/10 bg-[#111827] px-5 text-white outline-none transition focus:border-cyan-500"
            >
              <option value="Cash">
                Cash
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Card">
                Card
              </option>

            </select>

          </div>

          {/* Buttons */}

          <div className="mt-8 flex gap-4">

            <button
              onClick={receivePayment}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-cyan-500 py-4 font-bold text-white transition hover:bg-cyan-600"
            >
              <CheckCircle2 size={18} />

              Confirm

            </button>

            <button
              onClick={() =>
                setShowPaymentPopup(false)
              }
              className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] py-4 font-bold transition hover:bg-white/[0.08]"
            >
              Cancel
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PaymentModal;