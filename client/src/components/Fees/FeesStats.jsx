import {
  Wallet,
  IndianRupee,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import PremiumStatCard from "../PremiumStatCard";

function FeesStats({
  todaysCollection,
  totalRevenue,
  paidMembers,
  unpaidMembers,
}) {
  return (
    <section className="mt-10">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <PremiumStatCard
          title="Today's Collection"
          value={`₹${todaysCollection}`}
          icon={IndianRupee}
          color="cyan"
          subtitle="Collection received today"
        />

        <PremiumStatCard
          title="Total Revenue"
          value={`₹${totalRevenue}`}
          icon={Wallet}
          color="emerald"
          subtitle="Overall revenue collected"
        />

        <PremiumStatCard
          title="Paid Members"
          value={paidMembers}
          icon={CheckCircle2}
          color="cyan"
          subtitle="Fees paid successfully"
        />

        <PremiumStatCard
          title="Pending Members"
          value={unpaidMembers}
          icon={XCircle}
          color="amber"
          subtitle="Payment still pending"
        />

      </div>

    </section>
  );
}

export default FeesStats;