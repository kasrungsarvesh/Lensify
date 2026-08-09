import { useEffect, useState } from "react";
import {
  FaPrint,
  FaEdit,
  FaArrowLeft,
  FaFileMedical,
  FaUser,
  FaCalendarAlt,
  FaEye,
  FaGlasses,
  FaStickyNote,
  FaSpinner,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

import { getPrescriptionById } from "../../api/prescriptionApi";

import "./ViewPrescription.css";

function ViewPrescription() {
  const { id } = useParams();

  // =====================================================
  // STATE
  // =====================================================

  const [prescription, setPrescription] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // FETCH PRESCRIPTION
  // =====================================================

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPrescriptionById(id);

        console.log("Prescription Details:", response.data);

        const data = response.data?.data;

        if (!data) {
          throw new Error("Prescription details not found.");
        }

        setPrescription(data);
      } catch (err) {
        console.error("Error fetching prescription:", err);

        setError(
          err.response?.data?.message || "Unable to load prescription details.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPrescription();
    }
  }, [id]);

  // =====================================================
  // PRINT
  // =====================================================

  const handlePrint = () => {
    window.print();
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // FORMAT PRESCRIPTION ID
  // =====================================================

  const formatPrescriptionId = (prescriptionId) => {
    if (!prescriptionId) {
      return "—";
    }

    return `PRE${String(prescriptionId).padStart(4, "0")}`;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="prescription-loading-page">
        <div className="prescription-loading-card">
          <FaSpinner className="loading-spinner" />

          <h3>Loading Prescription</h3>

          <p>Please wait while prescription details are being loaded.</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !prescription) {
    return (
      <div className="prescription-error-page">
        <div className="prescription-error-card">
          <div className="error-icon">
            <FaFileMedical />
          </div>

          <h2>Prescription Not Found</h2>

          <p>{error || "The requested prescription could not be found."}</p>

          <Link to="/prescriptions" className="error-back-btn">
            <FaArrowLeft />
            Back To Prescriptions
          </Link>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="view-prescription-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="view-header">
        <div className="view-title">
          <div className="view-title-icon">
            <FaFileMedical />
          </div>

          <div>
            <h2>Prescription Details</h2>

            <p>
              Prescription ID:{" "}
              <strong>
                {formatPrescriptionId(prescription.prescriptionId)}
              </strong>
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button type="button" className="print-btn" onClick={handlePrint}>
            <FaPrint />
            Print
          </button>

          <Link
            to={`/prescriptions/edit/${id}`}
            className="edit-btn-prescription"
          >
            <FaEdit />
            Edit
          </Link>
        </div>
      </div>

      {/* =================================================
          CUSTOMER INFORMATION
      ================================================= */}

      <div className="view-card">
        <div className="card-heading">
          <div className="card-heading-icon customer">
            <FaUser />
          </div>

          <div>
            <h3>Customer Information</h3>

            <p>Customer and prescription information</p>
          </div>
        </div>

        <div className="customer-grid">
          <div className="detail-item">
            <label>Customer Name</label>

            <p className="primary-value">{prescription.customerName || "—"}</p>

            {prescription.customerId && (
              <span className="secondary-value">
                {/* Customer ID: {prescription.customerId} */}
                
                  <small>Customer Code: {prescription.customerCode}</small>
                
              </span>
            )}
          </div>

          <div className="detail-item">
            <label>Doctor Name</label>

            <p>{prescription.doctorName || "—"}</p>
          </div>

          <div className="detail-item">
            <label>Prescription Date</label>

            <p className="date-value">
              <FaCalendarAlt />

              {formatDate(prescription.prescriptionDate)}
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          EYE POWER
      ================================================= */}

      <div className="view-card eye-power-card">
        <div className="card-heading">
          <div className="card-heading-icon eye">
            <FaEye />
          </div>

          <div>
            <h3>Eye Power Details</h3>

            <p>Right and left eye prescription measurements</p>
          </div>
        </div>

        <div className="eye-table-wrapper">
          <table className="eye-table">
            <thead>
              <tr>
                <th>Eye</th>
                <th>SPH</th>
                <th>CYL</th>
                <th>AXIS</th>
                <th>VA</th>
              </tr>
            </thead>

            <tbody>
              {/* RIGHT EYE */}

              <tr>
                <td>
                  <div className="eye-name">
                    <span className="eye-dot right"></span>

                    <strong>Right Eye</strong>
                  </div>
                </td>

                <td>{prescription.rightEyeSph ?? "—"}</td>

                <td>{prescription.rightEyeCyl ?? "—"}</td>

                <td>{prescription.rightEyeAxis ?? "—"}</td>

                <td>{prescription.rightEyeVa || "—"}</td>
              </tr>

              {/* LEFT EYE */}

              <tr>
                <td>
                  <div className="eye-name">
                    <span className="eye-dot left"></span>

                    <strong>Left Eye</strong>
                  </div>
                </td>

                <td>{prescription.leftEyeSph ?? "—"}</td>

                <td>{prescription.leftEyeCyl ?? "—"}</td>

                <td>{prescription.leftEyeAxis ?? "—"}</td>

                <td>{prescription.leftEyeVa || "—"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================
          LENS INFORMATION
      ================================================= */}

      <div className="view-card">
        <div className="card-heading">
          <div className="card-heading-icon lens">
            <FaGlasses />
          </div>

          <div>
            <h3>Lens Information</h3>

            <p>Lens and optical configuration</p>
          </div>
        </div>

        <div className="lens-grid">
          <div className="detail-item">
            <label>PD Distance</label>

            <p>{prescription.pdDistance ?? "—"}</p>
          </div>

          <div className="detail-item">
            <label>PD Near</label>

            <p>{prescription.pdNear ?? "—"}</p>
          </div>

          <div className="detail-item">
            <label>Lens Type</label>

            <p>{prescription.lensType || "—"}</p>
          </div>

          <div className="detail-item">
            <label>Lens Index</label>

            <p>{prescription.lensIndex || "—"}</p>
          </div>

          <div className="detail-item">
            <label>Coating</label>

            <p>{prescription.coating || "—"}</p>
          </div>
        </div>
      </div>

      {/* =================================================
          REMARKS
      ================================================= */}

      <div className="view-card">
        <div className="card-heading">
          <div className="card-heading-icon remarks-icon">
            <FaStickyNote />
          </div>

          <div>
            <h3>Remarks</h3>

            <p>Additional prescription notes</p>
          </div>
        </div>

        <div className="remarks-box">
          <p>{prescription.remarks || "No remarks added."}</p>
        </div>
      </div>

      {/* =================================================
          AUDIT INFORMATION
      ================================================= */}

      <div className="audit-info">
        <span>
          Prescription ID:{" "}
          <strong>{formatPrescriptionId(prescription.prescriptionId)}</strong>
        </span>

        {prescription.createdAt && (
          <span>
            Created: <strong>{formatDate(prescription.createdAt)}</strong>
          </span>
        )}
      </div>

      {/* =================================================
          BACK
      ================================================= */}

      <Link to="/prescriptions" className="back-btn">
        <FaArrowLeft />
        Back To Prescriptions
      </Link>
    </div>
  );
}

export default ViewPrescription;
