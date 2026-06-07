import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import "./CreateReceipt.css";

function EditReceipt() {
  const { id } = useParams();

  const [receipt, setReceipt] = useState({
    customer: "Rahul Sharma",
    prescription: "PRE001",
    billDate: "2026-06-20",

    subtotal: 5500,
    discount: 500,
    tax: 250,

    paidAmount: 5000,
    dueAmount: 250,

    paymentMethod: "UPI",
  });

  const handleChange = (e) => {
    setReceipt({
      ...receipt,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Receipt Updated Successfully");
  };

  return (
    <div className="receipt-container">

      <div className="receipt-header">

        <div>
          <h2>Edit Receipt</h2>
          <p>Bill No : BILL00{id}</p>
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        {/* Customer Info */}

        <div className="receipt-card">

          <h3>Customer Information</h3>

          <div className="grid-3">

            <div>
              <label>Customer</label>

              <input
                name="customer"
                value={receipt.customer}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Prescription</label>

              <input
                name="prescription"
                value={receipt.prescription}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Bill Date</label>

              <input
                type="date"
                name="billDate"
                value={receipt.billDate}
                onChange={handleChange}
              />
            </div>

          </div>

        </div>

        {/* Summary */}

        <div className="receipt-card">

          <h3>Bill Summary</h3>

          <div className="grid-3">

            <div>
              <label>Subtotal</label>

              <input
                type="number"
                name="subtotal"
                value={receipt.subtotal}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Discount</label>

              <input
                type="number"
                name="discount"
                value={receipt.discount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Tax</label>

              <input
                type="number"
                name="tax"
                value={receipt.tax}
                onChange={handleChange}
              />
            </div>

          </div>

        </div>

        {/* Payment */}

        <div className="receipt-card">

          <h3>Payment Details</h3>

          <div className="grid-3">

            <div>
              <label>Payment Method</label>

              <select
                name="paymentMethod"
                value={receipt.paymentMethod}
                onChange={handleChange}
              >
                <option>Cash</option>
                <option>Card</option>
                <option>UPI</option>
              </select>
            </div>

            <div>
              <label>Paid Amount</label>

              <input
                type="number"
                name="paidAmount"
                value={receipt.paidAmount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Due Amount</label>

              <input
                type="number"
                name="dueAmount"
                value={receipt.dueAmount}
                onChange={handleChange}
              />
            </div>

          </div>

        </div>

        <button
          type="submit"
          className="generate-btn"
        >
          <FaSave />
          Update Receipt
        </button>

      </form>

    </div>
  );
}

export default EditReceipt;