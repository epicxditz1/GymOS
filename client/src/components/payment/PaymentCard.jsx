import {
  CalendarDays,
  CreditCard,
  IndianRupee,
  User,
} from "lucide-react";

function PaymentCard({ payment }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-cyan-500 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User
              size={18}
              className="text-cyan-400"
            />
            {payment.memberName}
          </h2>

          <p className="text-slate-400 mt-1">
            {payment.plan}
          </p>
        </div>

        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
          Paid
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm">

        <div className="flex items-center gap-2">
          <IndianRupee
            size={18}
            className="text-green-400"
          />
          <span className="text-slate-300">
            ₹{payment.amount}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CreditCard
            size={18}
            className="text-yellow-400"
          />
          <span className="text-slate-300">
            {payment.paymentMethod}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays
            size={18}
            className="text-purple-400"
          />
          <span className="text-slate-300">
            {payment.paymentDate}
          </span>
        </div>

      </div>
    </div>
  );
}

export default PaymentCard;