import "./Register.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="login-page">

      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <div className="login-container">

        {/* LEFT PANEL */}
        <div className="left-panel">

          <div className="logo-section">
            <div className="logo">👓</div>

            <h1>Lensify</h1>

            <p>
              Optical Shop Management System
            </p>
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

        {/* RIGHT PANEL */}
        <div className="right-panel">

          <motion.div
            className="login-card register-card"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h2>Create Account</h2>

            <p className="sub-text">
              Register a new staff member
            </p>

            <form>

              <div className="input-group">
                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter full name"
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter email"
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>

                <input
                  type="text"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="input-group">
                <label>Role</label>

                <select className="role-select">
                  <option value="">
                    Select Role
                  </option>

                  <option value="3">
                    Manager
                  </option>

                  <option value="4">
                    Optometrist
                  </option>

                  <option value="5">
                    Receptionist
                  </option>
                </select>
              </div>

              {/* PASSWORD */}

              <div className="input-group">
                <label>Password</label>

                <div className="password-wrapper">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter password"
                  />

                  <span
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </span>

                </div>
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="input-group">
                <label>Confirm Password</label>

                <div className="password-wrapper">

                  <input
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm password"
                  />

                  <span
                    onClick={() =>
                      setShowConfirm(!showConfirm)
                    }
                  >
                    {showConfirm
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </span>

                </div>
              </div>

              <button
                type="submit"
                className="login-btn"
              >
                Create Account
              </button>

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