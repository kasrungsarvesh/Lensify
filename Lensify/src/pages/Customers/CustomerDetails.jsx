import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getPrescriptionCountByCustomer,
  getPrescriptionsByCustomer,
} from "../../api/prescriptionApi";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEye,
  FaFileInvoice,
  FaRupeeSign,
  FaArrowLeft,
  FaEdit,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

import { getCustomerById } from "../../api/customerApi";

import { errorToast } from "../../utils/toast";

import "./CustomerDetails.css";

function CustomerDetails() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [prescriptionCount, setPrescriptionCount] = useState(0);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH CUSTOMER
  // =====================================================

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);

        const response = await getCustomerById(id);

        console.log("Customer Details Response:", response.data);

        if (response.data?.success) {
          setCustomer(response.data.data);
        } else {
          errorToast(response.data?.message || "Unable to load customer.");
        }
      } catch (error) {
        console.error("Error fetching customer:", error);

        errorToast(
          error.response?.data?.message || "Unable to load customer details.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
      fetchPrescriptionCount();
      fetchCustomerPrescriptions();
    }
  }, [id]);
  const fetchCustomerPrescriptions = async () => {
    try {
      const response = await getPrescriptionsByCustomer(id);

      setPrescriptions(response.data.data || []);
    } catch (error) {
      console.error("Failed to load customer prescriptions:", error);

      setPrescriptions([]);
    }
  };

  const fetchPrescriptionCount = async () => {
    try {
      const response = await getPrescriptionCountByCustomer(id);

      setPrescriptionCount(response.data.data);
    } catch (error) {
      console.error("Failed to load prescription count:", error);

      setPrescriptionCount(0);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="customer-details-loading">
        <div className="loading-spinner"></div>

        <p>Loading customer details...</p>
      </div>
    );
  }

  // =====================================================
  // CUSTOMER NOT FOUND
  // =====================================================

  if (!customer) {
    return (
      <div className="customer-not-found">
        <div className="not-found-icon">
          <FaUser />
        </div>

        <h2>Customer Not Found</h2>

        <p>
          The customer you are looking for does not exist or could not be
          loaded.
        </p>

        <Link to="/customers" className="back-btn">
          <FaArrowLeft />
          Back To Customers
        </Link>
      </div>
    );
  }

  // =====================================================
  // INITIALS
  // =====================================================

  const getInitials = (name) => {
    if (!name) {
      return "CU";
    }

    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // FORMAT DATETIME
  // =====================================================

  const formatDateTime = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="customer-details-page">
      {/* =================================================
                HEADER
            ================================================= */}

      <div className="details-page-header">
        <div>
          <h2>Customer Details</h2>

          <p>View customer profile and account information</p>
        </div>

        <div className="details-header-actions">
          <Link to="/customers" className="back-btn">
            <FaArrowLeft />
            Back
          </Link>

          <Link
            to={`/customers/edit/${customer.customerId}`}
            className="edit-customer-btn"
          >
            <FaEdit />
            Edit Customer
          </Link>
        </div>
      </div>

      {/* =================================================
                PROFILE
            ================================================= */}

      <div className="customer-profile-card">
        <div className="profile-avatar">
          {getInitials(customer.customerName)}
        </div>

        <div className="profile-content">
          <div className="profile-title-row">
            <div>
              <h2>{customer.customerName || "-"}</h2>

              <p className="customer-code">
                Customer Code:
                <strong>{customer.customerCode || "-"}</strong>
              </p>
            </div>

            <span
              className={
                customer.status
                  ? "profile-status active"
                  : "profile-status inactive"
              }
            >
              <span className="status-dot"></span>

              {customer.status ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="profile-meta">
            <span>
              <FaPhone />

              {customer.mobileNumber || "-"}
            </span>

            <span>
              <FaEnvelope />

              {customer.email || "-"}
            </span>

            <span>
              <FaMapMarkerAlt />

              {customer.city || "-"}
            </span>
          </div>
        </div>
      </div>

      {/* =================================================
                STATISTICS
            ================================================= */}

      <div className="customer-stats-grid">
        <div className="customer-stat-card">
          <div className="stat-icon blue">
            <FaEye />
          </div>

          <div>
            <h3>{prescriptionCount}</h3>

            <p>Prescriptions</p>
          </div>
        </div>

        <div className="customer-stat-card">
          <div className="stat-icon purple">
            <FaFileInvoice />
          </div>

          <div>
            <h3>0</h3>

            <p>Total Bills</p>
          </div>
        </div>

        <div className="customer-stat-card">
          <div className="stat-icon green">
            <FaRupeeSign />
          </div>

          <div>
            <h3>₹0</h3>

            <p>Total Spend</p>
          </div>
        </div>
      </div>

      {/* =================================================
                CUSTOMER INFORMATION
            ================================================= */}

      <div className="customer-details-card">
        <div className="details-card-header">
          <div>
            <h3>Customer Information</h3>

            <p>Personal and contact information</p>
          </div>
        </div>

        <div className="customer-info-grid">
          <div className="info-item">
            <label>Customer Name</label>

            <span>{customer.customerName || "-"}</span>
          </div>

          <div className="info-item">
            <label>Customer Code</label>

            <span>{customer.customerCode || "-"}</span>
          </div>

          <div className="info-item">
            <label>Mobile Number</label>

            <span>{customer.mobileNumber || "-"}</span>
          </div>

          <div className="info-item">
            <label>Alternate Phone</label>

            <span>{customer.alternatePhone || "-"}</span>
          </div>

          <div className="info-item">
            <label>Email</label>

            <span>{customer.email || "-"}</span>
          </div>

          <div className="info-item">
            <label>Gender</label>

            <span>{customer.gender || "-"}</span>
          </div>

          <div className="info-item">
            <label>Date Of Birth</label>

            <span>{formatDate(customer.dateOfBirth)}</span>
          </div>

          <div className="info-item">
            <label>Age</label>

            <span>{customer.age ? `${customer.age} years` : "-"}</span>
          </div>

          <div className="info-item">
            <label>City</label>

            <span>{customer.city || "-"}</span>
          </div>

          <div className="info-item full-width">
            <label>Address</label>

            <span>{customer.address || "-"}</span>
          </div>

          <div className="info-item">
            <label>Reference By</label>

            <span>{customer.referenceBy || "-"}</span>
          </div>

          <div className="info-item">
            <label>Status</label>

            <span
              className={
                customer.status ? "info-status active" : "info-status inactive"
              }
            >
              {customer.status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {/* =================================================
                AUDIT INFORMATION
            ================================================= */}

      <div className="customer-details-card">
        <div className="details-card-header">
          <div>
            <h3>Account Information</h3>

            <p>Customer record timestamps</p>
          </div>
        </div>

        <div className="audit-grid">
          <div className="audit-item">
            <FaCalendarAlt />

            <div>
              <label>Created At</label>

              <span>{formatDateTime(customer.createdAt)}</span>
            </div>
          </div>

          <div className="audit-item">
            <FaCalendarAlt />

            <div>
              <label>Last Updated</label>

              <span>{formatDateTime(customer.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
                RECENT PRESCRIPTIONS
            ================================================= */}

      <div className="customer-details-card">
        <div className="details-card-header">
          <div>
            <h3>Recent Prescriptions</h3>

            <p>Prescription history for this customer</p>
          </div>

          <Link to="/prescriptions" className="card-link">
            View All
          </Link>
        </div>

        {prescriptions.length === 0 ? (
          <div className="empty-section">
            <FaEye />

            <h4>No prescriptions available</h4>

            <p>Prescription records for this customer will appear here.</p>
          </div>
        ) : (
          <div className="recent-prescriptions-list">
            {prescriptions.slice(0, 5).map((prescription) => (
              <div
                className="recent-prescription-item"
                key={prescription.prescriptionId}
              >
                <div className="prescription-icon">
                  <FaEye />
                </div>

                <div className="prescription-info">
                  <strong>
                    PRE
                    {String(prescription.prescriptionId).padStart(4, "0")}
                  </strong>

                  <span>{prescription.prescriptionDate}</span>

                  <small>
                    Dr. {prescription.doctorName || "Not specified"}
                  </small>
                </div>

                <Link
                  to={`/prescriptions/${prescription.prescriptionId}`}
                  className="prescription-view-btn"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =================================================
                RECENT BILLS
            ================================================= */}

      <div className="customer-details-card">
        <div className="details-card-header">
          <div>
            <h3>Recent Bills</h3>

            <p>Billing history for this customer</p>
          </div>

          <Link to="/receipts" className="card-link">
            View All
          </Link>
        </div>

        <div className="empty-section">
          <FaFileInvoice />

          <h4>No bills available</h4>

          <p>Billing records for this customer will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
