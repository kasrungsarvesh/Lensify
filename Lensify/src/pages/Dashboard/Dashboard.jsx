import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardGrid from "../../components/dashboard/DashboardGrid";
import QuickActions from "../../components/dashboard/QuickActions";
import AppointmentCard from "../../components/dashboard/AppointmentCard";
import LowStockProducts from "../../components/dashboard/LowStockProducts";
import RecentCustomers from "../../components/dashboard/RecentCustomers";
import RecentReceipts from "../../components/dashboard/RecentReceipts";

import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <WelcomeBanner />

      <DashboardGrid />

      <QuickActions />

      <div className="dashboard-row">

      <AppointmentCard />

      <LowStockProducts />

     </div>

     <div className="dashboard-row">

      <RecentCustomers />

      <RecentReceipts />

    </div>

    </div>
  );
}

export default Dashboard;