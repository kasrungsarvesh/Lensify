import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserEdit, FaSave, FaArrowLeft } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { getCustomerById, updateCustomer } from "../../api/customerApi";

import { successToast, errorToast } from "../../utils/toast";

import { customerSchema } from "../../validations/customerValidation";

import "./EditCustomer.css";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      customerCode: "",
      fullName: "",
      gender: "",
      dob: "",
      age: "",
      phone: "",
      alternatePhone: "",
      email: "",
      address: "",
      city: "",
      referenceBy: "",
      status: true,
    },
  });

  /* =========================
     FETCH CUSTOMER
     ========================= */

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      setLoading(true);

      const response = await getCustomerById(id);
      const data = response.data.data;

      reset({
        customerCode: data.customerCode || "",
        fullName: data.customerName || "",
        gender: data.gender || "",
        dob: data.dateOfBirth || "",
        age: data.age ?? "",
        phone: data.mobileNumber || "",
        alternatePhone: data.alternatePhone || "",
        email: data.email || "",
        address: data.address || "",
        city: data.city || "",
        referenceBy: data.referenceBy || "",
        status: data.status ?? true,
      });
    } catch (error) {
      console.error(error);
      errorToast("Unable to load customer.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UPDATE CUSTOMER
     ========================= */

  const onSubmit = async (data) => {
    try {
      const request = {
        customerName: data.fullName.trim(),
        gender: data.gender,
        dateOfBirth: data.dob,
        age: Number(data.age),
        mobileNumber: data.phone.trim(),
        alternatePhone: data.alternatePhone?.trim() || "",
        email: data.email.trim(),
        address: data.address.trim(),
        city: data.city.trim(),
        referenceBy: data.referenceBy?.trim() || "",
        status: true,
      };

      const response = await updateCustomer(id, request);

      successToast(response.data.message || "Customer updated successfully.");

      navigate("/customers");
    } catch (error) {
      console.error(error);

      errorToast(error.response?.data?.message || "Failed to update customer.");
    }
  };

  /* =========================
     LOADING
     ========================= */

  if (loading) {
    return (
      <div className="edit-customer-page">
        <div className="edit-card">
          <p>Loading customer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-customer-page">
      {/* ================= HEADER ================= */}

      <div className="edit-header">
        <div>
          <h2>Edit Customer</h2>
          <p>Update customer information</p>
        </div>

        <div className="edit-icon">
          <FaUserEdit />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ================= PERSONAL INFORMATION ================= */}

        <div className="edit-card">
          <h3>Personal Information</h3>

          <div className="edit-grid">
            {/* Customer Code */}

            <div>
              <label>Customer Code</label>

              <input type="text" {...register("customerCode")} disabled />
            </div>

            {/* Full Name */}

            <div>
              <label>Full Name *</label>

              <input type="text" {...register("fullName")} />

              <small className="error">{errors.fullName?.message}</small>
            </div>

            {/* Gender */}

            <div>
              <label>Gender *</label>

              <select {...register("gender")}>
                <option value="">Select Gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>
              </select>

              <small className="error">{errors.gender?.message}</small>
            </div>

            {/* Date of Birth */}

            <div>
              <label>Date of Birth *</label>

              <input type="date" {...register("dob")} />

              <small className="error">{errors.dob?.message}</small>
            </div>

            {/* Age */}

            <div>
              <label>Age *</label>

              <input type="number" min="1" max="120" {...register("age")} />

              <small className="error">{errors.age?.message}</small>
            </div>

            {/* Reference By */}

            {/* <div>
              <label>Reference By</label>

              <input type="text" {...register("referenceBy")} />

              <small className="error">{errors.referenceBy?.message}</small>
            </div> */}
          </div>
        </div>

        {/* ================= CONTACT INFORMATION ================= */}

        <div className="edit-card">
          <h3>Contact Information</h3>

          <div className="edit-grid">
            {/* Mobile */}

            <div>
              <label>Mobile Number *</label>

              <input type="text" maxLength="10" {...register("phone")} />

              <small className="error">{errors.phone?.message}</small>
            </div>

            {/* Alternate Mobile */}

            <div>
              <label>Alternate Number</label>

              <input
                type="text"
                maxLength="10"
                {...register("alternatePhone")}
              />

              <small className="error">{errors.alternatePhone?.message}</small>
            </div>

            {/* Email */}

            <div>
              <label>Email Address *</label>

              <input type="email" {...register("email")} />

              <small className="error">{errors.email?.message}</small>
            </div>
          </div>
        </div>

        {/* ================= ADDRESS INFORMATION ================= */}

        <div className="edit-card">
          <h3>Address Information</h3>

          <div className="edit-grid">
            {/* Address */}

            <div className="full-width">
              <label>Address *</label>

              <textarea rows="4" {...register("address")} />

              <small className="error">{errors.address?.message}</small>
            </div>

            {/* City */}

            <div>
              <label>City *</label>

              <input type="text" {...register("city")} />

              <small className="error">{errors.city?.message}</small>
            </div>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}

        <div className="edit-actions">
          <button type="submit" className="update-btn">
            <FaSave />
            Update Customer
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/customers")}
          >
            <FaArrowLeft />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCustomer;
