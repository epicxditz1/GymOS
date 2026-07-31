import { CheckCircle2 } from "lucide-react";

function PlanCard({
  title,
  duration,
  price,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
        selected
          ? "border-cyan-500 bg-cyan-500/10"
          : "border-slate-700 bg-slate-900 hover:border-cyan-500"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-1 text-slate-400">
            {duration}
          </p>
        </div>

        {selected && (
          <CheckCircle2
            size={28}
            className="text-cyan-400"
          />
        )}
      </div>

      <h2 className="mt-6 text-3xl font-bold text-green-400">
        ₹{price}
      </h2>
    </button>
  );
}

export default PlanCard;