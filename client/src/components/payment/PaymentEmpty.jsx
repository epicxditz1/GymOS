import { Receipt } from "lucide-react";

function PaymentEmpty() {
  return (
    <div className="bg-slate-800 border border-dashed border-slate-700 rounded-2xl p-12 text-center">

      <Receipt
        size={60}
        className="mx-auto text-slate-500 mb-4"
      />

      <h2 className="text-2xl font-bold">
        No Payments Found
      </h2>

      <p className="text-slate-400 mt-2">
        Payment records will appear here after members make payments.
      </p>

    </div>
  );
}

export default PaymentEmpty;