import "./Login.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


import {
  FaEye,
  FaEyeSlash,
  FaUsers,
  FaReceipt,
  FaGlasses,
  FaClipboardList,
} from "react-icons/fa";



function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      {/* Background Effects */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="left-panel">

          <div className="logo-section">
            <div className="logo">👓</div>

            <h1>Lensify</h1>

            <p>
              Complete Optical Shop Management System
            </p>
          </div>

          <div className="feature-list">

            <div className="feature-item">
              <FaUsers />
              <span>Customer Management</span>
            </div>

            <div className="feature-item">
              <FaGlasses />
              <span>Prescription Tracking</span>
            </div>

            <div className="feature-item">
              <FaReceipt />
              <span>Billing & Invoicing</span>
            </div>

            <div className="feature-item">
              <FaClipboardList />
              <span>Inventory Management</span>
            </div>

          </div>

          <div className="stats">

            <div className="stat-card">
              <h2>1500+</h2>
              <p>Customers</p>
            </div>

            <div className="stat-card">
              <h2>3500+</h2>
              <p>Bills</p>
            </div>

            <div className="stat-card">
              <h2>500+</h2>
              <p>Prescriptions</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="right-panel">

          <motion.div
            className="login-card"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h2>Welcome Back 👋</h2>

            <p className="sub-text">
              Login to continue managing your optical shop
            </p>

            {/* <form> */}
            {/* temp code */}
            <form onSubmit={handleLogin}>

              <div className="input-group">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="input-group">
                <label>Password</label>

                <div className="password-wrapper">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                  />

                  <span
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </span>

                </div>
              </div>

              <div className="options">

                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>

                <a href="#">
                  Forgot Password?
                </a>

              </div>

              <button
                type="submit"
                className="login-btn"
              >
                Login
              </button>
            </form>


          </motion.div>

        </div>

      </div>
    </div>
  );
}

export default Login;
