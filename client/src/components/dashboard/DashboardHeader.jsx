import { Dumbbell } from "lucide-react";

function DashboardHeader() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white">
          {greeting} 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back to GymOS Dashboard
        </p>
      </div>

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500">
        <Dumbbell
          size={32}
          className="text-white"
        />
      </div>
    </div>
  );
}

export default DashboardHeader;