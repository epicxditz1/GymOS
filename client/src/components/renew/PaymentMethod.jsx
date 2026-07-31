import {
  Banknote,
  Smartphone,
  CreditCard,
} from "lucide-react";

function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}) {
  const methods = [
    {
      name: "Cash",
      icon: Banknote,
    },
    {
      name: "UPI",
      icon: Smartphone,
    },
    {
      name: "Card",
      icon: CreditCard,
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-white">
        Payment Method
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {methods.map((method) => {
          const Icon = method.icon;

          return (
            <button
              key={method.name}
              onClick={() =>
                setPaymentMethod(method.name)
              }
              className={`rounded-2xl border p-5 transition-all duration-300 ${
                paymentMethod === method.name
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 bg-slate-900 hover:border-cyan-500"
              }`}
            >
              <Icon
                size={30}
                className="mx-auto mb-3 text-cyan-400"
              />

              <p className="font-semibold text-white">
                {method.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentMethod;