import { useEffect, useState } from "react";
import {
  FaPrint,
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";
import "./ViewReceipt.css";

function ViewReceipt() {
  const { id } = useParams();

  const [bill, setBill] = useState(null);
  const [order, setOrder] = useState(null);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    paymentType: "CASH",
    amount: "",
  });

  // =========================================================
  // FETCH BILL
  // =========================================================

  const fetchBill = async () => {
    try {
      const response = await api.get(`/bills/${id}`);

      console.log("Bill:", response.data);

      setBill(response.data?.data || null);

      return response.data?.data;
    } catch (error) {
      console.error("Fetch bill error:", error);
      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to fetch bill.");

      return null;
    }
  };

  // =========================================================
  // FETCH ORDER
  // =========================================================

  const fetchOrder = async (orderId) => {
    if (!orderId) {
      setOrder(null);
      return;
    }

    try {
      const response = await api.get(`/orders/${orderId}`);

      console.log("Order:", response.data);

      setOrder(response.data?.data || null);
    } catch (error) {
      console.error("Fetch order error:", error);
      console.error("Backend error:", error.response?.data);

      setOrder(null);
    }
  };

  // =========================================================
  // FETCH PAYMENTS
  // =========================================================

  const fetchPayments = async () => {
    try {
      const response = await api.get(`/payments/bill/${id}`);

      console.log("Payments:", response.data);

      setPayments(response.data?.data || []);
    } catch (error) {
      console.error("Fetch payments error:", error);

      console.error("Backend error:", error.response?.data);

      setPayments([]);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  const loadReceipt = async () => {
    try {
      setLoading(true);

      const billData = await fetchBill();

      if (billData?.orderId) {
        await fetchOrder(billData.orderId);
      }

      await fetchPayments();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReceipt();
  }, [id]);

  // =========================================================
  // PAYMENT CALCULATIONS
  // =========================================================

  const totalAmount = Number(bill?.total || 0);

  const totalPaid = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0,
  );

  const dueAmount = Math.max(totalAmount - totalPaid, 0);

  const paymentStatus =
    dueAmount <= 0 ? "PAID" : totalPaid > 0 ? "PARTIAL" : "PENDING";

  // =========================================================
  // PAYMENT FORM CHANGE
  // =========================================================

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    setPaymentForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // OPEN PAYMENT MODAL
  // =========================================================

  const openPaymentModal = () => {
    if (dueAmount <= 0) {
      alert("This bill is already fully paid.");
      return;
    }

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
    if (paymentLoading) {
      return;
    }

    setShowPaymentModal(false);
  };

  // =========================================================
  // ADD PAYMENT
  // =========================================================

  const handleAddPayment = async (e) => {
    e.preventDefault();

    const amount = Number(paymentForm.amount);

    // -------------------------------------------------------
    // Validate amount
    // -------------------------------------------------------

    if (!amount || amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    // -------------------------------------------------------
    // Do not allow payment greater than due
    // -------------------------------------------------------

    if (amount > dueAmount) {
      alert(`Payment cannot exceed remaining due of ₹${dueAmount.toFixed(2)}.`);
      return;
    }

    try {
      setPaymentLoading(true);

      const paymentStatus = amount >= dueAmount ? "PAID" : "PARTIAL";

      const paymentRequest = {
        billId: Number(id),
        paymentType: paymentForm.paymentType,
        amount: Number(amount.toFixed(2)),
        status: paymentStatus,
      };

      console.log("Adding Payment:", paymentRequest);

      const response = await api.post("/payments", paymentRequest);

      console.log("Payment Response:", response.data);

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Payment could not be added.",
        );
      }

      // -----------------------------------------------------
      // Refresh bill and payments
      // -----------------------------------------------------

      await fetchBill();
      await fetchPayments();

      setShowPaymentModal(false);

      setPaymentForm({
        paymentType: "CASH",
        amount: "",
      });

      alert(
        `Payment added successfully!\n\n` +
          `Payment: ₹${amount.toFixed(2)}\n` +
          `Previous Due: ₹${dueAmount.toFixed(2)}\n` +
          `Remaining Due: ₹${Math.max(dueAmount - amount, 0).toFixed(2)}`,
      );
    } catch (error) {
      console.error("Add payment error:", error);

      console.error("Backend error:", error.response?.data);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to add payment.",
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  // =========================================================
  // PRINT
  // =========================================================

  const handlePrint = () => {
    window.print();
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // ITEM NAME
  // =========================================================

  const getItemName = (item) => {
    if (item.productName) {
      return item.productName;
    }

    if (item.lensBrand) {
      return `${item.lensBrand} Lens`;
    }

    if (item.lensId) {
      return `Lens #${item.lensId}`;
    }

    if (item.productId) {
      return `Product #${item.productId}`;
    }

    return "Item";
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="view-receipt-page">
        <div className="receipt-loading">Loading receipt...</div>
      </div>
    );
  }

  // =========================================================
  // BILL NOT FOUND
  // =========================================================

  if (!bill) {
    return (
      <div className="view-receipt-page">
        <div className="receipt-empty">
          <h3>Receipt not found</h3>

          <p>The requested bill could not be found.</p>

          <Link to="/receipts" className="back-btn">
            <FaArrowLeft />
            Back To Receipts
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="view-receipt-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="receipt-view-header">
        <div>
          <span className="page-label">BILLING</span>

          <h2>Invoice Details</h2>

          <p>
            Bill No:{" "}
            <strong>
              BILL
              {String(bill.billId).padStart(3, "0")}
            </strong>
          </p>
        </div>

        <div className="receipt-actions">
          <button type="button" className="print-btn" onClick={handlePrint}>
            <FaPrint />
            Print Invoice
          </button>
        </div>
      </div>

      {/* =====================================================
          CUSTOMER INFORMATION
      ===================================================== */}

      <div className="receipt-card">
        <div className="card-title-row">
          <div>
            <h3>Customer Information</h3>

            <p>Customer details associated with this bill</p>
          </div>

          <span className="bill-status">{paymentStatus}</span>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <label>Customer Name</label>

            <p>{bill.customerName || "-"}</p>
          </div>

          <div className="info-item">
            <label>Customer ID</label>

            <p>{bill.customerId || "-"}</p>
          </div>

          <div className="info-item">
            <label>Bill Date</label>

            <p>{formatDate(bill.billDate)}</p>
          </div>
        </div>
      </div>

      {/* =====================================================
          PURCHASED ITEMS
      ===================================================== */}

      <div className="receipt-card">
        <div className="card-title-row">
          <div>
            <h3>Purchased Items</h3>

            <p>Frames and lenses included in this order</p>
          </div>
        </div>

        {order?.items?.length > 0 ? (
          <div className="table-wrapper">
            <table className="receipt-items-table">
              <thead>
                <tr>
                  <th>Item</th>

                  <th>Type</th>

                  <th>Qty</th>

                  <th>Price</th>

                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((item, index) => {
                  const itemTotal =
                    Number(item.price || 0) * Number(item.quantity || 0);

                  return (
                    <tr key={item.orderItemId || index}>
                      <td>
                        <strong>{getItemName(item)}</strong>
                      </td>

                      <td>
                        <span className="item-type">
                          {item.productId ? "Frame" : "Lens"}
                        </span>
                      </td>

                      <td>{item.quantity}</td>

                      <td>₹{Number(item.price || 0).toFixed(2)}</td>

                      <td>
                        <strong>₹{itemTotal.toFixed(2)}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-items">No item details available.</div>
        )}
      </div>

      {/* =====================================================
          PAYMENT SUMMARY
      ===================================================== */}

      <div className="receipt-card">
        <div className="card-title-row">
          <div>
            <h3>Payment Summary</h3>

            <p>Current financial status of this bill</p>
          </div>

          <span className={`payment-status ${paymentStatus.toLowerCase()}`}>
            {paymentStatus}
          </span>
        </div>

        <div className="summary-grid">
          <div className="summary-row">
            <span>Subtotal</span>

            <strong>₹{Number(bill.subtotal || 0).toFixed(2)}</strong>
          </div>

          <div className="summary-row">
            <span>Discount</span>

            <strong className="discount-value">
              - ₹{Number(bill.discount || 0).toFixed(2)}
            </strong>
          </div>

          <div className="summary-row">
            <span>GST</span>

            <strong>₹{Number(bill.gst || 0).toFixed(2)}</strong>
          </div>

          <div className="summary-row total-row">
            <span>Total Amount</span>

            <strong>₹{totalAmount.toFixed(2)}</strong>
          </div>

          <div className="summary-row paid-row">
            <span>Total Paid</span>

            <strong>₹{totalPaid.toFixed(2)}</strong>
          </div>

          <div className="summary-row due-row">
            <span>Remaining Due</span>

            <strong>₹{dueAmount.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          PAYMENT HISTORY
      ===================================================== */}

      <div className="receipt-card">
        <div className="payment-history-header">
          <div>
            <h3>Payment History</h3>

            <p>All payment transactions for this bill</p>
          </div>

          {dueAmount > 0 && (
            <button
              type="button"
              className="add-payment-btn"
              onClick={openPaymentModal}
            >
              <FaPlus />
              Add Payment
            </button>
          )}
        </div>

        {payments.length > 0 ? (
          <div className="table-wrapper">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>#</th>

                  <th>Payment Method</th>

                  <th>Amount</th>

                  <th>Payment Date</th>

                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.paymentId}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="payment-method">
                        <span className="payment-icon">
                          <FaMoneyBillWave />
                        </span>

                        <strong>{payment.paymentType}</strong>
                      </div>
                    </td>

                    <td>
                      <strong>₹{Number(payment.amount || 0).toFixed(2)}</strong>
                    </td>

                    <td>{formatDate(payment.paymentDate)}</td>

                    <td>
                      <span className="transaction-status">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-payments">
            <div className="no-payment-icon">
              <FaMoneyBillWave />
            </div>

            <h4>No payments recorded</h4>

            <p>No payment has been made against this bill yet.</p>
          </div>
        )}
      </div>

      {/* =====================================================
          BOTTOM ACTIONS
      ===================================================== */}

      <div className="bottom-actions">
        <Link to="/receipts" className="back-btn">
          <FaArrowLeft />
          Back To Receipts
        </Link>

        {dueAmount > 0 && (
          <button
            type="button"
            className="bottom-payment-btn"
            onClick={openPaymentModal}
          >
            <FaPlus />
            Add Payment
          </button>
        )}
      </div>

      {/* =====================================================
          ADD PAYMENT MODAL
      ===================================================== */}

      {showPaymentModal && (
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
                <h3>Add Payment</h3>

                <p>
                  BILL
                  {String(bill.billId).padStart(3, "0")}
                </p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={closePaymentModal}
                disabled={paymentLoading}
              >
                <FaTimes />
              </button>
            </div>

            {/* Remaining Due */}

            <div className="remaining-due-box">
              <span>Remaining Due</span>

              <strong>₹{dueAmount.toFixed(2)}</strong>
            </div>

            {/* Payment Form */}

            <form onSubmit={handleAddPayment}>
              <div className="modal-form-group">
                <label>Payment Method</label>

                <select
                  name="paymentType"
                  value={paymentForm.paymentType}
                  onChange={handlePaymentChange}
                  disabled={paymentLoading}
                >
                  <option value="CASH">Cash</option>

                  <option value="UPI">UPI</option>

                  <option value="CARD">Card</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label>Payment Amount</label>

                <div className="amount-input-wrapper">
                  <span>₹</span>

                  <input
                    type="number"
                    name="amount"
                    min="0.01"
                    max={dueAmount}
                    step="0.01"
                    value={paymentForm.amount}
                    onChange={handlePaymentChange}
                    placeholder="Enter payment amount"
                    disabled={paymentLoading}
                    autoFocus
                  />
                </div>

                <small>Maximum payment: ₹{dueAmount.toFixed(2)}</small>
              </div>

              {/* Preview */}

              {Number(paymentForm.amount) > 0 &&
                Number(paymentForm.amount) <= dueAmount && (
                  <div className="payment-preview">
                    <div>
                      <span>Current Due</span>

                      <strong>₹{dueAmount.toFixed(2)}</strong>
                    </div>

                    <div>
                      <span>This Payment</span>

                      <strong>₹{Number(paymentForm.amount).toFixed(2)}</strong>
                    </div>

                    <div className="preview-remaining">
                      <span>Remaining After Payment</span>

                      <strong>
                        ₹
                        {Math.max(
                          dueAmount - Number(paymentForm.amount),
                          0,
                        ).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                )}

              {/* Modal Actions */}

              <div className="payment-modal-actions">
                <button
                  type="button"
                  className="cancel-payment-btn"
                  onClick={closePaymentModal}
                  disabled={paymentLoading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="confirm-payment-btn"
                  disabled={paymentLoading}
                >
                  <FaMoneyBillWave />

                  {paymentLoading ? "Adding Payment..." : "Add Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewReceipt;
