import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave, FaEdit, FaArrowLeft, FaEye, FaSpinner } from "react-icons/fa";

import {
  getPrescriptionById,
  updatePrescription,
} from "../../api/prescriptionApi";

import "./EditPrescription.css";

function EditPrescription() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    customerId: "",
    customerCode: "",
    customerName: "",

    doctorName: "",
    prescriptionDate: "",

    rightEyeSph: "",
    rightEyeCyl: "",
    rightEyeAxis: "",
    rightEyeVa: "",

    leftEyeSph: "",
    leftEyeCyl: "",
    leftEyeAxis: "",
    leftEyeVa: "",

    pdDistance: "",
    pdNear: "",

    lensType: "",
    lensIndex: "",
    coating: "",

    remarks: "",
  });

  // =====================================================
  // LOAD PRESCRIPTION
  // =====================================================

  useEffect(() => {
    const loadPrescription = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPrescriptionById(id);

        const prescription = response.data.data;

        if (!prescription) {
          throw new Error("Prescription not found.");
        }

        setFormData({
          customerId: prescription.customerId ?? "",
          customerCode: prescription.customerCode ?? "",
          customerName: prescription.customerName ?? "",

          doctorName: prescription.doctorName ?? "",
          prescriptionDate: prescription.prescriptionDate ?? "",

          rightEyeSph: prescription.rightEyeSph ?? "",
          rightEyeCyl: prescription.rightEyeCyl ?? "",
          rightEyeAxis: prescription.rightEyeAxis ?? "",
          rightEyeVa: prescription.rightEyeVa ?? "",

          leftEyeSph: prescription.leftEyeSph ?? "",
          leftEyeCyl: prescription.leftEyeCyl ?? "",
          leftEyeAxis: prescription.leftEyeAxis ?? "",
          leftEyeVa: prescription.leftEyeVa ?? "",

          pdDistance: prescription.pdDistance ?? "",
          pdNear: prescription.pdNear ?? "",

          lensType: prescription.lensType ?? "",
          lensIndex: prescription.lensIndex ?? "",
          coating: prescription.coating ?? "",

          remarks: prescription.remarks ?? "",
        });
      } catch (err) {
        console.error("Error loading prescription:", err);

        setError(
          err.response?.data?.message || "Unable to load prescription details.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPrescription();
    }
  }, [id]);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // UPDATE PRESCRIPTION
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerId) {
      alert("Customer is required.");
      return;
    }

    if (!formData.prescriptionDate) {
      alert("Prescription date is required.");
      return;
    }

    if (formData.rightEyeSph === "" || formData.leftEyeSph === "") {
      alert("Right and left eye SPH are required.");
      return;
    }

    try {
      setSaving(true);

      const requestData = {
        customerId: Number(formData.customerId),

        prescriptionDate: formData.prescriptionDate,

        doctorName: formData.doctorName || null,

        rightEyeSph:
          formData.rightEyeSph === "" ? null : Number(formData.rightEyeSph),

        rightEyeCyl:
          formData.rightEyeCyl === "" ? null : Number(formData.rightEyeCyl),

        rightEyeAxis:
          formData.rightEyeAxis === "" ? null : Number(formData.rightEyeAxis),

        rightEyeVa: formData.rightEyeVa || null,

        leftEyeSph:
          formData.leftEyeSph === "" ? null : Number(formData.leftEyeSph),

        leftEyeCyl:
          formData.leftEyeCyl === "" ? null : Number(formData.leftEyeCyl),

        leftEyeAxis:
          formData.leftEyeAxis === "" ? null : Number(formData.leftEyeAxis),

        leftEyeVa: formData.leftEyeVa || null,

        pdDistance:
          formData.pdDistance === "" ? null : Number(formData.pdDistance),

        pdNear: formData.pdNear === "" ? null : Number(formData.pdNear),

        lensType: formData.lensType || null,

        lensIndex: formData.lensIndex || null,

        coating: formData.coating || null,

        remarks: formData.remarks || null,
      };

      console.log("Update Prescription Request:", requestData);

      const response = await updatePrescription(id, requestData);

      console.log("Update Prescription Response:", response.data);

      alert("Prescription Updated Successfully.");

      navigate(`/prescriptions/${id}`);
    } catch (err) {
      console.error("Error updating prescription:", err);

      alert(err.response?.data?.message || "Unable to update prescription.");
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="edit-prescription-loading">
        <FaSpinner className="loading-spinner" />

        <h3>Loading Prescription...</h3>

        <p>Please wait while prescription details are loaded.</p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="edit-prescription-error">
        <div className="error-card">
          <FaEye className="error-icon" />

          <h2>Unable to Load Prescription</h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={() => navigate("/prescriptions")}
            className="back-prescriptions-btn"
          >
            <FaArrowLeft />
            Back to Prescriptions
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="edit-prescription-page">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="page-header">
        <div>
          <div className="page-title-row">
            <div className="header-icon">
              <FaEdit />
            </div>

            <div>
              <h2>Edit Prescription</h2>

              <p>Update customer eye power and prescription details</p>
            </div>
          </div>

          <div className="prescription-id">
            Prescription ID: <strong>PRE{String(id).padStart(4, "0")}</strong>
          </div>
        </div>

        <button
          type="button"
          className="back-header-btn"
          onClick={() => navigate(`/prescriptions/${id}`)}
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <form onSubmit={handleSubmit}>
        {/* =================================================
            CUSTOMER INFORMATION
        ================================================= */}

        <div className="card">
          <h3>Customer Information</h3>

          <div className="grid-3">
            {/* Customer */}

            <div className="form-group">
              <label>Customer</label>

              <div className="selected-customer">
                <div className="customer-avatar">
                  {formData.customerName
                    ? formData.customerName.charAt(0).toUpperCase()
                    : "C"}
                </div>

                <div className="customer-info">
                  <strong>{formData.customerName || "Customer"}</strong>

                  <span>Customer ID: {formData.customerId}</span>
                  <h5>
                    <small>Customer Code: {formData.customerCode}</small>
                  </h5>
                </div>
              </div>
            </div>

            {/* Doctor */}

            <div className="form-group">
              <label htmlFor="doctorName">Doctor Name</label>

              <input
                id="doctorName"
                type="text"
                name="doctorName"
                placeholder="Enter doctor name"
                value={formData.doctorName}
                onChange={handleChange}
              />
            </div>

            {/* Date */}

            <div className="form-group">
              <label htmlFor="prescriptionDate">
                Prescription Date
                <span className="required">*</span>
              </label>

              <input
                id="prescriptionDate"
                type="date"
                name="prescriptionDate"
                value={formData.prescriptionDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* =================================================
            EYE POWER
        ================================================= */}

        <div className="card">
          <h3>Eye Power Details</h3>

          <div className="table-wrapper">
            <table className="power-table">
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
                  <td className="eye-name">Right Eye</td>

                  <td>
                    <input
                      type="number"
                      step="0.01"
                      name="rightEyeSph"
                      placeholder="SPH"
                      value={formData.rightEyeSph}
                      onChange={handleChange}
                      required
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      step="0.01"
                      name="rightEyeCyl"
                      placeholder="CYL"
                      value={formData.rightEyeCyl}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      name="rightEyeAxis"
                      placeholder="AXIS"
                      value={formData.rightEyeAxis}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      name="rightEyeVa"
                      placeholder="VA"
                      value={formData.rightEyeVa}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                {/* LEFT EYE */}

                <tr>
                  <td className="eye-name">Left Eye</td>

                  <td>
                    <input
                      type="number"
                      step="0.01"
                      name="leftEyeSph"
                      placeholder="SPH"
                      value={formData.leftEyeSph}
                      onChange={handleChange}
                      required
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      step="0.01"
                      name="leftEyeCyl"
                      placeholder="CYL"
                      value={formData.leftEyeCyl}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      name="leftEyeAxis"
                      placeholder="AXIS"
                      value={formData.leftEyeAxis}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      name="leftEyeVa"
                      placeholder="VA"
                      value={formData.leftEyeVa}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* =================================================
            LENS INFORMATION
        ================================================= */}

        <div className="card">
          <h3>Lens Information</h3>

          <div className="grid-2">
            {/* PD Distance */}

            <div className="form-group">
              <label htmlFor="pdDistance">PD Distance</label>

              <input
                id="pdDistance"
                type="number"
                step="0.01"
                name="pdDistance"
                placeholder="Enter PD distance"
                value={formData.pdDistance}
                onChange={handleChange}
              />
            </div>

            {/* PD Near */}

            <div className="form-group">
              <label htmlFor="pdNear">PD Near</label>

              <input
                id="pdNear"
                type="number"
                step="0.01"
                name="pdNear"
                placeholder="Enter PD near"
                value={formData.pdNear}
                onChange={handleChange}
              />
            </div>

            {/* Lens Type */}

            <div className="form-group">
              <label htmlFor="lensType">Lens Type</label>

              <select
                id="lensType"
                name="lensType"
                value={formData.lensType}
                onChange={handleChange}
              >
                <option value="">Select Lens Type</option>

                <option value="Single Vision">Single Vision</option>

                <option value="Progressive">Progressive</option>

                <option value="Bifocal">Bifocal</option>

                <option value="Blue Cut">Blue Cut</option>
              </select>
            </div>

            {/* Lens Index */}

            <div className="form-group">
              <label htmlFor="lensIndex">Lens Index</label>

              <select
                id="lensIndex"
                name="lensIndex"
                value={formData.lensIndex}
                onChange={handleChange}
              >
                <option value="">Select Lens Index</option>

                <option value="1.50">1.50</option>

                <option value="1.56">1.56</option>

                <option value="1.60">1.60</option>

                <option value="1.67">1.67</option>
              </select>
            </div>

            {/* Coating */}

            <div className="form-group">
              <label htmlFor="coating">Coating</label>

              <select
                id="coating"
                name="coating"
                value={formData.coating}
                onChange={handleChange}
              >
                <option value="">Select Coating</option>

                <option value="Blue Cut">Blue Cut</option>

                <option value="Anti Glare">Anti Glare</option>

                <option value="Hard Coat">Hard Coat</option>

                <option value="UV Protection">UV Protection</option>
              </select>
            </div>
          </div>
        </div>

        {/* =================================================
            REMARKS
        ================================================= */}

        <div className="card">
          <h3>Remarks</h3>

          <div className="form-group">
            <textarea
              rows="5"
              name="remarks"
              placeholder="Enter any additional remarks..."
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(`/prescriptions/${id}`)}
            disabled={saving}
          >
            <FaArrowLeft />
            Cancel
          </button>

          <button type="submit" className="update-btn" disabled={saving}>
            {saving ? (
              <>
                <FaSpinner className="button-spinner" />
                Updating...
              </>
            ) : (
              <>
                <FaSave />
                Update Prescription
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPrescription;
