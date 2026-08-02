import { useMemo, useState } from "react";
import {
  ArrowLeft,
  IndianRupee,
  Wallet,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  CreditCard,
} from "lucide-react";

function FeesPage({
  members,
  setPage,
  setPaymentMember,
  setShowPaymentPopup,
  showPaymentPopup,
  paymentMember,
  paymentMethod,
  setPaymentMethod,
  receivePayment,
  toggleFeeStatus,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  /* ===========================
        Dashboard Stats
  =========================== */

  const paidMembers = members.filter(
    (m) => m.status === "Paid"
  ).length;

  const unpaidMembers = members.filter(
    (m) => m.status !== "Paid"
  ).length;

  const totalRevenue = members.reduce(
    (sum, m) => sum + Number(m.fees || 0),
    0
  );

  const today = new Date().toLocaleDateString(
    "en-GB"
  );

  const todaysCollection = members.reduce(
    (total, member) => {
      const payments =
        member.paymentHistory?.filter(
          (payment) =>
            payment.paymentDate === today
        ) || [];

      return (
        total +
        payments.reduce(
          (sum, p) =>
            sum + Number(p.amount || 0),
          0
        )
      );
    },
    0
  );

  /* ===========================
          Search + Filter
  =========================== */

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        member.phone.includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        member.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [members, search, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl p-6">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Fees Management
            </h1>

            <p className="mt-2 text-slate-400">
              Track payments, pending fees and
              today's collection.
            </p>

          </div>

          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 transition hover:border-cyan-500 hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

        </div>

        {/* Summary Cards */}

        <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <IndianRupee
              className="mb-4 text-cyan-400"
              size={34}
            />

            <p className="text-slate-400">
              Today's Collection
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              ₹{todaysCollection}
            </h2>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <Wallet
              className="mb-4 text-green-400"
              size={34}
            />

            <p className="text-slate-400">
              Total Revenue
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              ₹{totalRevenue}
            </h2>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <CheckCircle2
              className="mb-4 text-emerald-400"
              size={34}
            />

            <p className="text-slate-400">
              Paid Members
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {paidMembers}
            </h2>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <XCircle
              className="mb-4 text-red-400"
              size={34}
            />

            <p className="text-slate-400">
              Pending Members
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {unpaidMembers}
            </h2>

          </div>

        </div>

        {/* Search */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row">

          <div className="relative flex-1">

            <Search
              className="absolute left-4 top-3 text-slate-500"
              size={20}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search member..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 outline-none transition focus:border-cyan-500"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
          >
            <option>All</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </select>

        </div>

                {/* Members List */}

        {filteredMembers.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-700 p-16 text-center">

            <CreditCard
              size={70}
              className="mx-auto mb-5 text-slate-600"
            />

            <h2 className="text-2xl font-bold">
              No Members Found
            </h2>

            <p className="mt-2 text-slate-400">
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 lg:grid-cols-2">

            {filteredMembers.map((member, index) => (

              <div
                key={member._id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
              >

                {/* Top */}

                <div className="mb-5 flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {member.name}
                    </h2>

                    <p className="mt-1 text-slate-400">
                      {member.phone}
                    </p>

                  </div>

                  <div>

                    {member.status === "Paid" ? (

                      <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">

                        Paid

                      </span>

                    ) : (

                      <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400">

                        Unpaid

                      </span>

                    )}

                  </div>

                </div>

                {/* Details */}

                <div className="grid gap-4 md:grid-cols-2">

                  <div className="rounded-2xl bg-slate-800/60 p-4">

                    <p className="text-sm text-slate-400">
                      Membership Fees
                    </p>

                    <h3 className="mt-2 text-xl font-bold">

                      ₹{member.fees}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-slate-800/60 p-4">

                    <p className="text-sm text-slate-400">
                      Payment Status
                    </p>

                    <h3 className="mt-2 text-xl font-bold">

                      {member.status}

                    </h3>

                  </div>

                </div>

                {/* Buttons */}

                <div className="mt-6 flex gap-4">

                  <button
                    onClick={() => {
                      setPaymentMember(member);
                      setShowPaymentPopup(true);
                    }}
                    className="flex-1 rounded-xl bg-cyan-500 py-3 font-semibold transition hover:bg-cyan-600"
                  >

                    Receive Payment

                  </button>

                </div>

                {/* Payment History */}
{member.paymentHistory?.length > 0 && (
  <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-800/40 p-4">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="font-semibold text-white">
        Payment History
      </h3>

      <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">
        {member.paymentHistory.length}
      </span>
    </div>

    <div className="space-y-3">
      {[...member.paymentHistory]
        .reverse()
        .slice(0, 3)
        .map((payment, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-slate-900 p-3"
          >
            <div>
              <p className="font-semibold">
                ₹{payment.amount}
              </p>

              <p className="text-xs text-slate-400">
                {payment.paymentDate}
              </p>
            </div>

            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
              {payment.paymentMethod}
            </span>
          </div>
        ))}
    </div>
  </div>
)}

              </div>

            ))}

          </div>

        )}
                {/* ===========================
              Payment Modal
        =========================== */}

        {showPaymentPopup && paymentMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

              <div className="mb-6 text-center">

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20">
                  <IndianRupee
                    size={30}
                    className="text-cyan-400"
                  />
                </div>

                <h2 className="text-3xl font-bold">
                  Receive Payment
                </h2>

                <p className="mt-2 text-slate-400">
                  Confirm payment details
                </p>

              </div>

              <div className="space-y-4">

                <div className="rounded-2xl bg-slate-800 p-4">

                  <p className="text-sm text-slate-400">
                    Member
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    {paymentMember.name}
                  </h3>

                </div>

                <div className="rounded-2xl bg-slate-800 p-4">

                  <p className="text-sm text-slate-400">
                    Amount
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-green-400">
                    ₹{paymentMember.fees}
                  </h3>

                </div>

                <div>

                  <label className="mb-2 block text-sm text-slate-400">
                    Payment Method
                  </label>

                  <select
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-cyan-500"
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

              </div>

              <div className="mt-8 flex gap-4">

                <button
                  onClick={receivePayment}
                  className="flex-1 rounded-xl bg-cyan-500 py-3 font-semibold transition hover:bg-cyan-600"
                >
                  Confirm Payment
                </button>

                <button
                  onClick={() =>
                    setShowPaymentPopup(false)
                  }
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800 py-3 font-semibold transition hover:bg-slate-700"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default FeesPage;