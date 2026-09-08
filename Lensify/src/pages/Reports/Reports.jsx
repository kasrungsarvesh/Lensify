import { useState } from "react";

import ReportCards from "../../components/reports/ReportCards";
import ReportActions from "../../components/reports/ReportActions";
import RevenueChart from "../../components/reports/RevenueChart";
import SalesChart from "../../components/reports/SalesChart";
import TopCustomers from "../../components/reports/TopCustomers";
import TopProducts from "../../components/reports/TopProducts";
import RecentTransactions from "../../components/reports/RecentTransactions";

import "./Reports.css";

function Reports() {
  // ============================================================
  // DATE FILTER STATE
  // ============================================================

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ============================================================
  // CLEAR FILTERS
  // ============================================================

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  // ============================================================
  // HANDLE START DATE
  // ============================================================

  const handleStartDateChange = (e) => {
    const value = e.target.value;

    setStartDate(value);

    // If end date is before start date,
    // automatically clear the end date.
    if (endDate && value > endDate) {
      setEndDate("");
    }
  };

  // ============================================================
  // HANDLE END DATE
  // ============================================================

  const handleEndDateChange = (e) => {
    const value = e.target.value;

    if (startDate && value < startDate) {
      return;
    }

    setEndDate(value);
  };

  return (
    <div className="reports-page">
      {/* ======================================================
          REPORT HEADER
      ====================================================== */}

      <div className="reports-header">
        <div className="reports-title">
          <h2>Reports & Analytics</h2>

          <p>Monitor your business performance and sales.</p>
        </div>

        {/* ====================================================
            DATE FILTER
        ==================================================== */}

        <div className="report-filter">
          <div className="date-field">
            <label htmlFor="startDate">From</label>

            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              max={endDate || undefined}
            />
          </div>

          <div className="date-field">
            <label htmlFor="endDate">To</label>

            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate || undefined}
            />
          </div>

          {(startDate || endDate) && (
            <button
              type="button"
              className="clear-filter-btn"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ======================================================
          REPORT CARDS
      ====================================================== */}

      <ReportCards startDate={startDate} endDate={endDate} />

      {/* ======================================================
          CHARTS
      ====================================================== */}

      <div className="chart-grid">
        <RevenueChart startDate={startDate} endDate={endDate} />

        <SalesChart startDate={startDate} endDate={endDate} />
      </div>

      {/* ======================================================
          TOP CUSTOMERS / PRODUCTS
      ====================================================== */}

      <div className="report-widget-grid">
        <TopCustomers startDate={startDate} endDate={endDate} />

        <TopProducts startDate={startDate} endDate={endDate} />
      </div>

      {/* ======================================================
          RECENT TRANSACTIONS
      ====================================================== */}

      <RecentTransactions startDate={startDate} endDate={endDate} />

      {/* ======================================================
          REPORT ACTIONS
      ====================================================== */}

      <ReportActions startDate={startDate} endDate={endDate} />
    </div>
  );
}

export default Reports;
