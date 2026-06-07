import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./CustomerList.css";

function CustomerList() {
  return (
    <div className="customer-list-page">

      {/* Header */}
      <div className="customer-header">
        <div>
          <h2>Customers</h2>
          <p>Manage customer records and details</p>
        </div>

        <Link to="/customers/add" className="add-btn">
          <FaPlus />
          Add Customer
        </Link>
      </div>

      {/* Search */}
      <div className="search-card">
        <input
          type="text"
          placeholder="Search by name, mobile or customer code..."
        />
      </div>

      {/* Table */}
      <div className="table-card">

        <table>

          <thead>
            <tr>
              <th>Customer Code</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>CUST001</td>
              <td>Rahul Sharma</td>
              <td>9876543210</td>
              <td>Mumbai</td>
              <td>20-Jun-2026</td>
              <td>
                <span className="status active">
                  Active
                </span>
              </td>

              <td className="action-buttons">

                <button className="view-btn">
                  <FaEye />
                </button>

                <button className="edit-btn">
                  <FaEdit />
                </button>

                <button className="delete-btn">
                  <FaTrash />
                </button>

              </td>
            </tr>

            <tr>
              <td>CUST002</td>
              <td>Priya Patel</td>
              <td>9988776655</td>
              <td>Thane</td>
              <td>18-Jun-2026</td>
              <td>
                <span className="status active">
                  Active
                </span>
              </td>

              <td className="action-buttons">

                <Link
                  to="/customers/1"
                  className="view-btn"
                >
                  <FaEye />
                </Link>

                <Link
                to="/customers/edit/1"
                className="edit-btn"
              >
                <FaEdit />
              </Link>

                <button className="delete-btn">
                  <FaTrash />
                </button>

              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CustomerList;