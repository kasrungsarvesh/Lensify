import StatsCard from "./StatsCard";
import "./dashboard.css";

const DashboardGrid = () => {
  return (
    <div className="dashboard-grid">
      <StatsCard title="Today's Customers" value="12" change="+2 from yesterday" />
      <StatsCard title="Total Customers" value="320" change="+15 this week" />
      <StatsCard title="Revenue" value="₹12,500" change="+8%" />
    </div>
  );
};

export default DashboardGrid;