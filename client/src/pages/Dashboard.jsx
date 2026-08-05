import HomeDashboard from "./HomeDashboard";
import { useOutletContext } from "react-router-dom";

function Dashboard(props) {
  const layout = useOutletContext();

  return (
    <HomeDashboard
      {...props}
      members={props.members ?? layout?.members}
      sidebarOpen={layout?.sidebarOpen}
      setSidebarOpen={layout?.setSidebarOpen}
      setSelectedMember={
        props.setSelectedMember ??
        layout?.setSelectedMember
      }
    />
  );
}

export default Dashboard;