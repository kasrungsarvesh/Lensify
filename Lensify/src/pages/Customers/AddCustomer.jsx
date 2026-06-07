import { useState } from "react";
import { FaUserPlus, FaSave, FaUndo } from "react-icons/fa";
import "./AddCustomer.css";

function AddCustomer() {
  const [customer, setCustomer] = useState({
    customerCode: "CUST001",
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
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customer);
  };

  const handleReset = () => {
    setCustomer({
      customerCode: "CUST001",
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
    });
  };

  return (
    <div className="add-customer-page">

      {/* Header */}
      <div className="customer-page-header">
        <div>
          <h2>Add New Customer</h2>
          <p>Create and manage customer records</p>
        </div>

        <div className="header-icon">
          <FaUserPlus />
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Personal Info */}
        <div className="customer-card">
          <h3>Personal Information</h3>

          <div className="customer-grid">

            <div>
              <label>Customer Code</label>
              <input
                type="text"
                value={customer.customerCode}
                disabled
              />
            </div>

            <div>
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={customer.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Gender</label>
              <select
                name="gender"
                value={customer.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={customer.dob}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={customer.age}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Reference By</label>
              <input
                type="text"
                name="referenceBy"
                value={customer.referenceBy}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        {/* Contact Info */}
        <div className="customer-card">
          <h3>Contact Information</h3>

          <div className="customer-grid">

            <div>
              <label>Mobile Number *</label>
              <input
                type="text"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Alternate Number</label>
              <input
                type="text"
                name="alternatePhone"
                value={customer.alternatePhone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        {/* Address */}
        <div className="customer-card">
          <h3>Address Information</h3>

          <div className="customer-grid">

            <div className="full-width">
              <label>Address</label>
              <textarea
                rows="4"
                name="address"
                value={customer.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={customer.city}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="customer-actions">

          <button
            type="submit"
            className="save-btn"
          >
            <FaSave />
            Save Customer
          </button>

          <button
            type="button"
            className="reset-btn"
            onClick={handleReset}
          >
            <FaUndo />
            Reset
          </button>

        </div>

      </form>
    </div>
  );
}

export default AddCustomer;