import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarPlus,
  FaSave,
} from "react-icons/fa";

import "./AddAppointment.css";

function AddAppointment() {

  return (

    <div className="appointment-form-page">

      {/* Header */}

      <div className="page-header">

        <div>

          <h2>

            <FaCalendarPlus />

            New Appointment

          </h2>

          <p>Schedule a customer appointment</p>

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
                value="APT003"
                readOnly
              />

            </div>

            <div>

              <label>Appointment Date</label>

              <input type="date" />

            </div>

            <div>

              <label>Doctor</label>

              <select>

                <option>Select Doctor</option>

                <option>Dr. Mehta</option>

                <option>Dr. Shah</option>

              </select>

            </div>

            <div>

              <label>Status</label>

              <select>

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
                placeholder="Enter customer name"
              />

            </div>

            <div>

              <label>Mobile Number</label>

              <input
                type="text"
                placeholder="9876543210"
              />

            </div>

            <div>

              <label>Email</label>

              <input
                type="email"
                placeholder="example@gmail.com"
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

              <input type="time" />

            </div>

            <div>

              <label>Purpose</label>

              <select>

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
                placeholder="Additional notes..."
              ></textarea>

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

            Save Appointment

          </button>

        </div>

      </form>

    </div>

  );

}

export default AddAppointment;