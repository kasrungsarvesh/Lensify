import { FaPrint, FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./ViewReceipt.css";

function ViewReceipt() {
  const { id } = useParams();

  return (
    <div className="view-receipt-page">

      {/* Header */}

      <div className="receipt-view-header">

        <div>
          <h2>Invoice Details</h2>
          <p>Bill No : BILL00{id}</p>
        </div>

        <div className="receipt-actions">

          <button className="print-btn">
            <FaPrint />
            Print Invoice
          </button>

        </div>

      </div>

      {/* Customer Information */}

      <div className="receipt-card">

        <h3>Customer Information</h3>

        <div className="info-grid">

          <div>
            <label>Customer Name</label>
            <p>Rahul Sharma</p>
          </div>

          <div>
            <label>Mobile</label>
            <p>9876543210</p>
          </div>

          <div>
            <label>Bill Date</label>
            <p>20-Jun-2026</p>
          </div>

        </div>

      </div>

      {/* Product Items */}

      <div className="receipt-card">

        <h3>Purchased Items</h3>

        <table>

          <thead>

            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>RayBan Frame</td>
              <td>1</td>
              <td>₹2500</td>
              <td>₹2500</td>
            </tr>

            <tr>
              <td>Blue Cut Lens</td>
              <td>2</td>
              <td>₹1500</td>
              <td>₹3000</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* Payment Summary */}

      <div className="receipt-card">

        <h3>Payment Summary</h3>

        <div className="summary-grid">

          <div>
            <span>Subtotal</span>
            <strong>₹5500</strong>
          </div>

          <div>
            <span>Discount</span>
            <strong>₹500</strong>
          </div>

          <div>
            <span>Tax</span>
            <strong>₹250</strong>
          </div>

          <div>
            <span>Total Amount</span>
            <strong>₹5250</strong>
          </div>

          <div>
            <span>Paid Amount</span>
            <strong>₹5000</strong>
          </div>

          <div>
            <span>Due Amount</span>
            <strong className="due">
              ₹250
            </strong>
          </div>

        </div>

      </div>

      {/* Payment Details */}

      <div className="receipt-card">

        <h3>Payment Details</h3>

        <div className="info-grid">

          <div>
            <label>Payment Method</label>
            <p>UPI</p>
          </div>

          <div>
            <label>Transaction ID</label>
            <p>TXN123456789</p>
          </div>

          <div>
            <label>Status</label>
            <p className="paid-status">
              Partially Paid
            </p>
          </div>

        </div>

      </div>

      <Link
        to="/receipts"
        className="back-btn"
      >
        <FaArrowLeft />
        Back To Receipts
      </Link>

    </div>
  );
}

export default ViewReceipt;