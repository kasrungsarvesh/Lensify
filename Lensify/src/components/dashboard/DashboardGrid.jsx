import {
  FaUsers,
  FaRupeeSign,
  FaFileMedical,
  FaCalendarAlt,
} from "react-icons/fa";

import StatsCard from "./StatsCard";
import "./dashboard.css";

function DashboardGrid() {
  return (
    <div className="dashboard-grid">

      <StatsCard
        title="Today's Customers"
        value="12"
        change="+2 Today"
        icon={<FaUsers />}
        color="blue"
      />

      <StatsCard
        title="Today's Revenue"
        value="₹12,500"
        change="+8%"
        icon={<FaRupeeSign />}
        color="green"
      />

      <StatsCard
        title="Prescriptions"
        value="18"
        change="Today's Rx"
        icon={<FaFileMedical />}
        color="orange"
      />

      <StatsCard
        title="Appointments"
        value="5"
        change="Pending"
        icon={<FaCalendarAlt />}
        color="purple"
      />

    </div>
  );
}

export default DashboardGrid;