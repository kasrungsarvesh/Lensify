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
    username: localStorage.getItem("rememberedUsername") || "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true",
  );

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRememberMeChange = (e) => {
    const checked = e.target.checked;

    setRememberMe(checked);

    if (!checked) {
      localStorage.removeItem("rememberedUsername");
      localStorage.removeItem("rememberMe");
    }
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

    // =========================
    // VALIDATION
    // =========================

    if (!formData.username.trim()) {
      alert("Please enter username.");
      return;
    }

    if (!formData.password) {
      alert("Please enter password.");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // LOGIN API
      // =========================

      const response = await login({
        username: formData.username.trim(),
        password: formData.password,
      });

      const loginData = response.data?.data;

      if (!loginData) {
        throw new Error("Invalid login response from server.");
      }

      // =========================
      // GET JWT TOKEN
      // =========================

      const token = loginData.token;

      if (!token) {
        throw new Error("Authentication token was not received.");
      }

      // =========================
      // DECODE JWT
      // =========================

      const decodedToken = decodeToken(token);

      console.log("Login response:", loginData);
      console.log("Decoded JWT:", decodedToken);

      // =========================
      // USER INFORMATION
      // =========================

      const userId = loginData.userId;

      if (!userId) {
        console.warn("User ID was not returned by login API.");
      }

      const fullName =
        loginData.fullName ||
        decodedToken?.fullName ||
        loginData.username ||
        formData.username.trim();

      const username =
        loginData.username ||
        decodedToken?.username ||
        decodedToken?.sub ||
        formData.username.trim();

      const role =
        loginData.role ||
        decodedToken?.roleName ||
        decodedToken?.role ||
        "USER";

      console.log("User ID:", userId);
      console.log("Full Name:", fullName);
      console.log("Username:", username);
      console.log("Role:", role);

      // =========================
      // CLEAR OLD USER DATA
      // =========================

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("fullName");
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      // =========================
      // SAVE NEW LOGIN DATA
      // =========================

      localStorage.setItem("token", token);

      if (userId !== null && userId !== undefined) {
        localStorage.setItem("userId", userId.toString());
      }

      localStorage.setItem("fullName", fullName);
      localStorage.setItem("username", username);
      localStorage.setItem("email", loginData.email);
      localStorage.setItem("phoneNumber", loginData.phoneNumber);
      localStorage.setItem("role", role);

      // =========================
      // REMEMBER USERNAME
      // =========================

      if (rememberMe) {
        localStorage.setItem("rememberedUsername", username);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberMe");
      }

      // =========================
      // SUCCESS
      // =========================

      alert("Login Successful");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login Error:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login Failed";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
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
                  autoComplete="username"
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
                    autoComplete="current-password"
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
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />

                  <span>Remember Me</span>
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
