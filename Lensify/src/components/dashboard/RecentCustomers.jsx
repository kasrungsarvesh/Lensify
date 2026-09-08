import { useEffect, useState } from "react";
import { FaUser, FaSpinner, FaUsers } from "react-icons/fa";

import "./dashboard.css";
import api from "../../api/axios";

function RecentCustomers() {
  // ============================================================
  // STATE
  // ============================================================

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH RECENT CUSTOMERS
  // ============================================================

  useEffect(() => {
    fetchRecentCustomers();
  }, []);

  const fetchRecentCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/customer");

      console.log("Customer API Response:", response.data);

      const customerData = response.data?.data || [];

      // --------------------------------------------------------
      // Sort by newest customer first
      // --------------------------------------------------------

      const recentCustomers = [...customerData]
        .sort((a, b) => {
          const dateA = new Date(a.createdAt || a.createdDate || 0);

          const dateB = new Date(b.createdAt || b.createdDate || 0);

          return dateB - dateA;
        })
        .slice(0, 5);

      setCustomers(recentCustomers);
    } catch (err) {
      console.error("Recent Customers Error:", err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else if (err.response?.status === 403) {
        setError("You are not authorized to view customers.");
      } else {
        setError("Unable to load recent customers.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="info-card">
        <div className="card-header">
          <h3>
            <FaUser />
            Recent Customers
          </h3>
        </div>

        <div className="card-body low-stock-loading">
          <FaSpinner className="loading-spinner" />

          <span>Loading customers...</span>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="info-card">
        <div className="card-header">
          <h3>
            <FaUser />
            Recent Customers
          </h3>
        </div>

        <div className="card-body">
          <div className="low-stock-error">{error}</div>
        </div>
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="info-card">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="card-header">
        <h3>
          <FaUser />
          Recent Customers
        </h3>

        {customers.length > 0 && (
          <span className="low-stock-count">{customers.length}</span>
        )}
      </div>

      {/* ========================================================
          BODY
      ======================================================== */}

      <div className="card-body">
        {customers.length === 0 ? (
          <div className="no-low-stock">
            <FaUsers />

            <p>No customers found.</p>
          </div>
        ) : (
          customers.map((customer) => (
            <div className="list-item" key={customer.customerId}>
              <div>
                <h4>
                  {customer.customerName || customer.name || "Unnamed Customer"}
                </h4>

                <p>
                  {customer.phoneNumber || customer.mobile || "No mobile"}

                  {" • "}

                  {customer.city || customer.address?.city || "No city"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentCustomers;
