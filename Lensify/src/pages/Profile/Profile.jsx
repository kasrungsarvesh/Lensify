import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaShieldAlt,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

import api from "../../api/axios";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  // =========================
  // USER INFORMATION
  // =========================

  const userId = localStorage.getItem("userId");
  const fullName = localStorage.getItem("fullName") || "User";
  const username = localStorage.getItem("username") || "user";
  const email = localStorage.getItem("email") || "";
  const phoneNumber = localStorage.getItem("phoneNumber") || "";
  const role = localStorage.getItem("role") || "USER";

  // =========================
  // PASSWORD VISIBILITY
  // =========================

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // =========================
  // PASSWORD FORM
  // =========================

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changingPassword, setChangingPassword] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState({
    type: "",
    text: "",
  });

  // =========================
  // INITIALS
  // =========================

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // =========================
  // DISPLAY ROLE
  // =========================

  const displayRole = role
    .replace("ROLE_", "")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  // =========================
  // PASSWORD INPUT CHANGE
  // =========================

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });

    setPasswordMessage({
      type: "",
      text: "",
    });
  };

  // =========================
  // CHANGE PASSWORD
  // =========================

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setPasswordMessage({
      type: "",
      text: "",
    });

    // Current password validation
    if (!passwordData.currentPassword.trim()) {
      setPasswordMessage({
        type: "error",
        text: "Please enter your current password.",
      });
      return;
    }

    // New password validation
    if (!passwordData.newPassword.trim()) {
      setPasswordMessage({
        type: "error",
        text: "Please enter a new password.",
      });
      return;
    }

    // Minimum password length
    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({
        type: "error",
        text: "New password must contain at least 6 characters.",
      });
      return;
    }

    // Confirm password
    if (!passwordData.confirmPassword.trim()) {
      setPasswordMessage({
        type: "error",
        text: "Please confirm your new password.",
      });
      return;
    }

    // Password matching
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "New password and confirm password do not match.",
      });
      return;
    }

    // Prevent same password
    if (passwordData.currentPassword === passwordData.newPassword) {
      setPasswordMessage({
        type: "error",
        text: "New password must be different from your current password.",
      });
      return;
    }

    try {
      setChangingPassword(true);

      // =========================
      // NEW CHANGE PASSWORD API
      // =========================

      const response = await api.put("/auth/change-password", {
        currentPassword: passwordData.currentPassword,

        newPassword: passwordData.newPassword,
      });

      // =========================
      // SUCCESS
      // =========================

      setPasswordMessage({
        type: "success",
        text: response.data?.message || "Password changed successfully.",
      });

      // Clear form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Hide password fields
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      console.error("Change password error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to change password. Please try again.";

      setPasswordMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setChangingPassword(false);
    }
  };

  // =========================
  // CLEAR PASSWORD FORM
  // =========================

  const handleClearPassword = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage({
      type: "",
      text: "",
    });

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="profile-page">
      {/* =========================
          HEADER
      ========================= */}

      <div className="profile-page-header">
        <div>
          <div className="profile-breadcrumb">Account / Profile</div>

          <h1>My Profile</h1>

          <p>Manage your personal information and account security.</p>
        </div>

        <button
          type="button"
          className="profile-back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      {/* =========================
          PROFILE HERO
      ========================= */}

      <div className="profile-hero">
        <div className="profile-avatar-large">{getInitials(fullName)}</div>

        <div className="profile-hero-info">
          <h2>{fullName}</h2>

          <p className="profile-username">@{username}</p>

          <div className="profile-meta">
            <span className="profile-role">{displayRole}</span>

            <span className="profile-online">
              <span></span>
              Active Account
            </span>
          </div>
        </div>

        <div className="profile-id">
          <span>User ID</span>

          <strong>#{userId || "N/A"}</strong>
        </div>
      </div>

      {/* =========================
          MAIN GRID
      ========================= */}

      <div className="profile-grid">
        {/* PERSONAL INFORMATION */}

        <section className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-icon">
              <FaUser />
            </div>

            <div>
              <h3>Personal Information</h3>

              <p>Your account details</p>
            </div>
          </div>

          <div className="profile-info-grid">
            <div className="profile-info-item">
              <span>Full Name</span>

              <strong>{fullName}</strong>
            </div>

            <div className="profile-info-item">
              <span>Username</span>

              <strong>{username}</strong>
            </div>

            <div className="profile-info-item">
              <span>Email</span>

              <strong>{email || "Not available"}</strong>
            </div>

            <div className="profile-info-item">
              <span>Phone Number</span>

              <strong>{phoneNumber || "Not available"}</strong>
            </div>
          </div>
        </section>

        {/* ACCOUNT INFORMATION */}

        <section className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-icon security">
              <FaShieldAlt />
            </div>

            <div>
              <h3>Account Information</h3>

              <p>Your Lensify access</p>
            </div>
          </div>

          <div className="account-info-list">
            <div className="account-info-row">
              <span>Role</span>

              <strong className="role-badge">{displayRole}</strong>
            </div>

            <div className="account-info-row">
              <span>Account Status</span>

              <strong className="status-active">
                <FaCheckCircle />
                Active
              </strong>
            </div>

            <div className="account-info-row">
              <span>Authentication</span>

              <strong>JWT Secure</strong>
            </div>
          </div>
        </section>
      </div>

      {/* =========================
          CHANGE PASSWORD
      ========================= */}

      <section className="profile-card password-card">
        <div className="profile-card-header">
          <div className="profile-card-icon password">
            <FaKey />
          </div>

          <div>
            <h3>Change Password</h3>

            <p>Update your password to keep your account secure.</p>
          </div>
        </div>

        <form className="password-form" onSubmit={handleChangePassword}>
          {/* CURRENT PASSWORD */}

          <div className="password-input-group">
            <label>Current Password</label>

            <div className="password-input-wrapper">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                aria-label={
                  showCurrentPassword
                    ? "Hide current password"
                    : "Show current password"
                }
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* NEW PASSWORD */}

          <div className="password-input-group">
            <label>New Password</label>

            <div className="password-input-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={
                  showNewPassword ? "Hide new password" : "Show new password"
                }
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}

          <div className="password-input-group">
            <label>Confirm New Password</label>

            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* MESSAGE */}

          {passwordMessage.text && (
            <div className={`password-message ${passwordMessage.type}`}>
              {passwordMessage.text}
            </div>
          )}

          {/* ACTIONS */}

          <div className="password-actions">
            <button
              type="button"
              className="cancel-password-btn"
              onClick={handleClearPassword}
              disabled={changingPassword}
            >
              Clear
            </button>

            <button
              type="submit"
              className="change-password-btn"
              disabled={changingPassword}
            >
              <FaKey />

              {changingPassword ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Profile;
