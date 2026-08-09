import { useEffect, useState } from "react";
import { FaSave, FaEye, FaSearch, FaTimes } from "react-icons/fa";
import { searchCustomers } from "../../api/customerApi";
import api from "../../api/axios";
import "./AddPrescription.css";

function AddPrescription() {
  // =========================
  // CUSTOMER STATES
  // =========================

  const [customerSearch, setCustomerSearch] = useState("");
  const [customerResults, setCustomerResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchingCustomers, setSearchingCustomers] = useState(false);

  // =========================
  // FORM DATA
  // =========================

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    customerId: "",
    prescriptionDate: getTodayDate(),
    doctorName: "",

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

  const [saving, setSaving] = useState(false);

  // =========================
  // CUSTOMER SEARCH
  // =========================

  useEffect(() => {
    const searchCustomerData = async () => {
      if (!customerSearch.trim()) {
        setCustomerResults([]);
        return;
      }

      // Don't search again if customer already selected
      if (selectedCustomer) {
        return;
      }

      try {
        setSearchingCustomers(true);

        const response = await searchCustomers(customerSearch.trim());

        console.log("Customer Search Response:", response.data);

        setCustomerResults(response.data?.data || []);
      } catch (error) {
        console.error("Customer search error:", error);
        setCustomerResults([]);
      } finally {
        setSearchingCustomers(false);
      }
    };

    const timer = setTimeout(searchCustomerData, 350);

    return () => clearTimeout(timer);
  }, [customerSearch, selectedCustomer]);

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SELECT CUSTOMER
  // =========================

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);

    setFormData((previous) => ({
      ...previous,
      customerId: customer.customerId,
    }));

    setCustomerSearch("");
    setCustomerResults([]);
  };

  // =========================
  // REMOVE CUSTOMER
  // =========================

  const handleRemoveCustomer = () => {
    setSelectedCustomer(null);

    setFormData((previous) => ({
      ...previous,
      customerId: "",
    }));

    setCustomerSearch("");
  };

  // =========================
  // SUBMIT PRESCRIPTION
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCustomer) {
      alert("Please select a customer.");
      return;
    }

    if (!formData.prescriptionDate) {
      alert("Please select prescription date.");
      return;
    }

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

    try {
      setSaving(true);

      console.log("Prescription Request:", requestData);

      const response = await api.post("/prescriptions", requestData);

      console.log("Prescription Response:", response.data);

      alert("Prescription saved successfully.");

      // Reset form
      setSelectedCustomer(null);
      setCustomerSearch("");

      setFormData({
        customerId: "",
        prescriptionDate: "",
        doctorName: "",

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
    } catch (error) {
      console.error("Save prescription error:", error);

      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to save prescription.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="prescription-page">
      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <div className="page-header">
        <div>
          <h2>Add Prescription</h2>

          <p>Manage customer eye power and prescription details</p>
        </div>

        <div className="header-icon">
          <FaEye />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ========================================
            CUSTOMER INFORMATION
        ======================================== */}

        <div className="card">
          <h3>Customer Information</h3>

          <div className="customer-grid">
            {/* CUSTOMER SEARCH */}

            <div className="customer-search-wrapper">
              <label>
                Customer <span>*</span>
              </label>

              {!selectedCustomer ? (
                <>
                  <div className="customer-search-box">
                    <FaSearch />

                    <input
                      type="text"
                      placeholder="Search by name, code or mobile..."
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                    />

                    {searchingCustomers && (
                      <span className="search-loader">...</span>
                    )}
                  </div>

                  {/* SEARCH RESULTS */}

                  {customerSearch.trim() && !searchingCustomers && (
                    <div className="customer-results">
                      {customerResults.length > 0 ? (
                        customerResults.map((customer) => (
                          <button
                            type="button"
                            key={customer.customerId}
                            className="customer-result"
                            onClick={() => handleSelectCustomer(customer)}
                          >
                            <div className="customer-result-avatar">
                              {customer.customerName?.charAt(0)?.toUpperCase()}
                            </div>

                            <div className="customer-result-info">
                              <div className="customer-result-name">
                                {customer.customerName}
                              </div>

                              <div className="customer-result-meta">
                                <span>{customer.customerCode}</span>

                                <span>•</span>

                                <span>{customer.mobileNumber}</span>

                                {customer.city && (
                                  <>
                                    <span>•</span>

                                    <span>{customer.city}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="no-customer">No customer found</div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                /* ========================================
                   SELECTED CUSTOMER
                ======================================== */

                <div className="selected-customer">
                  <div className="selected-customer-main">
                    <div className="selected-customer-avatar">
                      {selectedCustomer.customerName?.charAt(0)?.toUpperCase()}
                    </div>

                    <div className="selected-customer-info">
                      <strong>{selectedCustomer.customerName}</strong>

                      <div className="selected-customer-details">
                        <span>{selectedCustomer.customerCode}</span>

                        <span>{selectedCustomer.mobileNumber}</span>

                        {selectedCustomer.city && (
                          <span>{selectedCustomer.city}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="remove-customer"
                    onClick={handleRemoveCustomer}
                    title="Remove customer"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            {/* DOCTOR */}

            <div className="form-group">
              <label>Doctor Name</label>

              <input
                type="text"
                name="doctorName"
                placeholder="Enter doctor name"
                value={formData.doctorName}
                onChange={handleChange}
              />
            </div>

            {/* DATE */}

            <div className="form-group">
              <label>
                Prescription Date <span>*</span>
              </label>

              <input
                type="date"
                name="prescriptionDate"
                value={formData.prescriptionDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ========================================
            EYE POWER
        ======================================== */}

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
                {/* RIGHT */}

                <tr>
                  <td>
                    <strong>Right Eye</strong>
                  </td>

                  <td>
                    <input
                      type="number"
                      step="0.01"
                      name="rightEyeSph"
                      placeholder="SPH"
                      value={formData.rightEyeSph}
                      onChange={handleChange}
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

                {/* LEFT */}

                <tr>
                  <td>
                    <strong>Left Eye</strong>
                  </td>

                  <td>
                    <input
                      type="number"
                      step="0.01"
                      name="leftEyeSph"
                      placeholder="SPH"
                      value={formData.leftEyeSph}
                      onChange={handleChange}
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

        {/* ========================================
            LENS INFORMATION
        ======================================== */}

        <div className="card">
          <h3>Lens Information</h3>

          <div className="grid-2">
            {/* PD DISTANCE */}

            <div className="form-group">
              <label>PD Distance</label>

              <input
                type="number"
                step="0.01"
                name="pdDistance"
                placeholder="Enter PD distance"
                value={formData.pdDistance}
                onChange={handleChange}
              />
            </div>

            {/* PD NEAR */}

            <div className="form-group">
              <label>PD Near</label>

              <input
                type="number"
                step="0.01"
                name="pdNear"
                placeholder="Enter PD near"
                value={formData.pdNear}
                onChange={handleChange}
              />
            </div>

            {/* LENS TYPE */}

            <div className="form-group">
              <label>Lens Type</label>

              <select
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

            {/* INDEX */}

            <div className="form-group">
              <label>Lens Index</label>

              <select
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

            {/* COATING */}

            <div className="form-group">
              <label>Coating</label>

              <select
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

        {/* ========================================
            REMARKS
        ======================================== */}

        <div className="card">
          <h3>Remarks</h3>

          <textarea
            rows="5"
            name="remarks"
            placeholder="Enter any additional prescription notes..."
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>

        {/* ========================================
            SAVE BUTTON
        ======================================== */}

        <div className="prescription-actions">
          <button
            type="submit"
            className="save-prescription-btn"
            disabled={saving}
          >
            <FaSave />

            {saving ? "Saving Prescription..." : "Save Prescription"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPrescription;
