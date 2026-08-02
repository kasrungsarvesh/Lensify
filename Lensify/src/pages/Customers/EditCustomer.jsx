import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserEdit, FaSave, FaArrowLeft } from "react-icons/fa";

import { getCustomerById, updateCustomer } from "../../api/customerApi";

import { successToast, errorToast } from "../../utils/toast";

import "./EditCustomer.css";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
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
  });

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await getCustomerById(id);
      const data = response.data.data;

      setCustomer({
        customerCode: data.customerCode || "",
        fullName: data.customerName || "",
        gender: data.gender || "",
        dob: data.dateOfBirth || "",
        age: data.age || "",
        phone: data.mobileNumber || "",
        alternatePhone: data.alternatePhone || "",
        email: data.email || "",
        address: data.address || "",
        city: data.city || "",
        referenceBy: data.referenceBy || "",
        status: data.status,
      });
    } catch (error) {
      errorToast("Unable to load customer.");
    }
  };

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (customer.fullName.trim().length < 3) {
      errorToast("Customer name must be at least 3 characters.");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(customer.fullName)) {
      errorToast("Customer name should contain only letters.");
      return;
    }

    if (!customer.gender) {
      errorToast("Please select gender.");
      return;
    }

    if (!customer.dob) {
      errorToast("Please select date of birth.");
      return;
    }

    if (!customer.age || customer.age < 1 || customer.age > 120) {
      errorToast("Enter valid age.");
      return;
    }

    if (!/^[6-9][0-9]{9}$/.test(customer.phone)) {
      errorToast("Enter valid mobile number.");
      return;
    }

    if (
      customer.alternatePhone &&
      !/^[6-9][0-9]{9}$/.test(customer.alternatePhone)
    ) {
      errorToast("Enter valid alternate mobile number.");
      return;
    }

    if (customer.alternatePhone && customer.phone === customer.alternatePhone) {
      errorToast("Mobile and alternate mobile cannot be same.");
      return;
    }

    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      errorToast("Enter valid email.");
      return;
    }

    if (!customer.address.trim()) {
      errorToast("Address is required.");
      return;
    }

    if (!customer.city.trim()) {
      errorToast("City is required.");
      return;
    }

    try {
      const request = {
        customerName: customer.fullName,
        gender: customer.gender,
        dateOfBirth: customer.dob,
        age: Number(customer.age),
        mobileNumber: customer.phone,
        alternatePhone: customer.alternatePhone,
        email: customer.email,
        address: customer.address,
        city: customer.city,
        referenceBy: customer.referenceBy,
        status: customer.status,
      };

      const response = await updateCustomer(id, request);

      successToast(response.data.message);

      navigate("/customers");
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to update customer.");
    }
  };

  return (
    <div className="edit-customer-page">
      <div className="edit-header">
        <div>
          <h2>Edit Customer</h2>
          <p>Update customer information</p>
        </div>

        <div className="edit-icon">
          <FaUserEdit />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="edit-card">
          <h3>Personal Information</h3>

          <div className="edit-grid">
            <div>
              <label>Customer Code</label>

              <input type="text" value={customer.customerCode} disabled />
            </div>

            <div>
              <label>Full Name</label>

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
              <label>Date Of Birth</label>

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

        <div className="edit-card">
          <h3>Contact Information</h3>

          <div className="edit-grid">
            <div>
              <label>Phone Number</label>

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
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Address Information */}

        <div className="edit-card">
          <h3>Address Information</h3>

          <div className="edit-grid">
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
