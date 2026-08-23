import { useEffect, useState } from "react";
import { FaPlus, FaEye, FaFileInvoiceDollar, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./ReceiptList.css";

function ReceiptList() {
  const [receipts, setReceipts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH RECEIPTS
  // =========================

  const fetchReceipts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/orders", {
        params: {
          page: 0,
          size: 100,
          sort: "orderId,desc",
          search: search || undefined,
        },
      });

      console.log("Orders Response:", response.data);

      setReceipts(response.data.data || []);
    } catch (error) {
      console.error("Fetch receipts error:", error);
      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to load receipts.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD RECEIPTS
  // =========================

  useEffect(() => {
    fetchReceipts();
  }, []);

  // =========================
  // SEARCH
  // =========================

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReceipts();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="receipt-page">
      {/* Header */}

      <div className="receipt-header">
        <div>
          <h2>Receipts</h2>
          <p>Manage customer bills and payments</p>
        </div>

        <Link to="/receipts/create" className="create-receipt-btn">
          <FaPlus />
          Create Receipt
        </Link>
      </div>

      {/* Search */}

      <div className="search-card">
        <input
          type="text"
          placeholder="Search by bill number or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Stats */}

      <div className="receipt-stats">
        <div className="stat-box">
          <FaFileInvoiceDollar />

          <div>
            <h3>{receipts.length}</h3>
            <p>Total Bills</p>
          </div>
        </div>

        <div className="stat-box">
          <FaFileInvoiceDollar />

          <div>
            <h3>
              ₹
              {receipts
                .reduce(
                  (sum, receipt) => sum + Number(receipt.totalAmount || 0),
                  0,
                )
                .toFixed(2)}
            </h3>

            <p>Total Revenue</p>
          </div>
        </div>

        <div className="stat-box">
          <FaFileInvoiceDollar />

          <div>
            <h3>₹0.00</h3>
            <p>Total Due</p>
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Bill No</th>
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
                <td colSpan="8">Loading receipts...</td>
              </tr>
            ) : receipts.length === 0 ? (
              <tr>
                <td colSpan="8">No receipts found.</td>
              </tr>
            ) : (
              receipts.map((receipt) => (
                <tr key={receipt.orderId}>
                  <td>
                    BILL
                    {String(receipt.orderId).padStart(3, "0")}
                  </td>

                  <td>{receipt.customerName}</td>

                  <td>
                    {receipt.orderDate
                      ? new Date(receipt.orderDate).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  <td>₹{Number(receipt.totalAmount || 0).toFixed(2)}</td>

                  {/* Payment will be connected later */}

                  <td>₹0.00</td>

                  <td>₹0.00</td>

                  <td>
                    <span
                      className={`status ${
                        receipt.status?.toLowerCase() === "paid"
                          ? "paid"
                          : "due"
                      }`}
                    >
                      {receipt.status || "Pending"}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <Link
                      to={`/receipts/${receipt.orderId}`}
                      className="view-btn"
                    >
                      <FaEye />
                    </Link>

                    <Link
                      to={`/receipts/edit/${receipt.orderId}`}
                      className="edit-btn"
                    >
                      <FaEdit />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReceiptList;
