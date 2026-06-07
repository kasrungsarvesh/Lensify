import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserEdit, FaSave, FaArrowLeft } from "react-icons/fa";
import "./EditCustomer.css";

function EditCustomer() {
  const { id } = useParams();

  const [customer, setCustomer] = useState({
    customerCode: `CUST00${id}`,
    fullName: "Rahul Sharma",
    gender: "Male",
    dob: "1998-06-15",
    age: "28",
    phone: "9876543210",
    alternatePhone: "9988776655",
    email: "rahul@gmail.com",
    address: "Borivali East",
    city: "Mumbai",
    referenceBy: "Walk In",
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Customer:", customer);

    alert("Customer Updated Successfully");
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

        {/* Personal Information */}

        <div className="edit-card">

          <h3>Personal Information</h3>

          <div className="edit-grid">

            <div>
              <label>Customer Code</label>

              <input
                type="text"
                value={customer.customerCode}
                disabled
              />
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

        {/* Contact Information */}

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

        {/* Address */}

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

        <div className="edit-actions">

          <button
            type="submit"
            className="update-btn"
          >
            <FaSave />
            Update Customer
          </button>

          <button
            type="button"
            className="cancel-btn"
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