import { FaUserPlus, FaSave, FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "./AddCustomer.css";

import { addCustomer } from "../../api/customerApi";
import { successToast, errorToast } from "../../utils/toast";
import { customerSchema } from "../../validations/customerValidation";

function AddCustomer() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: {
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
    },
  });

  const onSubmit = async (data) => {
    try {
      const request = {
        customerName: data.fullName,
        gender: data.gender,
        dateOfBirth: data.dob,
        age: Number(data.age),
        mobileNumber: data.phone,
        alternatePhone: data.alternatePhone,
        email: data.email,
        address: data.address,
        city: data.city,
        referenceBy: data.referenceBy,
        status: true,
      };

      const response = await addCustomer(request);

      successToast(response.data.message);

      reset();

      navigate("/customers");
    } catch (error) {
      console.error(error);

      errorToast(error.response?.data?.message || "Failed to add customer.");
    }
  };

  return (
    <div className="add-customer-page">
      <div className="customer-page-header">
        <div>
          <h2>Add New Customer</h2>
          <p>Create and manage customer records</p>
        </div>

        <div className="header-icon">
          <FaUserPlus />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="customer-card">
          <h3>Personal Information</h3>

          <div className="customer-grid">
            <div>
              <label>Customer Code</label>
              <input type="text" value="Auto Generated" disabled />
            </div>

            <div>
              <label>Full Name *</label>

              <input type="text" {...register("fullName")} />

              <small className="error">{errors.fullName?.message}</small>
            </div>

            <div>
              <label>Gender</label>

              <select {...register("gender")}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <small className="error">{errors.gender?.message}</small>
            </div>

            <div>
              <label>Date of Birth</label>

              <input type="date" {...register("dob")} />

              <small className="error">{errors.dob?.message}</small>
            </div>

            <div>
              <label>Age</label>

              <input type="number" {...register("age")} />

              <small className="error">{errors.age?.message}</small>
            </div>

            <div>
              <label>Reference By</label>

              <input type="text" {...register("referenceBy")} />

              <small className="error">{errors.referenceBy?.message}</small>
            </div>
          </div>
        </div>

        <div className="customer-card">
          <h3>Contact Information</h3>

          <div className="customer-grid">
            <div>
              <label>Mobile Number *</label>

              <input type="text" {...register("phone")} />

              <small className="error">{errors.phone?.message}</small>
            </div>

            <div>
              <label>Alternate Number</label>

              <input type="text" {...register("alternatePhone")} />

              <small className="error">{errors.alternatePhone?.message}</small>
            </div>

            <div>
              <label>Email Address</label>

              <input type="email" {...register("email")} />

              <small className="error">{errors.email?.message}</small>
            </div>
          </div>
        </div>

        <div className="customer-card">
          <h3>Address Information</h3>

          <div className="customer-grid">
            <div className="full-width">
              <label>Address</label>

              <textarea rows="4" {...register("address")} />

              <small className="error">{errors.address?.message}</small>
            </div>

            <div>
              <label>City</label>

              <input type="text" {...register("city")} />

              <small className="error">{errors.city?.message}</small>
            </div>
          </div>
        </div>

        <div className="customer-actions">
          <button type="submit" className="save-btn">
            <FaSave />
            Save Customer
          </button>

          <button type="button" className="reset-btn" onClick={() => reset()}>
            <FaUndo />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
