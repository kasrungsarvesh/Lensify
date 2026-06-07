import { FaPlus, FaEye, FaEdit, FaFileMedical } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./PrescriptionList.css";

function PrescriptionList() {
  return (
    <div className="prescription-page">

      {/* Header */}

      <div className="prescription-header">

        <div>
          <h2>Prescriptions</h2>
          <p>
            Manage customer eye prescriptions
          </p>
        </div>

        <Link
          to="/prescriptions/add"
          className="add-prescription-btn"
        >
          <FaPlus />
          Add Prescription
        </Link>

      </div>

      {/* Search */}

      <div className="search-card">

        <input
          type="text"
          placeholder="Search by customer name..."
        />

      </div>

      {/* Statistics */}

      <div className="prescription-stats">

        <div className="stat-box">

          <FaFileMedical />

          <div>
            <h3>145</h3>
            <p>Total Prescriptions</p>
          </div>

        </div>

        <div className="stat-box">

          <FaFileMedical />

          <div>
            <h3>12</h3>
            <p>Today's Prescriptions</p>
          </div>

        </div>

      </div>

      {/* Table */}

      <div className="table-card">

        <table>

          <thead>

            <tr>

              <th>Prescription ID</th>

              <th>Customer</th>

              <th>Doctor</th>

              <th>Lens Type</th>

              <th>Date</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>PRE001</td>

              <td>Rahul Sharma</td>

              <td>Dr. Shah</td>

              <td>Progressive</td>

              <td>20-Jun-2026</td>

              <td className="action-buttons">

                <Link
                  to="/prescriptions/1"
                  className="view-btn"
                >
                  <FaEye />
                </Link>

                <Link
                  to="/prescriptions/edit/1"
                  className="edit-btn"
                >
                  <FaEdit />
                </Link>

              </td>

            </tr>

            <tr>

              <td>PRE002</td>

              <td>Priya Patel</td>

              <td>Dr. Patel</td>

              <td>Single Vision</td>

              <td>18-Jun-2026</td>

              <td className="action-buttons">

                <Link
                  to="/prescriptions/2"
                  className="view-btn"
                >
                  <FaEye />
                </Link>

                <Link
                  to="/prescriptions/edit/2"
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

export default PrescriptionList;