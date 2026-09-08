import "./Register.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";

import api from "../../api/axios";

function Register() {
  const navigate = useNavigate();

  // ============================================================
  // FORM STATE
  // ============================================================

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    roleName: "",
    password: "",
    confirmPassword: "",
  });

  // ============================================================
  // UI STATE
  // ============================================================

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // ============================================================
  // VALIDATION
  // ============================================================

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return "Full name is required.";
    }

    if (!formData.username.trim()) {
      return "Username is required.";
    }

    if (!formData.email.trim()) {
      return "Email address is required.";
    }

    if (!formData.phoneNumber.trim()) {
      return "Phone number is required.";
    }

    if (!/^[0-9]{10}$/.test(formData.phoneNumber.trim())) {
      return "Phone number must be exactly 10 digits.";
    }

    // IMPORTANT:
    // Backend expects roleName, not roleId
    if (!formData.roleName) {
      return "Please select a role.";
    }

    if (!formData.password) {
      return "Password is required.";
    }

    if (formData.password.length < 6) {
      return "Password must contain at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      return "Please confirm your password.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate form
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      // ========================================================
      // REQUEST BODY
      // ========================================================

      const requestData = {
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),

        // IMPORTANT:
        // Send roleName because UserDto expects roleName
        roleName: formData.roleName,

        password: formData.password,
        status: true,
      };

      console.log("Register Request:", requestData);

      // ========================================================
      // CREATE USER
      // ========================================================

      const response = await api.post("/users", requestData);

      console.log("Register Response:", response.data);

      // ========================================================
      // SUCCESS
      // ========================================================

      setSuccess(response.data?.message || "Account created successfully.");

      // Clear form
      setFormData({
        fullName: "",
        username: "",
        email: "",
        phoneNumber: "",
        roleName: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Registration Error:", err);

      const backendMessage = err.response?.data?.message;
      const validationErrors = err.response?.data?.errors;

      if (backendMessage) {
        setError(backendMessage);
      } else if (validationErrors) {
        if (typeof validationErrors === "object") {
          const firstError = Object.values(validationErrors)[0];

          setError(
            typeof firstError === "string"
              ? firstError
              : "Please check the entered information.",
          );
        } else {
          setError("Please check the entered information.");
        }
      } else if (err.response?.status === 403) {
        setError("You are not authorized to create a user.");
      } else if (err.response?.status === 409) {
        setError("Username, email, or phone number already exists.");
      } else {
        setError("Unable to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="login-page">
      {/* BACKGROUND CIRCLES */}

      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <div className="login-container">
        {/* =====================================================
            LEFT PANEL
        ===================================================== */}

        <div className="left-panel">
          <div className="logo-section">
            <div className="logo">👓</div>

            <h1>Lensify</h1>

            <p>Optical Shop Management System</p>
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <FaUserPlus />
              <span>Create Staff Accounts</span>
            </div>

            <div className="feature-item">
              <FaUserPlus />
              <span>Manage User Access</span>
            </div>

            <div className="feature-item">
              <FaUserPlus />
              <span>Role Based Authentication</span>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT PANEL
        ===================================================== */}

        <div className="right-panel">
          <motion.div
            className="login-card register-card"
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <h2>Create Account</h2>

            <p className="sub-text">Register a new staff member</p>

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && <div className="auth-error">{error}</div>}

            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {success && <div className="auth-success">{success}</div>}

            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit}>
              {/* FULL NAME */}

              <div className="input-group">
                <label htmlFor="fullName">Full Name</label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  disabled={loading}
                  autoComplete="name"
                />
              </div>

              {/* USERNAME */}

              <div className="input-group">
                <label htmlFor="username">Username</label>

                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  disabled={loading}
                  autoComplete="username"
                />
              </div>

              {/* EMAIL */}

              <div className="input-group">
                <label htmlFor="email">Email Address</label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              {/* PHONE */}

              <div className="input-group">
                <label htmlFor="phoneNumber">Phone Number</label>

                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter 10 digit phone number"
                  disabled={loading}
                  maxLength="10"
                  inputMode="numeric"
                />
              </div>

              {/* ROLE */}

              <div className="input-group">
                <label htmlFor="roleName">Role</label>

                <select
                  id="roleName"
                  className="role-select"
                  name="roleName"
                  value={formData.roleName}
                  onChange={handleChange}
                  disabled={loading}
                  required
                >
                  <option value="">Select Role</option>

                  <option value="Manager">Manager</option>

                  <option value="Optometrist">Optometrist</option>

                  <option value="Receptionist">Receptionist</option>
                </select>
              </div>

              {/* PASSWORD */}

              <div className="input-group">
                <label htmlFor="password">Password</label>

                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    disabled={loading}
                    autoComplete="new-password"
                  />

                  <span
                    onClick={() => !loading && setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>

                <div className="password-wrapper">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    disabled={loading}
                    autoComplete="new-password"
                  />

                  <span
                    onClick={() => !loading && setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* SUBMIT */}

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              {/* LOGIN LINK */}

              <div className="auth-link">
                Already have an account?
                <Link to="/"> Login</Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Register;
