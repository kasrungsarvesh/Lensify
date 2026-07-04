import ReportCards from "../../components/reports/ReportCards";
import ReportActions from "../../components/reports/ReportActions";
import RevenueChart from "../../components/reports/RevenueChart";
import SalesChart from "../../components/reports/SalesChart";
import TopCustomers from "../../components/reports/TopCustomers";
import TopProducts from "../../components/reports/TopProducts";
import RecentTransactions from "../../components/reports/RecentTransactions";

import "./Reports.css";

function Reports() {
  return (
    <div className="reports-page">

      <div className="reports-header">

        <div>

          <h2>Reports & Analytics</h2>

          <p>
            Monitor your business performance and sales.
          </p>

        </div>

        <div className="report-filter">

          <input type="date"/>

          <input type="date"/>

        </div>

      </div>

      <ReportCards />

      <div className="chart-grid">

      <RevenueChart/>

      <SalesChart/>

      </div>

      <div className="report-widget-grid">

          <TopCustomers/>

          <TopProducts/>

      </div>
      <RecentTransactions/>

      <ReportActions />

    </div>
  );
}

export default Reports;