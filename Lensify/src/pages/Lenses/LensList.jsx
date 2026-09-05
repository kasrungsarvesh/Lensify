import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBoxOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./LensList.css";

function LensList() {
  const [lenses, setLenses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================================================
  // FETCH LENSES
  // =========================================================

  const fetchLenses = async () => {
    try {
      setLoading(true);

      const response = await api.get("/lenses", {
        params: {
          page: 0,
          size: 100,
          sort: "lensId,desc",
          search: search.trim() || undefined,
        },
      });

      setLenses(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching lenses:", error);
      setLenses([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLenses();
  }, []);

  // Search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLenses();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================================================
  // DELETE LENS
  // =========================================================

  const handleDelete = async (lensId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lens?",
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/lenses/${lensId}`);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to delete lens.");
      }

      alert("Lens deleted successfully.");

      fetchLenses();
    } catch (error) {
      console.error("Delete Lens Error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete lens.",
      );
    }
  };

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
  // STATUS
  // =========================================================

  const getStatusClass = (status) => {
    return status ? "lens-status active" : "lens-status inactive";
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="lens-list-page">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="lens-page-header">
        <div>
          <h1>Lenses</h1>
          <p>Manage optical lenses and inventory</p>
        </div>

        <Link to="/lenses/add" className="create-lens-btn">
          <FaPlus />
          Add Lens
        </Link>
      </div>

      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <div className="lens-summary">
        <div className="lens-summary-card">
          <div className="lens-summary-icon">
            <FaBoxOpen />
          </div>

          <div>
            <span>Total Lenses</span>
            <strong>{lenses.length}</strong>
          </div>
        </div>

        <div className="lens-summary-card">
          <div className="lens-summary-icon">✓</div>

          <div>
            <span>Active Lenses</span>
            <strong>{lenses.filter((lens) => lens.status).length}</strong>
          </div>
        </div>

        <div className="lens-summary-card">
          <div className="lens-summary-icon">#</div>

          <div>
            <span>Total Stock</span>
            <strong>
              {lenses.reduce((sum, lens) => sum + Number(lens.stock || 0), 0)}
            </strong>
          </div>
        </div>

        <div className="lens-summary-card">
          <div className="lens-summary-icon">₹</div>

          <div>
            <span>Inventory Value</span>
            <strong>
              {formatCurrency(
                lenses.reduce(
                  (sum, lens) =>
                    sum + Number(lens.price || 0) * Number(lens.stock || 0),
                  0,
                ),
              )}
            </strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
          ===================================================== */}

      <div className="lens-card">
        <div className="lens-card-header">
          <div>
            <h2>Lens List</h2>
            <p>View and manage available lenses</p>
          </div>

          <div className="lens-search">
            <FaSearch />

            <input
              type="text"
              placeholder="Search by brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ===================================================
            TABLE
            =================================================== */}

        <div className="lens-table-wrapper">
          <table className="lens-table">
            <thead>
              <tr>
                <th>Lens</th>
                <th>Type</th>
                <th>Material</th>
                <th>Power</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="lens-table-message">
                    Loading lenses...
                  </td>
                </tr>
              ) : lenses.length === 0 ? (
                <tr>
                  <td colSpan="8" className="lens-table-message">
                    No lenses found
                  </td>
                </tr>
              ) : (
                lenses.map((lens) => (
                  <tr key={lens.lensId}>
                    {/* Lens */}

                    <td>
                      <div className="lens-name-cell">
                        <div className="lens-avatar">
                          <FaBoxOpen />
                        </div>

                        <div className="lens-info">
                          <strong>{lens.brand || "-"}</strong>

                          <span>Lens ID: {lens.lensId}</span>
                        </div>
                      </div>
                    </td>

                    {/* Type */}

                    <td>{lens.lensType || "-"}</td>

                    {/* Material */}

                    <td>{lens.lensMaterial || "-"}</td>

                    {/* Power */}

                    <td>
                      <span className="lens-power">{lens.power ?? "-"}</span>
                    </td>

                    {/* Price */}

                    <td>
                      <strong className="lens-price">
                        {formatCurrency(lens.price)}
                      </strong>
                    </td>

                    {/* Stock */}

                    <td>
                      <span
                        className={
                          Number(lens.stock || 0) <= 5
                            ? "stock-low"
                            : "stock-normal"
                        }
                      >
                        {lens.stock ?? 0}
                      </span>
                    </td>

                    {/* Status */}

                    <td>
                      <span className={getStatusClass(lens.status)}>
                        {lens.status ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}

                    <td>
                      <div className="lens-actions">
                        {/* View */}

                        <Link
                          to={`/lenses/${lens.lensId}`}
                          className="lens-action-btn lens-view-btn"
                          title="View Lens"
                        >
                          <FaEye />
                        </Link>

                        {/* Edit */}

                        <Link
                          to={`/lenses/edit/${lens.lensId}`}
                          className="lens-action-btn lens-edit-btn"
                          title="Edit Lens"
                        >
                          <FaEdit />
                        </Link>

                        {/* Delete */}

                        <button
                          type="button"
                          className="lens-action-btn lens-delete-btn"
                          title="Delete Lens"
                          onClick={() => handleDelete(lens.lensId)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LensList;
