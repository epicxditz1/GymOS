import {
  IndianRupee,
  Receipt,
  Wallet,
  Smartphone,
} from "lucide-react";

function PaymentStats({ paymentHistory }) {
  const totalRevenue = paymentHistory.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  const totalPayments = paymentHistory.length;

  const cashPayments = paymentHistory.filter(
    (payment) => payment.paymentMethod === "Cash"
  ).length;

  const onlinePayments = paymentHistory.filter(
    (payment) => payment.paymentMethod !== "Cash"
  ).length;

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue}`,
      icon: IndianRupee,
      color: "text-green-400",
    },
    {
      title: "Payments",
      value: totalPayments,
      icon: Receipt,
      color: "text-cyan-400",
    },
    {
      title: "Cash",
      value: cashPayments,
      icon: Wallet,
      color: "text-yellow-400",
    },
    {
      title: "Online",
      value: onlinePayments,
      icon: Smartphone,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-5 border border-slate-700"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">
                  {stat.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {stat.value}
                </h2>
              </div>

              <Icon
                size={34}
                className={stat.color}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PaymentStats;