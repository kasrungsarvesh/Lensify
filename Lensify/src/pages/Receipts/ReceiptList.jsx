import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEye,
  FaFileInvoiceDollar,
  FaEdit,
  FaSearch,
  FaMoneyBillWave,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./ReceiptList.css";

function ReceiptList() {
  const [receipts, setReceipts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Payment Modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    paymentType: "CASH",
    amount: "",
  });

  // =========================================================
  // FETCH RECEIPTS
  // =========================================================

  const fetchReceipts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/bills", {
        params: {
          page: 0,
          size: 100,
          sort: "billId,desc",
          search: search.trim() || undefined,
        },
      });

      setReceipts(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching receipts:", error);
      setReceipts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReceipts();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalRevenue = receipts.reduce(
    (sum, receipt) => sum + Number(receipt.total || 0),
    0,
  );

  const totalPaid = receipts.reduce(
    (sum, receipt) => sum + Number(receipt.paidAmount || 0),
    0,
  );

  const totalDue = receipts.reduce(
    (sum, receipt) => sum + Number(receipt.dueAmount || 0),
    0,
  );

  // =========================================================
  // FORMAT HELPERS
  // =========================================================

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "PAID":
        return "status-paid";

      case "PARTIAL":
        return "status-partial";

      case "PENDING":
        return "status-pending";

      default:
        return "status-pending";
    }
  };

  // =========================================================
  // OPEN PAYMENT MODAL
  // =========================================================

  const openPaymentModal = (receipt) => {
    const due = Number(receipt.dueAmount || 0);

    if (due <= 0) {
      alert("This receipt is already fully paid.");
      return;
    }

    setSelectedReceipt(receipt);

    setPaymentForm({
      paymentType: "CASH",
      amount: "",
    });

    setShowPaymentModal(true);
  };

  // =========================================================
  // CLOSE PAYMENT MODAL
  // =========================================================

  const closePaymentModal = () => {
    if (paymentLoading) return;

    setShowPaymentModal(false);
    setSelectedReceipt(null);

    setPaymentForm({
      paymentType: "CASH",
      amount: "",
    });
  };

  // =========================================================
  // HANDLE PAYMENT
  // =========================================================

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    setPaymentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();

    if (!selectedReceipt) return;

    const amount = Number(paymentForm.amount);
    const dueAmount = Number(selectedReceipt.dueAmount || 0);

    // Validate amount
    if (!amount || amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    // Do not allow overpayment
    if (amount > dueAmount) {
      alert(
        `Payment cannot exceed the remaining due amount.\n\nRemaining Due: ${formatCurrency(
          dueAmount,
        )}`,
      );
      return;
    }

    const paymentStatus = amount >= dueAmount ? "PAID" : "PARTIAL";

    try {
      setPaymentLoading(true);

      const response = await api.post("/payments", {
        billId: Number(selectedReceipt.billId),
        paymentType: paymentForm.paymentType,
        amount: Number(amount.toFixed(2)),
        status: paymentStatus,
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Payment failed.");
      }

      const newDue = Math.max(dueAmount - amount, 0);

      alert(
        `Payment added successfully!\n\n` +
          `Bill No: BILL${String(selectedReceipt.billId).padStart(3, "0")}\n` +
          `Customer: ${selectedReceipt.customerName || "-"}\n` +
          `Payment: ${formatCurrency(amount)}\n` +
          `Method: ${paymentForm.paymentType}\n` +
          `Remaining Due: ${formatCurrency(newDue)}`,
      );

      closePaymentModal();

      // Refresh receipt list
      await fetchReceipts();
    } catch (error) {
      console.error("Payment Error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to add payment.",
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="receipt-list-page">
      {/* ================= HEADER ================= */}

      <div className="receipt-page-header">
        <div>
          <h1>Receipts</h1>
          <p>Manage customer receipts and payment details</p>
        </div>

        <Link to="/receipts/create" className="create-receipt-btn">
          <FaPlus />
          Create Receipt
        </Link>
      </div>

      {/* ================= STATISTICS ================= */}

      <div className="receipt-stats">
        <div className="receipt-stat-card">
          <div className="receipt-stat-icon">
            <FaFileInvoiceDollar />
          </div>

          <div>
            <span>Total Receipts</span>
            <strong>{receipts.length}</strong>
          </div>
        </div>

        <div className="receipt-stat-card">
          <div className="receipt-stat-icon">₹</div>

          <div>
            <span>Total Revenue</span>
            <strong>{formatCurrency(totalRevenue)}</strong>
          </div>
        </div>

        <div className="receipt-stat-card">
          <div className="receipt-stat-icon">✓</div>

          <div>
            <span>Total Paid</span>
            <strong>{formatCurrency(totalPaid)}</strong>
          </div>
        </div>

        <div className="receipt-stat-card">
          <div className="receipt-stat-icon">₹</div>

          <div>
            <span>Total Due</span>
            <strong>{formatCurrency(totalDue)}</strong>
          </div>
        </div>
      </div>

      {/* ================= TABLE CARD ================= */}

      <div className="receipt-card">
        <div className="receipt-card-header">
          <div>
            <h2>Receipt List</h2>
            <p>View and manage generated receipts</p>
          </div>

          <div className="receipt-search">
            <FaSearch />

            <input
              type="text"
              placeholder="Search by customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="receipt-table-wrapper">
          <table className="receipt-table">
            <thead>
              <tr>
                <th>Bill No.</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="table-message">
                    Loading receipts...
                  </td>
                </tr>
              ) : receipts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="table-message">
                    No receipts found
                  </td>
                </tr>
              ) : (
                receipts.map((receipt) => {
                  const dueAmount = Number(receipt.dueAmount || 0);

                  return (
                    <tr key={receipt.billId}>
                      {/* Bill Number */}

                      <td>
                        <span className="bill-number">
                          BILL
                          {String(receipt.billId).padStart(3, "0")}
                        </span>
                      </td>

                      {/* Customer */}

                      <td>
                        <div className="customer-cell">
                          <div className="customer-avatar">
                            {receipt.customerName?.charAt(0)?.toUpperCase() ||
                              "C"}
                          </div>

                          <div className="customer-info">
                            <strong>{receipt.customerName || "-"}</strong>

                            <span>
                              Customer ID: {receipt.customerId || "-"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Date */}

                      <td>{formatDate(receipt.billDate)}</td>

                      {/* Total */}

                      <td>
                        <strong>{formatCurrency(receipt.total)}</strong>
                      </td>

                      {/* Paid */}

                      <td className="paid-amount">
                        {formatCurrency(receipt.paidAmount)}
                      </td>

                      {/* Due */}

                      <td className={dueAmount > 0 ? "due-amount" : "due-zero"}>
                        {formatCurrency(receipt.dueAmount)}
                      </td>

                      {/* Status */}

                      <td>
                        <span
                          className={`receipt-status ${getStatusClass(
                            receipt.status,
                          )}`}
                        >
                          {receipt.status || "PENDING"}
                        </span>
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="receipt-actions">
                          {/* View */}

                          <Link
                            to={`/receipts/${receipt.billId}`}
                            className="receipt-action-btn view-btn"
                            title="View Receipt"
                          >
                            <FaEye />
                          </Link>

                          {/* Edit */}

                          <Link
                            to={`/receipts/edit/${receipt.billId}`}
                            className="receipt-action-btn edit-btn"
                            title="Edit Receipt"
                          >
                            <FaEdit />
                          </Link>

                          {/* Add Payment */}

                          {dueAmount > 0 && (
                            <button
                              type="button"
                              className="receipt-action-btn payment-btn"
                              title="Add Payment"
                              onClick={() => openPaymentModal(receipt)}
                            >
                              <FaMoneyBillWave />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================
          ADD PAYMENT MODAL
          ===================================================== */}

      {showPaymentModal && selectedReceipt && (
        <div
          className="payment-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closePaymentModal();
            }
          }}
        >
          <div className="payment-modal">
            {/* Modal Header */}

            <div className="payment-modal-header">
              <div>
                <span className="payment-modal-label">PAYMENT</span>

                <h2>Add Payment</h2>

                <p>
                  BILL
                  {String(selectedReceipt.billId).padStart(3, "0")}
                  {" • "}
                  {selectedReceipt.customerName || "Customer"}
                </p>
              </div>

              <button
                type="button"
                className="payment-modal-close"
                onClick={closePaymentModal}
                disabled={paymentLoading}
              >
                <FaTimes />
              </button>
            </div>

            {/* Remaining Due */}

            <div className="payment-due-box">
              <span>Remaining Due</span>

              <strong>{formatCurrency(selectedReceipt.dueAmount)}</strong>
            </div>

            {/* Payment Form */}

            <form className="payment-form" onSubmit={handleAddPayment}>
              <div className="payment-form-group">
                <label htmlFor="paymentType">Payment Method</label>

                <select
                  id="paymentType"
                  name="paymentType"
                  value={paymentForm.paymentType}
                  onChange={handlePaymentChange}
                  disabled={paymentLoading}
                >
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                </select>
              </div>

              <div className="payment-form-group">
                <label htmlFor="paymentAmount">Payment Amount</label>

                <div className="payment-amount-input">
                  <span>₹</span>

                  <input
                    id="paymentAmount"
                    type="number"
                    min="0.01"
                    max={Number(selectedReceipt.dueAmount || 0)}
                    step="0.01"
                    name="amount"
                    placeholder="Enter amount"
                    value={paymentForm.amount}
                    onChange={handlePaymentChange}
                    disabled={paymentLoading}
                    required
                  />
                </div>

                <small>
                  Maximum payment: {formatCurrency(selectedReceipt.dueAmount)}
                </small>
              </div>

              {/* Payment Preview */}

              {Number(paymentForm.amount) > 0 && (
                <div className="payment-preview">
                  <div>
                    <span>Payment</span>

                    <strong>{formatCurrency(paymentForm.amount)}</strong>
                  </div>

                  <div>
                    <span>Remaining Due</span>

                    <strong>
                      {formatCurrency(
                        Math.max(
                          Number(selectedReceipt.dueAmount || 0) -
                            Number(paymentForm.amount || 0),
                          0,
                        ),
                      )}
                    </strong>
                  </div>
                </div>
              )}

              {/* Actions */}

              <div className="payment-modal-actions">
                <button
                  type="button"
                  className="payment-cancel-btn"
                  onClick={closePaymentModal}
                  disabled={paymentLoading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="payment-confirm-btn"
                  disabled={paymentLoading}
                >
                  <FaMoneyBillWave />

                  {paymentLoading ? "Processing..." : "Add Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceiptList;
