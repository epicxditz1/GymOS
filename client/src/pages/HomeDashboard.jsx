import { Users } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function HomeDashboard({ setPage, members }) {
  console.log("HomeDashboard Loaded");

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <Sidebar setPage={setPage} />

      <div className="flex-1 ml-64 p-8">
        <Topbar />

        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="text-slate-400 mt-2 text-lg">
          Welcome back! Here's what's happening in your gym today.
        </p>

        <div className="mt-10 border-4 border-red-500 p-6">
          <div className="bg-blue-600 p-10 rounded-xl text-white">
            <h1 className="text-4xl font-bold">
              Hello GymOS 🚀
            </h1>
          </div>

          <p className="text-red-500 text-3xl font-bold mt-4">
            TEST CARD
          </p>

          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mt-4">
            <Users className="w-6 h-6 text-cyan-400" />
          </div>

          <p className="text-slate-400 text-sm mt-4">
            Total Members
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {members.length}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;