import {
  Phone,
  IndianRupee,
  CreditCard,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function FeesMemberCard({
  member,
  setPaymentMember,
  setShowPaymentPopup,
}) {
  const paid = member.status === "Paid";

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-[#0B1220]/95
        p-7
        backdrop-blur-3xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-cyan-500/40
        hover:shadow-[0_20px_60px_rgba(34,211,238,0.12)]
      "
    >
      {/* Glow */}

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 text-2xl font-black text-white shadow-lg shadow-cyan-500/30">

              {member.name?.charAt(0).toUpperCase()}

            </div>

            <div>

              <h2 className="text-2xl font-black text-white">

                {member.name}

              </h2>

              <div className="mt-2 flex items-center gap-2 text-slate-400">

                <Phone size={15} />

                <span>{member.phone}</span>

              </div>

            </div>

          </div>

          {paid ? (
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400">

              Paid

            </span>
          ) : (
            <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400">

              Pending

            </span>
          )}

        </div>

        {/* Info */}

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="flex items-center gap-3">

              <IndianRupee
                size={20}
                className="text-cyan-400"
              />

              <span className="text-sm text-slate-400">

                Membership Fee

              </span>

            </div>

            <h3 className="mt-4 text-3xl font-black text-white">

              ₹{member.fees}

            </h3>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="flex items-center gap-3">

              <CreditCard
                size={20}
                className="text-cyan-400"
              />

              <span className="text-sm text-slate-400">

                Payment Status

              </span>

            </div>

            <div className="mt-4 flex items-center gap-3">

              {paid ? (
                <>
                  <CheckCircle2
                    className="text-emerald-400"
                    size={22}
                  />

                  <span className="font-bold text-emerald-400">

                    Paid

                  </span>
                </>
              ) : (
                <>
                  <XCircle
                    className="text-red-400"
                    size={22}
                  />

                  <span className="font-bold text-red-400">

                    Pending

                  </span>
                </>
              )}

            </div>

          </div>

        </div>

        {/* Button */}

        <button
          onClick={() => {
            setPaymentMember(member);
            setShowPaymentPopup(true);
          }}
          className="
            group/button
            mt-8
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-cyan-500
            py-4
            font-bold
            text-white
            transition-all
            duration-300
            hover:bg-cyan-600
          "
        >

          Receive Payment

          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1"
          />

        </button>

      </div>

    </div>
  );
}

export default FeesMemberCard;