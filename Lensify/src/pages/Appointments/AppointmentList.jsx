import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaSearch
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "./AppointmentList.css";

function AppointmentList() {
  return (
    <div className="appointment-page">

      {/* Header */}

      <div className="page-header">

        <div>

          <h2>Appointments</h2>

          <p>Manage customer appointments</p>

        </div>

        <Link
          to="/appointments/add"
          className="add-btn"
        >

          <FaPlus />

          New Appointment

        </Link>

      </div>

      {/* Filters */}

      <div className="filter-card">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search customer..."
          />

        </div>

        <select>

          <option>All Status</option>

          <option>Confirmed</option>

          <option>Pending</option>

          <option>Completed</option>

          <option>Cancelled</option>

        </select>

        <input type="date"/>

      </div>

      {/* Table */}

      <div className="table-card">

        <table>

          <thead>

            <tr>

              <th>No</th>

              <th>Customer</th>

              <th>Doctor</th>

              <th>Date</th>

              <th>Time</th>

              <th>Purpose</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>APT001</td>

              <td>Rahul Sharma</td>

              <td>Dr. Mehta</td>

              <td>04 Jul 2026</td>

              <td>09:30 AM</td>

              <td>Eye Test</td>

              <td>

                <span className="status confirmed">

                  Confirmed

                </span>

              </td>

              <td className="action-buttons">

                <Link
                  to="/appointments/view/1"
                  className="view-btn"
                >
                  <FaEye />
                </Link>

                <Link
                  to="/appointments/edit/1"
                  className="edit-btn"
                >
                  <FaEdit />
                </Link>

                <button className="delete-btn">

                  <FaTrash />

                </button>

              </td>

            </tr>

            <tr>

              <td>APT002</td>

              <td>Priya Patel</td>

              <td>Dr. Shah</td>

              <td>04 Jul 2026</td>

              <td>11:00 AM</td>

              <td>Frame Selection</td>

              <td>

                <span className="status pending">

                  Pending

                </span>

              </td>

              <td className="action-buttons">

                <Link
                to="/appointments/view/1"
                className="view-btn"
            >
                <FaEye />
            </Link>

            <Link
                to="/appointments/edit/1"
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

export default AppointmentList;