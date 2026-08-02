import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEye,
  FaFileInvoice,
  FaRupeeSign,
  FaArrowLeft,
  FaEdit,
} from "react-icons/fa";

import { getCustomerById } from "../../api/customerApi";

import "./CustomerDetails.css";

function CustomerDetails() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await getCustomerById(id);
      setCustomer(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Customer...</h2>;
  }

  if (!customer) {
    return <h2>Customer Not Found</h2>;
  }

  return (
    <div className="customer-details">
      {/* Header Buttons */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Link to="/customers" className="add-btn">
          <FaArrowLeft /> Back
        </Link>

        <Link to={`/customers/edit/${customer.customerId}`} className="add-btn">
          <FaEdit /> Edit Customer
        </Link>
      </div>

      {/* Profile Header */}

      <div className="profile-card">
        <div className="profile-avatar">
          {customer.customerName?.substring(0, 2).toUpperCase()}
        </div>

        <div className="profile-info">
          <h2>{customer.customerName}</h2>

          <p>Customer Code : {customer.customerCode}</p>

          <div className="profile-meta">
            <span>
              <FaPhone />
              {customer.mobileNumber}
            </span>

            <span>
              <FaEnvelope />
              {customer.email}
            </span>

            <span>
              <FaMapMarkerAlt />
              {customer.city}
            </span>
          </div>

          <br />

          <div className="profile-meta">
            <span>Gender : {customer.gender}</span>

            <span>Age : {customer.age}</span>

            <span>DOB : {customer.dateOfBirth}</span>
          </div>
        </div>
      </div>

      {/* Statistics (Dummy until dashboard APIs are connected) */}

      <div className="stats-grid">
        <div className="stat-card">
          <FaEye className="stat-icon" />
          <h3>0</h3>
          <p>Prescriptions</p>
        </div>

        <div className="stat-card">
          <FaFileInvoice className="stat-icon" />
          <h3>0</h3>
          <p>Total Bills</p>
        </div>

        <div className="stat-card">
          <FaRupeeSign className="stat-icon" />
          <h3>₹0</h3>
          <p>Total Spend</p>
        </div>
      </div>

      {/* Customer Information */}

      <div className="details-card">
        <div className="card-header">
          <h3>Customer Information</h3>
        </div>

        <table>
          <tbody>
            <tr>
              <td>
                <b>Alternate Phone</b>
              </td>
              <td>{customer.alternatePhone}</td>
            </tr>

            <tr>
              <td>
                <b>Address</b>
              </td>
              <td>{customer.address}</td>
            </tr>

            <tr>
              <td>
                <b>Reference By</b>
              </td>
              <td>{customer.referenceBy}</td>
            </tr>

            <tr>
              <td>
                <b>Status</b>
              </td>
              <td>{customer.status ? "Active" : "Inactive"}</td>
            </tr>

            <tr>
              <td>
                <b>Created At</b>
              </td>
              <td>{customer.createdAt}</td>
            </tr>

            <tr>
              <td>
                <b>Updated At</b>
              </td>
              <td>{customer.updatedAt}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recent Prescriptions */}

      <div className="details-card">
        <div className="card-header">
          <h3>Recent Prescriptions</h3>
        </div>

        <p>No prescriptions available.</p>
      </div>

      {/* Recent Bills */}

      <div className="details-card">
        <div className="card-header">
          <h3>Recent Bills</h3>
        </div>

        <p>No bills available.</p>
      </div>
    </div>
  );
}

export default CustomerDetails;
