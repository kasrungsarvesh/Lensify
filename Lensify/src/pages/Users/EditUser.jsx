import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaUserEdit,
  FaSave,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import api from "../../api/axios";

import "./EditUser.css";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  // =========================
  // USER STATE
  // =========================

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    username: "",
    roleName: "",
    status: true,
    password: "",
    confirmPassword: "",
  });

  // =========================
  // UI STATE
  // =========================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // =========================
  // FETCH USER
  // =========================

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/users/${id}`);

      console.log("User details response:", response.data);

      const userData = response.data?.data;

      if (!userData) {
        throw new Error("User details were not found.");
      }

      setUser({
        fullName: userData.fullName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        username: userData.username || "",
        roleName: userData.roleName || "",
        status: userData.status ?? true,

        // Password should never be loaded from backend
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to load user details.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((previousUser) => ({
      ...previousUser,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =========================
  // HANDLE STATUS
  // =========================

  const handleStatusChange = (e) => {
    setUser((previousUser) => ({
      ...previousUser,
      status: e.target.value === "true",
    }));

    setError("");
    setSuccess("");
  };

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    if (!user.fullName.trim()) {
      setError("Full name is required.");
      return false;
    }

    if (!user.email.trim()) {
      setError("Email is required.");
      return false;
    }

    if (!user.phoneNumber.trim()) {
      setError("Phone number is required.");
      return false;
    }

    if (!user.username.trim()) {
      setError("Username is required.");
      return false;
    }

    if (!user.roleName) {
      setError("Please select a role.");
      return false;
    }

    // Password is optional while editing
    if (user.password || user.confirmPassword) {
      if (user.password.length < 6) {
        setError("New password must contain at least 6 characters.");
        return false;
      }

      if (user.password !== user.confirmPassword) {
        setError("New password and confirm password do not match.");
        return false;
      }
    }

    return true;
  };

  // =========================
  // UPDATE USER
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      // =========================
      // REQUEST DATA
      // =========================

      const updateData = {
        fullName: user.fullName.trim(),
        email: user.email.trim(),
        phoneNumber: user.phoneNumber.trim(),
        username: user.username.trim(),
        roleName: user.roleName,
        status: user.status,
      };

      // Only send password when user entered one
      if (user.password.trim()) {
        updateData.password = user.password;
      }

      console.log("Updating user:", updateData);

      const response = await api.put(`/users/${id}`, updateData);

      console.log("Update user response:", response.data);

      setSuccess(response.data?.message || "User updated successfully.");

      // Clear password fields
      setUser((previousUser) => ({
        ...previousUser,
        password: "",
        confirmPassword: "",
      }));

      // Go back to User List after short delay
      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (error) {
      console.error("Update user error:", error);

      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to update user. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="register-container">
        <div className="register-card">
          <div className="loading-message">Loading user details...</div>
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="register-container">
      <div className="register-card">
        {/* =========================
            HEADER
        ========================= */}

        <div className="register-header">
          <div className="logo-circle">
            <FaUserEdit />
          </div>

          <h2>Edit User</h2>

          <p>Update user information</p>

          <small>User ID : {id}</small>
        </div>

        {/* =========================
            ERROR
        ========================= */}

        {error && <div className="form-message error">{error}</div>}

        {/* =========================
            SUCCESS
        ========================= */}

        {success && <div className="form-message success">{success}</div>}

        {/* =========================
            FORM
        ========================= */}

        <form onSubmit={handleSubmit}>
          {/* FULL NAME */}

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              disabled={saving}
            />
          </div>

          {/* EMAIL */}

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
              disabled={saving}
            />
          </div>

          {/* PHONE */}

          <div className="form-group">
            <label>Mobile Number</label>

            <input
              type="tel"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              placeholder="Enter mobile number"
              disabled={saving}
            />
          </div>

          {/* USERNAME */}

          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter username"
              disabled={saving}
            />
          </div>

          {/* ROLE */}

          <div className="form-group">
            <label>Role</label>

            <select
              name="roleName"
              value={user.roleName}
              onChange={handleChange}
              disabled={saving}
            >
              <option value="">Select Role</option>

              <option value="OWNER">Owner</option>

              <option value="ADMIN">Admin</option>

              <option value="RECEPTIONIST">Receptionist</option>

              <option value="OPTOMETRIST">Optometrist</option>
            </select>
          </div>

          {/* STATUS */}

          <div className="form-group">
            <label>Status</label>

            <select
              value={user.status.toString()}
              onChange={handleStatusChange}
              disabled={saving}
            >
              <option value="true">Active</option>

              <option value="false">Inactive</option>
            </select>
          </div>

          {/* NEW PASSWORD */}

          <div className="form-group">
            <label>
              New Password
              <span className="optional-label"> (Optional)</span>
            </label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                autoComplete="new-password"
                disabled={saving}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}

          <div className="form-group">
            <label>Confirm New Password</label>

            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                autoComplete="new-password"
                disabled={saving}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="edit-user-actions">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/users")}
              disabled={saving}
            >
              <FaArrowLeft />
              Back
            </button>

            <button type="submit" className="register-btn" disabled={saving}>
              <FaSave />

              {saving ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
