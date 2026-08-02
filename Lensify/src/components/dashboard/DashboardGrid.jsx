import { useEffect, useState } from "react";
import {
  FaUsers,
  FaRupeeSign,
  FaFileMedical,
  FaCalendarAlt,
} from "react-icons/fa";

import StatsCard from "./StatsCard";
import { getDashboard } from "../../api/dashboardApi";
import "./dashboard.css";

function DashboardGrid() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <div className="dashboard-grid">
      <StatsCard
        title="Total Customers"
        value={dashboard?.totalCustomers ?? 0}
        change="Registered Customers"
        icon={<FaUsers />}
        color="blue"
      />

      <StatsCard
        title="Total Revenue"
        value={`₹${dashboard?.totalRevenue ?? 0}`}
        change="Overall Revenue"
        icon={<FaRupeeSign />}
        color="green"
      />

      <StatsCard
        title="Total Bills"
        value={dashboard?.totalBills ?? 0}
        change="Generated Bills"
        icon={<FaFileMedical />}
        color="orange"
      />

      <StatsCard
        title="Pending Orders"
        value={dashboard?.pendingOrders ?? 0}
        change="Orders Pending"
        icon={<FaCalendarAlt />}
        color="purple"
      />
    </div>
  );
}

export default DashboardGrid;
