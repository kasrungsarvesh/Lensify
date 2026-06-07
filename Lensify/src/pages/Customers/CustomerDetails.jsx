import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEye,
  FaFileInvoice,
  FaRupeeSign,
} from "react-icons/fa";

import "./CustomerDetails.css";

function CustomerDetails() {
  return (
    <div className="customer-details">

      {/* Profile Header */}

      <div className="profile-card">

        <div className="profile-avatar">
          RS
        </div>

        <div className="profile-info">

          <h2>Rahul Sharma</h2>

          <p>Customer Code : CUST001</p>

          <div className="profile-meta">

            <span>
              <FaPhone />
              9876543210
            </span>

            <span>
              <FaEnvelope />
              rahul@gmail.com
            </span>

            <span>
              <FaMapMarkerAlt />
              Mumbai
            </span>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">

          <FaEye className="stat-icon" />

          <h3>4</h3>

          <p>Prescriptions</p>

        </div>

        <div className="stat-card">

          <FaFileInvoice className="stat-icon" />

          <h3>7</h3>

          <p>Total Bills</p>

        </div>

        <div className="stat-card">

          <FaRupeeSign className="stat-icon" />

          <h3>₹24,500</h3>

          <p>Total Spend</p>

        </div>

      </div>

      {/* Recent Prescriptions */}

      <div className="details-card">

        <div className="card-header">
          <h3>Recent Prescriptions</h3>
        </div>

        <table>

          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Lens Type</th>
              <th>PD</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>20-Jun-2026</td>
              <td>Dr. Shah</td>
              <td>Progressive</td>
              <td>62</td>
            </tr>

            <tr>
              <td>10-Feb-2026</td>
              <td>Dr. Patel</td>
              <td>Single Vision</td>
              <td>60</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* Recent Bills */}

      <div className="details-card">

        <div className="card-header">
          <h3>Recent Bills</h3>
        </div>

        <table>

          <thead>
            <tr>
              <th>Bill No</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>BILL001</td>
              <td>20-Jun-2026</td>
              <td>₹5,500</td>
              <td>
                <span className="paid">
                  Paid
                </span>
              </td>
            </tr>

            <tr>
              <td>BILL002</td>
              <td>12-Apr-2026</td>
              <td>₹3,800</td>
              <td>
                <span className="due">
                  Due
                </span>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* Notes */}

      <div className="details-card">

        <div className="card-header">
          <h3>Customer Notes</h3>
        </div>

        <p className="notes">
          Regular customer. Prefers blue-light protection lenses.
          Contact before order dispatch.
        </p>

      </div>

    </div>
  );
}

export default CustomerDetails;