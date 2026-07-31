import { useState } from "react";
import { X } from "lucide-react";
import PlanCard from "./PlanCard";
import PaymentMethod from "./PaymentMethod";
import RenewalSummary from "./RenewalSummary";

const plans = [
  {
    title: "1 Month",
    months: 1,
    price: 1000,
  },
  {
    title: "3 Months",
    months: 3,
    price: 2700,
  },
  {
    title: "6 Months",
    months: 6,
    price: 5000,
  },
  {
    title: "12 Months",
    months: 12,
    price: 9000,
  },
];

function RenewMembershipModal({
  member,
  onClose,
  onRenew,
}) {
  const [selectedPlan, setSelectedPlan] =
    useState(null);

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const calculateExpiryDate = () => {
    if (!selectedPlan) return "-";

    const expiry = new Date(
      member.expiryDate
    );

    expiry.setMonth(
      expiry.getMonth() +
        selectedPlan.months
    );

    return expiry.toLocaleDateString(
      "en-GB"
    );
  };

  const handleRenew = () => {
    if (!selectedPlan) return;

    onRenew({
      memberId: member.id,
      plan: selectedPlan,
      paymentMethod,
      newExpiryDate:
        calculateExpiryDate(),
    });

    onClose();
  };
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-slate-950 p-8">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Renew Membership
            </h2>

            <p className="mt-2 text-slate-400">
              {member.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 p-3 transition hover:bg-red-500"
          >
            <X size={22} className="text-white" />
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          <div>

            <h3 className="mb-5 text-xl font-bold text-white">
              Select Plan
            </h3>

            <div className="space-y-4">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.title}
                  title={plan.title}
                  duration={`${plan.months} Month${plan.months > 1 ? "s" : ""}`}
                  price={plan.price}
                  selected={selectedPlan?.title === plan.title}
                  onClick={() => setSelectedPlan(plan)}
                />
              ))}
            </div>

          </div>

          <div className="space-y-8">

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            <RenewalSummary
              member={member}
              selectedPlan={selectedPlan}
              paymentMethod={paymentMethod}
              newExpiryDate={calculateExpiryDate()}
            />

            <button
              disabled={!selectedPlan}
              onClick={handleRenew}
              className={`w-full rounded-2xl py-4 text-lg font-bold transition-all ${
                selectedPlan
                  ? "bg-cyan-500 text-white hover:bg-cyan-600"
                  : "cursor-not-allowed bg-slate-700 text-slate-400"
              }`}
            >
              Confirm Renewal
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default RenewMembershipModal;