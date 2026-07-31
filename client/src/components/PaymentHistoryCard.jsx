import { CreditCard } from "lucide-react";

function PaymentHistoryCard({ paymentHistory = [] }) {
  return (
    <div className="rounded-3xl bg-[#0F172A]/90 border border-white/10 p-6 mt-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <CreditCard className="text-cyan-400" size={22} />
        Payment History
      </h2>

      {paymentHistory.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          No Payment History Found
        </div>
      ) : (
        <div className="space-y-4">
          {[...paymentHistory]
            .reverse()
            .map((payment, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-700 bg-slate-800 p-4 hover:border-cyan-500 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">
                      ₹{payment.amount}
                    </p>

                    <p className="text-sm text-slate-400">
                      {payment.plan || "Membership"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-cyan-400 font-medium">
                      {payment.paymentMethod}
                    </p>

                    <p className="text-sm text-slate-400">
                      {payment.paymentDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default PaymentHistoryCard;