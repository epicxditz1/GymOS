import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import QuickActions from "../components/dashboard/QuickActions";
import RecentMembers from "../components/dashboard/RecentMembers";
import DashboardWidgets from "../components/dashboard/DashboardWidgets";

function HomeDashboard({
  setPage,
  members,
  sidebarOpen,
  setSidebarOpen,
  setSelectedMember,
}) {
  const totalMembers = members.length;

  const presentMembers = members.filter(
    (member) => member.attendance
  ).length;

  const todaysCollection = members
    .filter((member) => member.feeStatus === "Paid")
    .reduce(
      (sum, member) => sum + Number(member.fees || 0),
      0
    );

  const expiringSoonMembers = members.filter((member) => {
    const expiry = new Date(member.expiryDate);
    const today = new Date();

    const diff =
      (expiry - today) / (1000 * 60 * 60 * 24);

    return diff >= 0 && diff <= 7;
  }).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="p-6">

        <DashboardHeader />

        <DashboardStats
          totalMembers={totalMembers}
          todaysCollection={todaysCollection}
          presentMembers={presentMembers}
          expiringSoonMembers={expiringSoonMembers}
        />

        <QuickActions
          setPage={setPage}
        />

        <div className="grid gap-6 xl:grid-cols-3">

          <div className="xl:col-span-1">
            <RecentMembers
              members={members}
              setSelectedMember={setSelectedMember}
              setPage={setPage}
            />
          </div>

          <div className="xl:col-span-2">
            <DashboardWidgets
              todaysCollection={todaysCollection}
              presentMembers={presentMembers}
              totalMembers={totalMembers}
              expiringSoonMembers={expiringSoonMembers}
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default HomeDashboard;