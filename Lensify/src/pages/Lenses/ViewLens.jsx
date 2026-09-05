import { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaGlasses, FaBoxOpen } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";
import "./LensForm.css";

function ViewLens() {
  const { id } = useParams();

  const [lens, setLens] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // FETCH LENS
  // =========================================================

  const fetchLens = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/lenses/${id}`);

      if (!response.data?.data) {
        throw new Error("Lens not found.");
      }

      setLens(response.data.data);
    } catch (error) {
      console.error("Error fetching lens:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to load lens.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLens();
  }, [id]);

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="view-lens-page">
        <div className="view-lens-loading">Loading lens...</div>
      </div>
    );
  }

  if (!lens) {
    return (
      <div className="view-lens-page">
        <div className="view-lens-empty">
          <FaGlasses />
          <h2>Lens not found</h2>

          <Link to="/lenses" className="back-lenses-btn">
            <FaArrowLeft />
            Back to Lenses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="view-lens-page">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="view-lens-header">
        <div>
          <Link to="/lenses" className="back-lens-btn">
            <FaArrowLeft />
            Back to Lenses
          </Link>

          <h1>Lens Details</h1>

          <p>View complete information about this lens</p>
        </div>

        <Link to={`/lenses/edit/${lens.lensId}`} className="edit-lens-page-btn">
          <FaEdit />
          Edit Lens
        </Link>
      </div>

      {/* =====================================================
          MAIN CARD
          ===================================================== */}

      <div className="view-lens-card">
        {/* Lens Header */}

        <div className="view-lens-profile">
          <div className="view-lens-icon">
            <FaGlasses />
          </div>

          <div className="view-lens-title">
            <h2>{lens.brand || "-"}</h2>

            <span>Lens ID: {lens.lensId}</span>
          </div>

          <span
            className={
              lens.status
                ? "lens-detail-status active"
                : "lens-detail-status inactive"
            }
          >
            {lens.status ? "Active" : "Inactive"}
          </span>
        </div>

        {/* ===================================================
            DETAILS
            =================================================== */}

        <div className="lens-details-grid">
          <div className="lens-detail-item">
            <span>Brand</span>
            <strong>{lens.brand || "-"}</strong>
          </div>

          <div className="lens-detail-item">
            <span>Lens Type</span>
            <strong>{lens.lensType || "-"}</strong>
          </div>

          <div className="lens-detail-item">
            <span>Lens Material</span>
            <strong>{lens.lensMaterial || "-"}</strong>
          </div>

          <div className="lens-detail-item">
            <span>Power</span>
            <strong>{lens.power ?? "-"}</strong>
          </div>

          <div className="lens-detail-item">
            <span>Price</span>
            <strong className="detail-price">
              {formatCurrency(lens.price)}
            </strong>
          </div>

          <div className="lens-detail-item">
            <span>Available Stock</span>
            <strong>{lens.stock ?? 0}</strong>
          </div>

          <div className="lens-detail-item">
            <span>Status</span>

            <strong>{lens.status ? "Active" : "Inactive"}</strong>
          </div>

          <div className="lens-detail-item">
            <span>Inventory Value</span>

            <strong className="detail-price">
              {formatCurrency(
                Number(lens.price || 0) * Number(lens.stock || 0),
              )}
            </strong>
          </div>
        </div>

        {/* ===================================================
            SYSTEM INFORMATION
            =================================================== */}

        <div className="lens-system-section">
          <div className="lens-system-header">
            <FaBoxOpen />

            <div>
              <h3>System Information</h3>
              <p>Lens record information</p>
            </div>
          </div>

          <div className="lens-system-grid">
            <div>
              <span>Lens ID</span>
              <strong>{lens.lensId}</strong>
            </div>

            <div>
              <span>Created At</span>
              <strong>{formatDate(lens.createdAt)}</strong>
            </div>

            <div>
              <span>Updated At</span>
              <strong>{formatDate(lens.updatedAt)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewLens;
