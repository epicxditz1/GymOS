function DashboardHeader() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
      <div>
        <h1 className="text-4xl font-bold">
          {greeting} 👋
        </h1>

        <p className="text-slate-400 mt-2 text-lg">
          Welcome back! Here's what's happening in your gym today.
        </p>
      </div>

      <div className="mt-5 md:mt-0 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3">
        <p className="text-slate-400 text-sm">Today</p>

        <h3 className="font-semibold">
          {today}
        </h3>
      </div>
    </div>
  );
}

export default DashboardHeader;