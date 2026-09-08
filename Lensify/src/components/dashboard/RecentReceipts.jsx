import { useEffect, useState } from "react";
import { FaReceipt, FaSpinner, FaFileInvoice } from "react-icons/fa";

import "./dashboard.css";
import api from "../../api/axios";

function RecentReceipts() {
  // ============================================================
  // STATE
  // ============================================================

  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH RECENT RECEIPTS
  // ============================================================

  useEffect(() => {
    fetchRecentReceipts();
  }, []);

  const fetchRecentReceipts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/bills");

      console.log("Bills API Response:", response.data);

      const billData = response.data?.data || [];

      // ========================================================
      // SORT BY LATEST BILL DATE
      // ========================================================

      const recentReceipts = [...billData]
        .sort((a, b) => {
          const dateA = new Date(a.billDate || a.createdAt || 0);

          const dateB = new Date(b.billDate || b.createdAt || 0);

          return dateB - dateA;
        })
        .slice(0, 5);

      setReceipts(recentReceipts);
    } catch (err) {
      console.error("Recent Receipts Error:", err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else if (err.response?.status === 403) {
        setError("You are not authorized to view receipts.");
      } else {
        setError("Unable to load recent receipts.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // FORMAT CURRENCY
  // ============================================================

  const formatCurrency = (amount) => {
    const value = Number(amount || 0);

    return value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });
  };

  // ============================================================
  // FORMAT RECEIPT NUMBER
  // ============================================================

  const formatReceiptNumber = (bill) => {
    if (bill.billNumber) {
      return bill.billNumber;
    }

    if (bill.receiptNumber) {
      return bill.receiptNumber;
    }

    if (bill.billId) {
      return `REC-${String(bill.billId).padStart(4, "0")}`;
    }

    return "REC-0000";
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="info-card">
        <div className="card-header">
          <h3>
            <FaReceipt />
            Recent Receipts
          </h3>
        </div>

        <div className="card-body low-stock-loading">
          <FaSpinner className="loading-spinner" />

          <span>Loading receipts...</span>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="info-card">
        <div className="card-header">
          <h3>
            <FaReceipt />
            Recent Receipts
          </h3>
        </div>

        <div className="card-body">
          <div className="low-stock-error">{error}</div>
        </div>
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="info-card">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="card-header">
        <h3>
          <FaReceipt />
          Recent Receipts
        </h3>

        {receipts.length > 0 && (
          <span className="low-stock-count">{receipts.length}</span>
        )}
      </div>

      {/* ========================================================
          BODY
      ======================================================== */}

      <div className="card-body">
        {receipts.length === 0 ? (
          <div className="no-low-stock">
            <FaFileInvoice />

            <p>No receipts found.</p>
          </div>
        ) : (
          receipts.map((receipt) => (
            <div className="list-item" key={receipt.billId}>
              {/* RECEIPT INFORMATION */}

              <div>
                <h4>{formatReceiptNumber(receipt)}</h4>

                <p>
                  {receipt.customerName ||
                    receipt.customer?.customerName ||
                    receipt.customer?.name ||
                    "Unknown Customer"}
                </p>
              </div>

              {/* AMOUNT */}

              <span>{formatCurrency(receipt.total)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentReceipts;
