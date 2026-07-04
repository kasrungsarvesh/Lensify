import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarCheck,
  FaSave,
} from "react-icons/fa";

import "./EditAppointment.css";

function EditAppointment() {
  return (
    <div className="appointment-form-page">

      {/* Header */}

      <div className="page-header">

        <div>

          <h2>
            <FaCalendarCheck />
            Edit Appointment
          </h2>

          <p>Update appointment information</p>

        </div>

        <Link
          to="/appointments"
          className="back-btn"
        >
          <FaArrowLeft />
          Back
        </Link>

      </div>

      <form>

        {/* Appointment Information */}

        <div className="form-card">

          <h3>Appointment Information</h3>

          <div className="form-grid">

            <div>

              <label>Appointment No.</label>

              <input
                type="text"
                defaultValue="APT001"
                readOnly
              />

            </div>

            <div>

              <label>Appointment Date</label>

              <input
                type="date"
                defaultValue="2026-07-04"
              />

            </div>

            <div>

              <label>Doctor</label>

              <select defaultValue="Dr. Mehta">

                <option>Dr. Mehta</option>

                <option>Dr. Shah</option>

              </select>

            </div>

            <div>

              <label>Status</label>

              <select defaultValue="Confirmed">

                <option>Confirmed</option>

                <option>Pending</option>

                <option>Completed</option>

                <option>Cancelled</option>

              </select>

            </div>

          </div>

        </div>

        {/* Customer */}

        <div className="form-card">

          <h3>Customer Information</h3>

          <div className="form-grid">

            <div>

              <label>Customer Name</label>

              <input
                type="text"
                defaultValue="Rahul Sharma"
              />

            </div>

            <div>

              <label>Mobile Number</label>

              <input
                type="text"
                defaultValue="9876543210"
              />

            </div>

            <div>

              <label>Email</label>

              <input
                type="email"
                defaultValue="rahul@gmail.com"
              />

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="form-card">

          <h3>Appointment Details</h3>

          <div className="form-grid">

            <div>

              <label>Time</label>

              <input
                type="time"
                defaultValue="09:30"
              />

            </div>

            <div>

              <label>Purpose</label>

              <select defaultValue="Eye Test">

                <option>Eye Test</option>

                <option>Frame Selection</option>

                <option>Lens Consultation</option>

                <option>Delivery</option>

                <option>Follow-up</option>

              </select>

            </div>

            <div className="full-width">

              <label>Notes</label>

              <textarea
                rows="5"
                defaultValue="Customer complained about blurry vision while driving at night."
              />

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="form-buttons">

          <Link
            to="/appointments"
            className="cancel-btn"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="save-btn"
          >
            <FaSave />
            Update Appointment
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditAppointment;