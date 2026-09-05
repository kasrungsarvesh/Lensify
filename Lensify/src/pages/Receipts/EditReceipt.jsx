import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaSave,
  FaArrowLeft,
  FaRupeeSign,
  FaCreditCard,
  FaCalendarAlt,
} from "react-icons/fa";

import api from "../../api/axios";
import "./CreateReceipt.css";

function EditReceipt() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [receipt, setReceipt] = useState(null);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    subtotal: "",
    discount: "",
    gst: "",
  });

  const [paymentData, setPaymentData] = useState({
    paymentType: "",
    amount: "",
  });

  /* =====================================================
     FETCH BILL + PAYMENTS
     ===================================================== */

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        setLoading(true);

        const [billResponse, paymentResponse] = await Promise.all([
          api.get(`/bills/${id}`),
          api.get(`/payments/bill/${id}`),
        ]);

        const bill = billResponse.data?.data;
        const paymentList = paymentResponse.data?.data || [];

        if (!bill) {
          throw new Error("Receipt not found");
        }

        setReceipt(bill);
        setPayments(paymentList);

        setFormData({
          subtotal: bill.subtotal ?? "",
          discount: bill.discount ?? "",
          gst: bill.gst ?? "",
        });

        /*
         * If there is only one payment, load it into
         * the editable payment fields.
         */
        if (paymentList.length === 1) {
          setPaymentData({
            paymentType: paymentList[0].paymentType || "CASH",
            amount: paymentList[0].amount ?? "",
          });
        }
      } catch (error) {
        console.error("Error fetching receipt:", error);

        alert(error.response?.data?.message || "Unable to load receipt.");

        navigate("/receipts");
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [id, navigate]);

  /* =====================================================
     INPUT CHANGE
     ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     CALCULATIONS
     ===================================================== */

  const subtotal = Number(formData.subtotal) || 0;
  const discount = Number(formData.discount) || 0;
  const gst = Number(formData.gst) || 0;

  const total = Math.max(subtotal - discount + gst, 0);

  const currentPaidAmount = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0,
  );

  /*
   * If one payment exists and user changes its amount,
   * calculate the new expected paid amount.
   */
  const editedPaidAmount =
    payments.length === 1 && paymentData.amount !== ""
      ? Number(paymentData.amount) || 0
      : currentPaidAmount;

  const dueAmount = Math.max(total - editedPaidAmount, 0);

  /* =====================================================
     UPDATE RECEIPT
     ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (subtotal < 0) {
        alert("Subtotal cannot be negative.");
        return;
      }

      if (discount < 0) {
        alert("Discount cannot be negative.");
        return;
      }

      if (gst < 0) {
        alert("GST cannot be negative.");
        return;
      }

      /*
       * Payment amount validation only when
       * there is exactly one payment.
       */
      if (payments.length === 1) {
        const newPaymentAmount = Number(paymentData.amount) || 0;

        if (newPaymentAmount < 0) {
          alert("Payment amount cannot be negative.");
          return;
        }

        if (newPaymentAmount > total) {
          alert(
            `Payment amount cannot exceed bill total.\n\nBill Total: ₹${total.toFixed(
              2,
            )}`,
          );
          return;
        }
      }

      setSaving(true);

      /* ================================================
         UPDATE BILL
         ================================================ */

      await api.put(`/bills/${id}`, {
        customerId: receipt.customerId,
        orderId: receipt.orderId,
        subtotal: subtotal,
        discount: discount,
        gst: gst,
      });

      /* ================================================
         UPDATE PAYMENT
         ================================================ */

      /*
       * We only update payment directly when there is
       * exactly ONE payment.
       *
       * If there are multiple payments, the total paid
       * amount must not be replaced with a single payment.
       */
      if (payments.length === 1) {
        const payment = payments[0];

        const newAmount = Number(paymentData.amount) || 0;

        await api.put(`/payments/${payment.paymentId}`, {
          billId: id,
          paymentType: paymentData.paymentType || "CASH",
          amount: newAmount,
        });
      }

      alert(
        `Receipt updated successfully!\n\n` +
          `Bill No: BILL${String(id).padStart(3, "0")}\n` +
          `Customer: ${receipt.customerName}\n` +
          `Total: ₹${total.toFixed(2)}\n` +
          `Paid: ₹${editedPaidAmount.toFixed(2)}\n` +
          `Due: ₹${dueAmount.toFixed(2)}`,
      );

      navigate("/receipts");
    } catch (error) {
      console.error("Update Receipt Error:", error);

      alert(error.response?.data?.message || "Failed to update receipt.");
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     LOADING
     ===================================================== */

  if (loading) {
    return (
      <div className="receipt-container">
        <div className="receipt-card">
          <p>Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (!receipt) {
    return null;
  }

  /* =====================================================
     UI
     ===================================================== */

  return (
    <div className="receipt-container">
      {/* ================= HEADER ================= */}

      <div className="receipt-header">
        <div>
          <h2>Edit Receipt</h2>

          <p>
            Bill No : BILL
            {String(receipt.billId).padStart(3, "0")}
          </p>
        </div>

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/receipts")}
        >
          <FaArrowLeft />
          Back to Receipts
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ================= CUSTOMER ================= */}

        <div className="receipt-card">
          <h3>Customer Information</h3>

          <div className="grid-3">
            <div>
              <label>Customer</label>

              <input type="text" value={receipt.customerName || ""} readOnly />
            </div>

            <div>
              <label>Customer ID</label>

              <input type="text" value={receipt.customerId || ""} readOnly />
            </div>

            <div>
              <label>Bill Date</label>

              <div className="readonly-input-wrapper">
                <FaCalendarAlt />

                <input
                  type="text"
                  value={
                    receipt.billDate
                      ? new Date(receipt.billDate).toLocaleDateString("en-IN")
                      : ""
                  }
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= BILL SUMMARY ================= */}

        <div className="receipt-card">
          <h3>Bill Summary</h3>

          <div className="grid-3">
            <div>
              <label>Subtotal</label>

              <input
                type="number"
                name="subtotal"
                min="0"
                step="0.01"
                value={formData.subtotal}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Discount</label>

              <input
                type="number"
                name="discount"
                min="0"
                step="0.01"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>GST Amount</label>

              <input
                type="number"
                name="gst"
                min="0"
                step="0.01"
                value={formData.gst}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* SUMMARY */}

          <div className="edit-receipt-summary">
            <div>
              <span>Total</span>
              <strong>₹{total.toFixed(2)}</strong>
            </div>

            <div>
              <span>Paid</span>
              <strong className="paid-text">
                ₹{editedPaidAmount.toFixed(2)}
              </strong>
            </div>

            <div>
              <span>Due</span>
              <strong className={dueAmount > 0 ? "due-text" : "paid-text"}>
                ₹{dueAmount.toFixed(2)}
              </strong>
            </div>
          </div>
        </div>

        {/* ================= PAYMENT ================= */}

        <div className="receipt-card">
          <h3>Payment Details</h3>

          {payments.length === 0 ? (
            <div className="no-payment-message">
              <FaRupeeSign />

              <div>
                <strong>No payment recorded</strong>
                <p>This receipt currently has no payment transaction.</p>
              </div>
            </div>
          ) : payments.length === 1 ? (
            <div className="grid-3">
              <div>
                <label>Payment Method</label>

                <select
                  name="paymentType"
                  value={paymentData.paymentType}
                  onChange={handlePaymentChange}
                >
                  <option value="CASH">Cash</option>

                  <option value="CARD">Card</option>

                  <option value="UPI">UPI</option>
                </select>
              </div>

              <div>
                <label>Paid Amount</label>

                <input
                  type="number"
                  name="amount"
                  min="0"
                  step="0.01"
                  value={paymentData.amount}
                  onChange={handlePaymentChange}
                />
              </div>

              <div>
                <label>Payment Date</label>

                <input
                  type="text"
                  value={
                    payments[0].paymentDate
                      ? new Date(payments[0].paymentDate).toLocaleDateString(
                          "en-IN",
                        )
                      : ""
                  }
                  readOnly
                />
              </div>
            </div>
          ) : (
            <div className="payment-history">
              <div className="payment-history-header">
                <strong>Payment History</strong>

                <span>{payments.length} payments</span>
              </div>

              <div className="payment-history-list">
                {payments.map((payment) => (
                  <div className="payment-history-row" key={payment.paymentId}>
                    <div className="payment-history-icon">
                      <FaCreditCard />
                    </div>

                    <div className="payment-history-info">
                      <strong>{payment.paymentType || "CASH"}</strong>

                      <span>
                        {payment.paymentDate
                          ? new Date(payment.paymentDate).toLocaleDateString(
                              "en-IN",
                            )
                          : "-"}
                      </span>
                    </div>

                    <strong className="payment-history-amount">
                      ₹{Number(payment.amount || 0).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="payment-history-total">
                <span>Total Paid</span>

                <strong>₹{currentPaidAmount.toFixed(2)}</strong>
              </div>

              <p className="payment-edit-note">
                This receipt has multiple payment transactions. Payment history
                is shown here to prevent accidentally replacing multiple
                payments with a single amount.
              </p>
            </div>
          )}
        </div>

        {/* ================= ACTIONS ================= */}

        <div className="receipt-form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/receipts")}
            disabled={saving}
          >
            Cancel
          </button>

          <button type="submit" className="generate-btn" disabled={saving}>
            <FaSave />

            {saving ? "Updating..." : "Update Receipt"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditReceipt;
