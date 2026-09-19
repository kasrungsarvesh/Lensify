import { useEffect, useState } from "react";
import { FaSave, FaEye, FaInfoCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { createPrescription } from "../../api/prescriptionApi";
import { getAllCustomers } from "../../api/customerApi";

import { successToast, errorToast } from "../../utils/toast";
import { prescriptionSchema } from "../../validations/prescriptionValidation";

import "./AddPrescription.css";

/* =========================================================
   INFORMATION TOOLTIP
========================================================= */

function InfoTooltip({ title, children }) {
  return (
    <span className="info-tooltip-wrapper">
      <FaInfoCircle className="info-icon" />

      <span className="info-tooltip">
        <span className="info-tooltip-title">{title}</span>

        <span className="info-tooltip-content">{children}</span>
      </span>
    </span>
  );
}

/* =========================================================
   ADD PRESCRIPTION
========================================================= */

function AddPrescription() {
  /* =======================================================
     STATE
  ======================================================= */

  const [customers, setCustomers] = useState([]);

  const [customerSearch, setCustomerSearch] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [loadingCustomers, setLoadingCustomers] = useState(true);

  const [saving, setSaving] = useState(false);

  /* =======================================================
     CURRENT DATE
     Returns YYYY-MM-DD for input[type="date"]
  ======================================================= */

  const getCurrentDate = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* =======================================================
     REACT HOOK FORM
  ======================================================= */

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(prescriptionSchema),

    mode: "onSubmit",

    reValidateMode: "onChange",

    defaultValues: {
      customerId: "",

      doctorName: "",

      prescriptionDate: getCurrentDate(),

      /* RIGHT EYE */

      rightEyeSph: "",

      rightEyeCyl: "",

      rightEyeAxis: "",

      rightEyeVa: "",

      /* LEFT EYE */

      leftEyeSph: "",

      leftEyeCyl: "",

      leftEyeAxis: "",

      leftEyeVa: "",

      /* PD */

      pdDistance: "",

      pdNear: "",

      /* LENS */

      lensType: "",

      lensIndex: "",

      coating: "",

      /* REMARKS */

      remarks: "",
    },
  });

  /* =======================================================
     LOAD CUSTOMERS
  ======================================================= */

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoadingCustomers(true);

      const response = await getAllCustomers();

      const data = response?.data?.data;

      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load customers:", error);

      errorToast(error.response?.data?.message || "Unable to load customers.");
    } finally {
      setLoadingCustomers(false);
    }
  };

  /* =======================================================
     CUSTOMER SEARCH
     
     IMPORTANT:
     Search is ONLY against customerName.
  ======================================================= */

  const filteredCustomers = customerSearch.trim()
    ? customers.filter((customer) => {
        const customerName = customer.customerName || "";

        return customerName
          .toLowerCase()
          .includes(customerSearch.trim().toLowerCase());
      })
    : [];

  /* =======================================================
     CUSTOMER SEARCH INPUT
  ======================================================= */

  const handleCustomerSearch = (value) => {
    setCustomerSearch(value);

    /*
     * If user starts typing after previously selecting
     * a customer, remove the selected customer first.
     */

    if (selectedCustomer) {
      setSelectedCustomer(null);

      setValue("customerId", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  /* =======================================================
     SELECT CUSTOMER
  ======================================================= */

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);

    setCustomerSearch("");

    setValue("customerId", customer.customerId, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  /* =======================================================
     CHANGE CUSTOMER
  ======================================================= */

  const handleRemoveCustomer = () => {
    setSelectedCustomer(null);

    setCustomerSearch("");

    setValue("customerId", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const onSubmit = async (data) => {
    try {
      setSaving(true);

      const request = {
        customerId: Number(data.customerId),

        prescriptionDate: data.prescriptionDate,

        doctorName: data.doctorName?.trim() || null,

        /* =================================================
           RIGHT EYE
        ================================================= */

        rightEyeSph: Number(data.rightEyeSph),

        rightEyeCyl:
          data.rightEyeCyl === "" || data.rightEyeCyl === null
            ? null
            : Number(data.rightEyeCyl),

        rightEyeAxis:
          data.rightEyeAxis === "" || data.rightEyeAxis === null
            ? null
            : Number(data.rightEyeAxis),

        rightEyeVa: data.rightEyeVa?.trim() || null,

        /* =================================================
           LEFT EYE
        ================================================= */

        leftEyeSph: Number(data.leftEyeSph),

        leftEyeCyl:
          data.leftEyeCyl === "" || data.leftEyeCyl === null
            ? null
            : Number(data.leftEyeCyl),

        leftEyeAxis:
          data.leftEyeAxis === "" || data.leftEyeAxis === null
            ? null
            : Number(data.leftEyeAxis),

        leftEyeVa: data.leftEyeVa?.trim() || null,

        /* =================================================
           PD
        ================================================= */

        pdDistance: Number(data.pdDistance),

        pdNear:
          data.pdNear === "" || data.pdNear === null
            ? null
            : Number(data.pdNear),

        /* =================================================
           LENS
        ================================================= */

        lensType: data.lensType || null,

        lensIndex: data.lensIndex || null,

        coating: data.coating || null,

        /* =================================================
           REMARKS
        ================================================= */

        remarks: data.remarks?.trim() || null,
      };

      console.log("Prescription Request:", request);

      const response = await createPrescription(request);

      successToast(response.data.message || "Prescription saved successfully.");

      /*
       * Reset the form.
       * Keep today's date instead of leaving it blank.
       */

      reset({
        customerId: "",

        doctorName: "",

        prescriptionDate: getCurrentDate(),

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

      setSelectedCustomer(null);

      setCustomerSearch("");
    } catch (error) {
      console.error("Prescription save error:", error);

      errorToast(
        error.response?.data?.message || "Failed to save prescription.",
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     FIELD ERROR
  ======================================================= */

  const FieldError = ({ name }) => {
    if (!errors[name]) {
      return null;
    }

    return <small className="field-error">{errors[name]?.message}</small>;
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="add-prescription-page">
      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="page-header">
        <div>
          <h2>Add Prescription</h2>

          <p>Manage customer eye power details</p>
        </div>

        <div className="header-icon">
          <FaEye />
        </div>
      </div>

      {/* ===================================================
          FORM
      =================================================== */}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* =================================================
            CUSTOMER INFORMATION
        ================================================= */}

        <div className="card">
          <h3>Customer Information</h3>

          <div className="grid-3">
            {/* =============================================
                CUSTOMER SEARCH
            ============================================= */}

            <div className="form-group customer-search-group">
              <label>
                Customer <span>*</span>
              </label>

              <div className="customer-search-container">
                {/* =========================================
                    SELECTED CUSTOMER
                ========================================= */}

                {selectedCustomer ? (
                  <div className="selected-customer">
                    <div className="selected-customer-main">
                      <div className="selected-customer-avatar">
                        {(selectedCustomer.customerName || "C")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="selected-customer-info">
                        <strong>{selectedCustomer.customerName}</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="remove-customer"
                      onClick={handleRemoveCustomer}
                      title="Change customer"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    {/* ===================================
                        SEARCH INPUT
                    =================================== */}

                    <input
                      type="text"
                      value={customerSearch}
                      onChange={(e) => handleCustomerSearch(e.target.value)}
                      placeholder={
                        loadingCustomers
                          ? "Loading customers..."
                          : "Search customer name..."
                      }
                      autoComplete="off"
                      disabled={loadingCustomers}
                      className={errors.customerId ? "input-error" : ""}
                    />

                    {/* ===================================
                        SEARCH RESULTS
                    =================================== */}

                    {!loadingCustomers &&
                      customerSearch.trim() !== "" &&
                      filteredCustomers.length > 0 && (
                        <div className="customer-results">
                          {filteredCustomers.map((customer) => (
                            <button
                              type="button"
                              key={customer.customerId}
                              className="customer-result"
                              onClick={() => handleCustomerSelect(customer)}
                            >
                              <div className="customer-result-avatar">
                                {(customer.customerName || "C")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div className="customer-result-info">
                                <span className="customer-result-name">
                                  {customer.customerName || "Unnamed Customer"}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                    {/* ===================================
                        NO RESULTS
                    =================================== */}

                    {!loadingCustomers &&
                      customerSearch.trim() !== "" &&
                      filteredCustomers.length === 0 && (
                        <div className="customer-no-results">
                          No customer found
                        </div>
                      )}
                  </>
                )}
              </div>

              <FieldError name="customerId" />
            </div>

            {/* =============================================
                DOCTOR
            ============================================= */}

            {/* <div className="form-group">
              <label>Doctor Name</label>

              <input
                type="text"
                {...register("doctorName")}
                placeholder="Enter doctor name"
              />

              <FieldError name="doctorName" />
            </div> */}

            {/* =============================================
                PRESCRIPTION DATE
            ============================================= */}

            <div className="form-group">
              <label>
                Prescription Date <span>*</span>
                <InfoTooltip title="Prescription Date">
                  Date on which the eye examination or prescription was
                  recorded.
                </InfoTooltip>
              </label>

              <input
                type="date"
                {...register("prescriptionDate")}
                className={errors.prescriptionDate ? "input-error" : ""}
              />

              <FieldError name="prescriptionDate" />
            </div>
          </div>
        </div>

        {/* =================================================
            EYE POWER DETAILS
        ================================================= */}

        <div className="card">
          <h3>
            Eye Power Details
            <InfoTooltip title="Eye Power">
              The refractive prescription is recorded separately for the right
              eye (OD) and left eye (OS).
            </InfoTooltip>
          </h3>

          <div className="power-table-wrapper">
            <table className="power-table">
              {/* =========================================
                  TABLE HEADER
              ========================================= */}

              <thead>
                <tr>
                  <th>Eye</th>

                  <th>
                    SPH
                    <InfoTooltip title="SPH - Sphere">
                      Sphere is the main lens power. Negative values are
                      commonly used for myopia and positive values for
                      hyperopia.
                    </InfoTooltip>
                  </th>

                  <th>
                    CYL
                    <InfoTooltip title="CYL - Cylinder">
                      Cylinder represents the amount of astigmatic correction.
                    </InfoTooltip>
                  </th>

                  <th>
                    AXIS
                    <InfoTooltip title="AXIS">
                      Axis specifies the orientation of the cylinder correction.
                      Valid values are 0° to 180°.
                    </InfoTooltip>
                  </th>

                  <th>
                    VA
                    <InfoTooltip title="VA - Visual Acuity">
                      Visual acuity records how clearly the patient can see, for
                      example 6/6 or 20/20.
                    </InfoTooltip>
                  </th>
                </tr>
              </thead>

              {/* =========================================
                  TABLE BODY
              ========================================= */}

              <tbody>
                {/* =======================================
                    RIGHT EYE
                ======================================= */}

                <tr>
                  <td className="eye-name">Right Eye (OD)</td>

                  {/* SPH */}

                  <td>
                    <input
                      type="number"
                      step="0.01"
                      {...register("rightEyeSph")}
                      placeholder="SPH"
                      className={errors.rightEyeSph ? "input-error" : ""}
                    />

                    <FieldError name="rightEyeSph" />
                  </td>

                  {/* CYL */}

                  <td>
                    <input
                      type="number"
                      step="0.01"
                      {...register("rightEyeCyl")}
                      placeholder="CYL"
                      className={errors.rightEyeCyl ? "input-error" : ""}
                    />

                    <FieldError name="rightEyeCyl" />
                  </td>

                  {/* AXIS */}

                  <td>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      step="1"
                      {...register("rightEyeAxis")}
                      placeholder="AXIS"
                      className={errors.rightEyeAxis ? "input-error" : ""}
                    />

                    <FieldError name="rightEyeAxis" />
                  </td>

                  {/* VA */}

                  <td>
                    <input
                      type="text"
                      {...register("rightEyeVa")}
                      placeholder="e.g. 6/6"
                    />

                    <FieldError name="rightEyeVa" />
                  </td>
                </tr>

                {/* =======================================
                    LEFT EYE
                ======================================= */}

                <tr>
                  <td className="eye-name">Left Eye (OS)</td>

                  {/* SPH */}

                  <td>
                    <input
                      type="number"
                      step="0.01"
                      {...register("leftEyeSph")}
                      placeholder="SPH"
                      className={errors.leftEyeSph ? "input-error" : ""}
                    />

                    <FieldError name="leftEyeSph" />
                  </td>

                  {/* CYL */}

                  <td>
                    <input
                      type="number"
                      step="0.01"
                      {...register("leftEyeCyl")}
                      placeholder="CYL"
                      className={errors.leftEyeCyl ? "input-error" : ""}
                    />

                    <FieldError name="leftEyeCyl" />
                  </td>

                  {/* AXIS */}

                  <td>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      step="1"
                      {...register("leftEyeAxis")}
                      placeholder="AXIS"
                      className={errors.leftEyeAxis ? "input-error" : ""}
                    />

                    <FieldError name="leftEyeAxis" />
                  </td>

                  {/* VA */}

                  <td>
                    <input
                      type="text"
                      {...register("leftEyeVa")}
                      placeholder="e.g. 6/6"
                    />

                    <FieldError name="leftEyeVa" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* =================================================
            PUPILLARY DISTANCE
        ================================================= */}

        <div className="card">
          <h3>
            Pupillary Distance
            <InfoTooltip title="PD - Pupillary Distance">
              PD is the distance between the pupils, measured in millimetres. It
              is used during dispensing to position the optical centers
              correctly.
              <br />
              <br />
              Note: PD is technically a dispensing/fitting measurement rather
              than part of the clinical prescription itself.
            </InfoTooltip>
          </h3>

          <div className="grid-2">
            {/* =============================================
                DISTANCE PD
            ============================================= */}

            <div className="form-group">
              <label>
                PD Distance <span>*</span>
                <InfoTooltip title="PD Distance">
                  Distance PD is the pupillary distance measured while looking
                  at a distant target.
                  <br />
                  <br />
                  Enter the measured binocular PD in mm.
                </InfoTooltip>
              </label>

              <input
                type="number"
                step="0.1"
                min="40"
                max="80"
                {...register("pdDistance")}
                placeholder="e.g. 62"
                className={errors.pdDistance ? "input-error" : ""}
              />

              <FieldError name="pdDistance" />
            </div>

            {/* =============================================
                NEAR PD
            ============================================= */}

            <div className="form-group">
              <label>
                PD Near
                <InfoTooltip title="PD Near">
                  Near PD is measured for close working distance.
                  <br />
                  <br />
                  It is generally smaller than distance PD because the eyes
                  converge when looking at a near object.
                  <br />
                  <br />
                  Use the measured value when available.
                </InfoTooltip>
              </label>

              <input
                type="number"
                step="0.1"
                min="35"
                max="80"
                {...register("pdNear")}
                placeholder="e.g. 59"
                className={errors.pdNear ? "input-error" : ""}
              />

              <FieldError name="pdNear" />
            </div>
          </div>
        </div>

        {/* =================================================
            LENS INFORMATION
        ================================================= */}

        <div className="card">
          <h3>Lens Information</h3>

          <div className="grid-2">
            {/* =============================================
                LENS TYPE
            ============================================= */}

            <div className="form-group">
              <label>
                Lens Type
                <InfoTooltip title="Lens Type">
                  Indicates the type of spectacle lens being considered for
                  dispensing.
                </InfoTooltip>
              </label>

              <select {...register("lensType")}>
                <option value="">Select Lens Type</option>

                <option value="Single Vision">Single Vision</option>

                <option value="Progressive">Progressive</option>

                <option value="Bifocal">Bifocal</option>

                <option value="Blue Cut">Blue Cut</option>
              </select>
            </div>

            {/* =============================================
                LENS INDEX
            ============================================= */}

            <div className="form-group">
              <label>
                Lens Index
                <InfoTooltip title="Lens Index">
                  Refractive index describes the optical material's ability to
                  bend light. Higher-index materials can allow thinner lenses
                  for the same prescription.
                </InfoTooltip>
              </label>

              <select {...register("lensIndex")}>
                <option value="">Select Lens Index</option>

                <option value="1.50">1.50</option>

                <option value="1.56">1.56</option>

                <option value="1.60">1.60</option>

                <option value="1.67">1.67</option>

                <option value="1.74">1.74</option>
              </select>
            </div>

            {/* =============================================
                COATING
            ============================================= */}

            <div className="form-group">
              <label>
                Coating
                <InfoTooltip title="Lens Coating">
                  A lens coating is an applied treatment used to provide
                  characteristics such as reflection reduction, scratch
                  resistance, or UV-related protection depending on the coating.
                </InfoTooltip>
              </label>

              <select {...register("coating")}>
                <option value="">Select Coating</option>

                <option value="Anti Glare">Anti Glare</option>

                <option value="Blue Cut">Blue Cut</option>

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

          <textarea
            rows="5"
            {...register("remarks")}
            placeholder="Enter any additional remarks..."
            className={errors.remarks ? "input-error" : ""}
          />

          <FieldError name="remarks" />
        </div>

        {/* =================================================
            SAVE BUTTON
        ================================================= */}

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
