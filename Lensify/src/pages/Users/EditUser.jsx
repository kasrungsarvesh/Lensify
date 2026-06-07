import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserEdit, FaSave } from "react-icons/fa";

import "./EditUser.css";

function EditUser() {
  const { id } = useParams();

  const [user, setUser] = useState({
    fullName: "Priya Patel",
    email: "priya@lensify.com",
    mobile: "9988776655",
    username: "priya",

    role: "Receptionist",
    status: "Active",

    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);

    alert("User Updated Successfully");
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <div className="register-header">

          <div className="logo-circle">
            <FaUserEdit />
          </div>

          <h2>Edit User</h2>

          <p>
            Update user information
          </p>

          <small>
            User ID : {id}
          </small>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Mobile Number</label>

            <input
              type="text"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Username</label>

            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Role</label>

            <select
              name="role"
              value={user.role}
              onChange={handleChange}
            >
              <option>Owner</option>
              <option>Admin</option>
              <option>Receptionist</option>
              <option>Optometrist</option>
            </select>

          </div>

          <div className="form-group">

            <label>Status</label>

            <select
              name="status"
              value={user.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

          </div>

          <div className="form-group">

            <label>New Password</label>

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="register-btn"
          >
            <FaSave />
            Update User
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditUser;