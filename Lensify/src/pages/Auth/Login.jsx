import "./Login.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";

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

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Decode JWT payload
  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];

      return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    } catch (error) {
      console.error("Unable to decode token:", error);
      return null;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await login(formData);

      const token = response.data.data.token;

      // Save JWT
      localStorage.setItem("token", token);

      // Decode JWT
      const decodedToken = decodeToken(token);

      console.log("Decoded JWT:", decodedToken);

      /*
       * Depending on your backend JWT claims,
       * username/role may have different names.
       */
      const username =
        decodedToken?.username || decodedToken?.sub || formData.username;

      const role = decodedToken?.roleName || decodedToken?.role || "USER";

      // Save logged-in user details
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background Effects */}

      <div className="login-container">
        {/* LEFT SIDE */}

        <div className="left-panel">
          <div className="logo-section">
            <div className="logo">👓</div>

            <h1>Lensify</h1>

            <p>Complete Optical Shop Management System</p>
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
            <h2>Welcome Back 👋</h2>

            <p className="sub-text">
              Login to continue managing your optical shop
            </p>

            <form onSubmit={handleLogin}>
              {/* Username */}

              <div className="input-group">
                <label>Username</label>

                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}

              <div className="input-group">
                <label>Password</label>

                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Options */}

              <div className="options">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>

                <a href="#">Forgot Password?</a>
              </div>

              {/* Login Button */}

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;
