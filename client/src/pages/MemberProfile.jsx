import {
  ArrowLeft,
  Phone,
  Calendar,
  CreditCard,
  User,
  Pencil,
  RefreshCw,
  BadgeCheck,
  Clock3,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import RenewMembershipModal from "../components/RenewMembershipModal";
import PaymentHistoryCard from "../components/PaymentHistoryCard";
import { useNavigate } from "react-router-dom";

function MemberProfile({
  member,
  editMember,
  setMembers,
  startEdit,
}) {
  const [showRenewModal, setShowRenewModal] = useState(false);

  const [membership, setMembership] = useState(
    member?.membership || "1 Month"
  );
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  if (!member) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-slate-400 text-lg">
        Member not found.
      </div>
    );
  }

  const today = new Date();

  const expiry = new Date(member.expiryDate);

  const diffTime = expiry - today;

  const daysLeft = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );

  let expiryStatus = "";
  let expiryColor = "";
  let expiryBadge = "";

  if (daysLeft < 0) {
    expiryStatus = `Expired ${Math.abs(
      daysLeft
    )} Days Ago`;

    expiryColor = "text-red-400";

    expiryBadge =
      "bg-red-500/10 border-red-500/20";
  } else if (daysLeft <= 7) {
    expiryStatus = `${daysLeft} Days Left`;

    expiryColor = "text-amber-400";

    expiryBadge =
      "bg-amber-500/10 border-amber-500/20";
  } else {
    expiryStatus = `${daysLeft} Days Left`;

    expiryColor = "text-emerald-400";

    expiryBadge =
      "bg-emerald-500/10 border-emerald-500/20";
  }
  console.log("editMember:", editMember);
  
  async function handleRenewMembership() {
    try {
      const expiry = new Date();

      switch (membership) {
        case "1 Month":
          expiry.setMonth(expiry.getMonth() + 1);
          break;

        case "3 Months":
          expiry.setMonth(expiry.getMonth() + 3);
          break;

        case "6 Months":
          expiry.setMonth(expiry.getMonth() + 6);
          break;

        case "12 Months":
          expiry.setFullYear(
            expiry.getFullYear() + 1
          );
          break;

        default:
          expiry.setMonth(expiry.getMonth() + 1);
      }

      const updatedMember = {
        ...member,
        membership,
        expiryDate:
          expiry.toISOString().split("T")[0],
        status: "Paid",
        paymentMethod,

        paymentHistory: [
          ...(member.paymentHistory || []),
          {
            amount: member.fees,
            paymentDate:
              new Date().toLocaleDateString(
                "en-GB"
              ),
            paymentMethod,
            plan: membership,
          },
        ],
      };

      const formData = new FormData();

      Object.keys(updatedMember).forEach(
        (key) => {
          if (key !== "paymentHistory") {
            formData.append(
              key,
              updatedMember[key]
            );
          }
        }
      );

      formData.append(
        "paymentHistory",
        JSON.stringify(
          updatedMember.paymentHistory
        )
      );

      const data = await editMember(
        member._id,
        formData
      );

      setMembers((prev) =>
        prev.map((m) =>
          m._id === data.member._id
            ? data.member
            : m
        )
      );

      setShowRenewModal(false);

      toast.success(
        "Membership Renewed Successfully"
      );
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to renew membership"
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* Background Glow */}

      <div className="absolute top-[-180px] right-[-180px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="absolute bottom-[-220px] left-[-180px] h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-8">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <button
            onClick={() =>
              navigate("/view-members")
            }
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0F172A] px-4 py-2 text-slate-300 transition hover:border-cyan-500 hover:text-white"
          >
            <ArrowLeft size={18} />

    
          </button>

        </div>

        {/* Hero Card */}

        <div className="rounded-3xl border border-slate-800 bg-[#0F172A]/95 backdrop-blur-xl p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div className="flex items-center gap-6">

              <div className="h-24 w-24 rounded-full overflow-hidden bg-cyan-500/10 flex items-center justify-center">

                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-cyan-400">
                    {member.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </span>
                )}

              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  {member.name}
                </h1>

                <p className="mt-2 text-slate-400">
                   Member Profile
                </p>

                <div className="flex flex-wrap gap-3 mt-4">

                  <span
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold border ${
                      member.status === "Paid"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BadgeCheck size={14} />
                      {member.status}
                    </div>
                  </span>

                  <span
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold border ${expiryBadge} ${expiryColor}`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock3 size={14} />
                      {expiryStatus}
                    </div>
                  </span>

                </div>

              </div>

            </div>

            <div className="flex gap-4">

              <button
                onClick={() =>
                  startEdit(member)
                }
                className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold transition hover:bg-cyan-600"
              >
                <div className="flex items-center gap-2">
                  <Pencil size={18} />
                  Edit
                </div>
              </button>

              <button
                onClick={() =>
                  setShowRenewModal(true)
                }
                className="rounded-2xl border border-cyan-500 px-6 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-500/10"
              >
                <div className="flex items-center gap-2">
                  <RefreshCw size={18} />
                  Renew
                </div>
              </button>

            </div>

          </div>

        </div>
                {/* Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          {/* Member Information */}
          <div className="rounded-3xl border border-slate-800 bg-[#0F172A]/95 p-6">

            <h2 className="mb-6 text-xl font-bold">
              Member Information
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4 rounded-2xl bg-slate-900/60 p-4">

                <Phone className="text-cyan-400" />

                <div>
                  <p className="text-sm text-slate-400">
                    Phone Number
                  </p>

                  <p className="font-medium">
                    {member.phone}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-slate-900/60 p-4">

                <Calendar className="text-cyan-400" />

                <div>
                  <p className="text-sm text-slate-400">
                    Join Date
                  </p>

                  <p className="font-medium">
                    {member.joinDate}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-slate-900/60 p-4">

                <CreditCard className="text-cyan-400" />

                <div>
                  <p className="text-sm text-slate-400">
                    Membership Plan
                  </p>

                  <p className="font-medium">
                    {membership}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-slate-900/60 p-4">

                <Calendar className="text-cyan-400" />

                <div>

                  <p className="text-sm text-slate-400">
                    Expiry Date
                  </p>

                  <p className="font-medium">
                    {member.expiryDate}
                  </p>

                  <p
                    className={`mt-1 text-sm font-semibold ${expiryColor}`}
                  >
                    {expiryStatus}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Attendance */}
          <div className="rounded-3xl border border-slate-800 bg-[#0F172A]/95 p-6">

            <h2 className="mb-6 text-xl font-bold">
              Attendance Overview
            </h2>

            <div>

              <div className="mb-2 flex justify-between text-sm text-slate-400">

                <span>Attendance</span>

                <span>82%</span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                <div className="h-full w-[82%] rounded-full bg-cyan-400" />

              </div>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-slate-900/70 p-6 text-center">

                <h3 className="text-4xl font-bold text-emerald-400">
                  22
                </h3>

                <p className="mt-2 text-slate-400">
                  Present
                </p>

              </div>

              <div className="rounded-2xl bg-slate-900/70 p-6 text-center">

                <h3 className="text-4xl font-bold text-red-400">
                  5
                </h3>

                <p className="mt-2 text-slate-400">
                  Absent
                </p>

              </div>

            </div>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

  <div className="flex items-center justify-between">

    <span className="text-slate-400">
      Current Attendance
    </span>

    <span className="text-lg font-bold text-cyan-400">
      82%
    </span>

  </div>

</div>

          </div>

        </div>

        {/* Payment History */}

        <div className="mt-8">

          <PaymentHistoryCard
            paymentHistory={member.paymentHistory}
          />

        </div>

      </div>

      {/* Renew Membership Modal */}

      <RenewMembershipModal
        show={showRenewModal}
        onClose={() =>
          setShowRenewModal(false)
        }
        membership={membership}
        setMembership={setMembership}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onRenew={handleRenewMembership}
      />

    </div>
  );
}

export default MemberProfile;