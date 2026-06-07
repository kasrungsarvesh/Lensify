import DashboardGrid from "../../components/dashboard/DashboardGrid";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your optical shop</p>
      </div>

      <DashboardGrid />
    </div>
  );
};

export default Dashboard;