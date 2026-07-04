import {
  FaArrowLeft,
  FaEdit,
  FaPrint,
  FaCalendarCheck,
  FaUser,
  FaFileMedical
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "./ViewAppointment.css";

function ViewAppointment() {

  return (

    <div className="view-appointment-page">

      {/* Header */}

      <div className="page-header">

        <div>

          <h2>

            <FaCalendarCheck />

            Appointment Details

          </h2>

          <p>View scheduled appointment information</p>

        </div>

      </div>

      {/* Appointment */}

      <div className="detail-card">

        <h3>Appointment Information</h3>

        <div className="detail-grid">

          <div>

            <label>Appointment No.</label>

            <span>APT001</span>

          </div>

          <div>

            <label>Status</label>

            <span className="status confirmed">

              Confirmed

            </span>

          </div>

          <div>

            <label>Date</label>

            <span>04 July 2026</span>

          </div>

          <div>

            <label>Time</label>

            <span>09:30 AM</span>

          </div>

          <div>

            <label>Doctor</label>

            <span>Dr. Mehta</span>

          </div>

        </div>

      </div>

      {/* Customer */}

      <div className="detail-card">

        <h3>

          <FaUser />

          Customer Information

        </h3>

        <div className="detail-grid">

          <div>

            <label>Name</label>

            <span>Rahul Sharma</span>

          </div>

          <div>

            <label>Mobile</label>

            <span>9876543210</span>

          </div>

          <div>

            <label>Email</label>

            <span>rahul@gmail.com</span>

          </div>

          <div>

            <label>City</label>

            <span>Mumbai</span>

          </div>

        </div>

      </div>

      {/* Notes */}

      <div className="detail-card">

        <h3>

          <FaFileMedical />

          Appointment Details

        </h3>

        <div className="detail-grid">

          <div>

            <label>Purpose</label>

            <span>Eye Test</span>

          </div>

          <div className="full-width">

            <label>Notes</label>

            <span>

              Customer complained about blurry vision while driving at night.

            </span>

          </div>

        </div>

      </div>

      {/* Buttons */}

      <div className="button-group">

        <Link
          to="/appointments"
          className="back-btn"
        >

          <FaArrowLeft />

          Back

        </Link>

        <Link
          to="/appointments/edit/1"
          className="edit-btn"
        >

          <FaEdit />

          Edit

        </Link>

        <button className="print-btn">

          <FaPrint />

          Print

        </button>

      </div>

    </div>

  );

}

export default ViewAppointment;