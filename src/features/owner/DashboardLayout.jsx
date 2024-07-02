import useOwnerProjects from "../projects/useOwnerProjects";
import Stats from "./Stats";
import Loading from "../../ui/Loading";
import DashboardHeader from "../../ui/DashboardHeader";

function DashboardLayout() {
  const { isLoading, projects } = useOwnerProjects();

  if (isLoading) return <Loading />;

  return (
    <div>
      <DashboardHeader />
      <Stats projects={projects} />
    </div>
  );
}
export default DashboardLayout;
