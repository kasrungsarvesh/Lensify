import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEye,
  FaEdit,
  FaFileMedical,
  FaSearch,
  FaTrash,
  FaSyncAlt,
  FaCalendarDay,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  getAllPrescriptions,
  deletePrescription,
} from "../../api/prescriptionApi";

import "./PrescriptionList.css";

function PrescriptionList() {
  // =====================================================
  // STATES
  // =====================================================

  const [prescriptions, setPrescriptions] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  const [hasNextPage, setHasNextPage] = useState(false);

  const pageSize = 10;

  // =====================================================
  // FETCH PRESCRIPTIONS
  // =====================================================

  const fetchPrescriptions = async (
    page = currentPage,
    searchValue = search,
  ) => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllPrescriptions({
        page,
        size: pageSize,
        sort: "prescriptionId,desc",
        search: searchValue,
      });

      console.log("Prescription API Response:", response.data);

      const data = response.data?.data || [];

      setPrescriptions(Array.isArray(data) ? data : []);

      /*
       * Your current backend returns only List<PrescriptionResponseDto>,
       * so there is no totalPages value available.
       *
       * If exactly pageSize records are returned, we assume
       * another page may exist.
       */
      setHasNextPage(data.length === pageSize);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);

      setError(err.response?.data?.message || "Unable to load prescriptions.");

      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchPrescriptions(0, "");
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(0);

      fetchPrescriptions(0, search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prescription?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deletePrescription(id);

      alert("Prescription deleted successfully.");

      fetchPrescriptions(currentPage, search);
    } catch (err) {
      console.error("Delete prescription error:", err);

      alert(err.response?.data?.message || "Unable to delete prescription.");
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // PAGINATION
  // =====================================================

  const handlePrevious = () => {
    if (currentPage === 0) {
      return;
    }

    const newPage = currentPage - 1;

    setCurrentPage(newPage);

    fetchPrescriptions(newPage, search);
  };

  const handleNext = () => {
    if (!hasNextPage) {
      return;
    }

    const newPage = currentPage + 1;

    setCurrentPage(newPage);

    fetchPrescriptions(newPage, search);
  };

  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = () => {
    fetchPrescriptions(currentPage, search);
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
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
  // TODAY COUNT
  // =====================================================

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();

  const todayCount = prescriptions.filter(
    (prescription) => prescription.prescriptionDate === today,
  ).length;

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="prescription-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="prescription-header">
        <div className="prescription-title">
          <div className="title-icon">
            <FaFileMedical />
          </div>

          <div>
            <h2>Prescriptions</h2>

            <p>Manage customer eye prescriptions and lens details</p>
          </div>
        </div>

        <Link to="/prescriptions/add" className="add-prescription-btn">
          <FaPlus />
          <span>Add Prescription</span>
        </Link>
      </div>

      {/* =================================================
          SEARCH + REFRESH
      ================================================= */}

      <div className="search-card">
        <div className="search-wrapper">
          <FaSearch />

          <input
            type="text"
            placeholder="Search by customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <button
          type="button"
          className="refresh-btn"
          onClick={handleRefresh}
          disabled={loading}
          title="Refresh prescriptions"
        >
          <FaSyncAlt className={loading ? "refresh-spin" : ""} />
        </button>
      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="prescription-stats">
        <div className="stat-box">
          <div className="stat-icon blue">
            <FaClipboardList />
          </div>

          <div>
            <span className="stat-label">Prescriptions</span>

            <h3>{prescriptions.length}</h3>

            <small>Current page</small>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon green">
            <FaCalendarDay />
          </div>

          <div>
            <span className="stat-label">Today's Prescriptions</span>

            <h3>{todayCount}</h3>

            <small>Created today</small>
          </div>
        </div>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="prescription-error">
          <div>
            <strong>Unable to load prescriptions</strong>

            <p>{error}</p>
          </div>

          <button type="button" onClick={handleRefresh}>
            Try Again
          </button>
        </div>
      )}

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="table-card">
        <div className="table-header">
          <div>
            <h3>Prescription Records</h3>

            <p>View and manage prescription history</p>
          </div>

          <span className="record-count">{prescriptions.length} Records</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>

                <th>Customer</th>

                <th>Doctor</th>

                <th>Eye Power</th>

                <th>Lens Type</th>

                <th>Date</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* LOADING */}

              {loading ? (
                <tr>
                  <td colSpan="8" className="table-loading">
                    <div className="loading-spinner"></div>

                    <span>Loading prescriptions...</span>
                  </td>
                </tr>
              ) : prescriptions.length === 0 ? (
                /* EMPTY */

                <tr>
                  <td colSpan="8" className="empty-state">
                    <div className="empty-icon">
                      <FaFileMedical />
                    </div>

                    <h3>No prescriptions found</h3>

                    <p>
                      {search
                        ? "Try searching with another customer name."
                        : "No prescriptions have been added yet."}
                    </p>

                    {!search && (
                      <Link to="/prescriptions/add" className="empty-add-btn">
                        <FaPlus />
                        Add First Prescription
                      </Link>
                    )}
                  </td>
                </tr>
              ) : (
                prescriptions.map((prescription) => (
                  <tr key={prescription.prescriptionId}>
                    {/* ID */}

                    <td>
                      <span className="prescription-id">
                        PRE
                        {String(prescription.prescriptionId).padStart(4, "0")}
                      </span>
                    </td>

                    {/* CUSTOMER */}

                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">
                          {prescription.customerName
                            ?.charAt(0)
                            ?.toUpperCase() || "C"}
                        </div>

                        <div>
                          <strong>
                            {prescription.customerName || "Unknown Customer"}
                          </strong>

                          {/* <small>ID: {prescription.customerId}</small> */}

                          <small>
                            Customer Code: {prescription.customerCode}
                          </small>
                        </div>
                      </div>
                    </td>

                    {/* DOCTOR */}

                    <td>
                      <span className="doctor-name">
                        {prescription.doctorName || "—"}
                      </span>
                    </td>

                    {/* EYE POWER */}

                    <td>
                      <div className="eye-power">
                        <span>R: {prescription.rightEyeSph ?? "—"}</span>

                        <span>L: {prescription.leftEyeSph ?? "—"}</span>
                      </div>
                    </td>

                    {/* LENS */}

                    <td>
                      {prescription.lensType ? (
                        <span className="lens-badge">
                          {prescription.lensType}
                        </span>
                      ) : (
                        <span className="not-available">—</span>
                      )}
                    </td>

                    {/* DATE */}

                    <td>
                      <span className="date-cell">
                        {formatDate(prescription.prescriptionDate)}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td>
                      <span className="status-badge">Active</span>
                    </td>

                    {/* ACTIONS */}

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/prescriptions/${prescription.prescriptionId}`}
                          className="action-btn view-btn"
                          title="View prescription"
                        >
                          <FaEye />
                        </Link>

                        <Link
                          to={`/prescriptions/edit/${prescription.prescriptionId}`}
                          className="action-btn edit-btn"
                          title="Edit prescription"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          type="button"
                          className="action-btn delete-btn"
                          title="Delete prescription"
                          disabled={deletingId === prescription.prescriptionId}
                          onClick={() =>
                            handleDelete(prescription.prescriptionId)
                          }
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

        {/* =================================================
            PAGINATION
        ================================================= */}

        {!loading && prescriptions.length > 0 && (
          <div className="pagination">
            <span>Page {currentPage + 1}</span>

            <div>
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentPage === 0}
              >
                Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!hasNextPage}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrescriptionList;
