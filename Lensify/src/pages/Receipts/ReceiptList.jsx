import { FaPlus, FaEye, FaFileInvoiceDollar , FaEdit} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ReceiptList.css";


function ReceiptList() {
  return (
    <div className="receipt-page">

      {/* Header */}

      <div className="receipt-header">

        <div>
          <h2>Receipts</h2>
          <p>Manage customer bills and payments</p>
        </div>

        <Link
          to="/receipts/create"
          className="create-receipt-btn"
        >
          <FaPlus />
          Create Receipt
        </Link>

      </div>

      {/* Search */}

      <div className="search-card">

        <input
          type="text"
          placeholder="Search by bill number or customer..."
        />

      </div>

      {/* Stats */}

      <div className="receipt-stats">

        <div className="stat-box">

          <FaFileInvoiceDollar />

          <div>
            <h3>120</h3>
            <p>Total Bills</p>
          </div>

        </div>

        <div className="stat-box">

          <FaFileInvoiceDollar />

          <div>
            <h3>₹2,45,000</h3>
            <p>Total Revenue</p>
          </div>

        </div>

        <div className="stat-box">

          <FaFileInvoiceDollar />

          <div>
            <h3>₹18,500</h3>
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

            <tr>

              <td>BILL001</td>
              <td>Rahul Sharma</td>
              <td>20-Jun-2026</td>
              <td>₹5,500</td>
              <td>₹5,500</td>
              <td>₹0</td>

              <td>
                <span className="status paid">
                  Paid
                </span>
              </td>

              <td className="action-buttons">

              <Link
                to="/receipts/1"
                className="view-btn"
              >
                <FaEye />
              </Link>

              <Link
                to="/receipts/edit/1"
                className="edit-btn"
              >
                <FaEdit />
              </Link>

            </td>

            </tr>

            <tr>

              <td>BILL002</td>
              <td>Priya Patel</td>
              <td>18-Jun-2026</td>
              <td>₹3,800</td>
              <td>₹2,000</td>
              <td>₹1,800</td>

              <td>
                <span className="status due">
                  Due
                </span>
              </td>

              <td className="action-buttons">

                <Link
                  to="/receipts/2"
                  className="view-btn"
                >
                  <FaEye />
                </Link>

                <Link
                  to="/receipts/edit/2"
                  className="edit-btn"
                >
                  <FaEdit />
                </Link>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ReceiptList;