import { useMemo, useState } from "react";

import PaymentHeader from "../components/payment/PaymentHeader";
import PaymentStats from "../components/payment/PaymentStats";
import PaymentSearch from "../components/payment/PaymentSearch";
import PaymentCard from "../components/payment/PaymentCard";
import PaymentEmpty from "../components/payment/PaymentEmpty";

function PaymentHistoryPage({ members, setPage }) {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");

  /* ==========================================================
                    ALL PAYMENTS
  ========================================================== */

  const allPayments = useMemo(() => {
    return members.flatMap((member) =>
      (member.paymentHistory || []).map((payment, index) => ({
        id: `${member._id}-${index}`,
        memberId: member._id,
        memberName: member.name,
        plan: payment.plan || member.membership,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        paymentDate: payment.paymentDate,
      }))
    );
  }, [members]);

  /* ==========================================================
                  FILTERED PAYMENTS
  ========================================================== */

  const filteredPayments = useMemo(() => {
    return allPayments.filter((payment) => {
      const matchesSearch = payment.memberName
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        paymentFilter === "All"
          ? true
          : payment.paymentMethod === paymentFilter;

      return matchesSearch && matchesFilter;
    });
  }, [allPayments, search, paymentFilter]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      <PaymentHeader setPage={setPage} />

      <PaymentStats paymentHistory={allPayments} />

      <PaymentSearch
        search={search}
        setSearch={setSearch}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
      />

      {filteredPayments.length === 0 ? (
        <PaymentEmpty />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPayments.map((payment) => (
            <PaymentCard
              key={payment.id}
              payment={payment}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default PaymentHistoryPage;