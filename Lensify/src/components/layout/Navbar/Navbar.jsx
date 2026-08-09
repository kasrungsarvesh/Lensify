import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaCog,
} from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const username = localStorage.getItem("username") || "Owner";
  const role = localStorage.getItem("role") || "OWNER";

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

  const displayName = username
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    setShowProfileMenu(false);

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/", { replace: true });
  };

  const handleProfile = () => {
    setShowProfileMenu(false);
    navigate("/profile");
  };

  const handleSettings = () => {
    setShowProfileMenu(false);
    navigate("/settings");
  };

  return (
    <header className="lensify-navbar">
      <div className="lensify-navbar-search">
        <input type="text" placeholder="Search..." aria-label="Search" />
      </div>

      <div className="lensify-navbar-right">
        <button
          type="button"
          className="navbar-notification"
          aria-label="Notifications"
          title="Notifications"
        >
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <div className="lensify-user-container" ref={profileRef}>
          <button
            type="button"
            className="lensify-user"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            aria-expanded={showProfileMenu}
            aria-haspopup="menu"
          >
            <div className="avatar-wrapper">
              <div className="lensify-user-avatar">
                {getInitials(displayName)}
              </div>
              <span className="online-dot"></span>
            </div>

            <div className="lensify-user-details">
              <span className="lensify-user-name">{displayName}</span>
              <span className="lensify-user-role">{role}</span>
            </div>

            <FaChevronDown
              className={`profile-chevron ${showProfileMenu ? "open" : ""}`}
            />
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown" role="menu">
              <div className="dropdown-user-info">
                <div className="dropdown-avatar-wrapper">
                  <div className="dropdown-avatar">
                    {getInitials(displayName)}
                  </div>
                  <span className="dropdown-online-dot"></span>
                </div>

                <div className="dropdown-user-text">
                  <strong>{displayName}</strong>
                  <span>{role}</span>
                  <small>
                    <span className="online-status-dot"></span>
                    Online
                  </small>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <button
                type="button"
                className="profile-option"
                onClick={handleProfile}
                role="menuitem"
              >
                <FaUser />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                className="profile-option"
                onClick={handleSettings}
                role="menuitem"
              >
                <FaCog />
                <span>Account Settings</span>
              </button>

              <div className="dropdown-divider"></div>

              <button
                type="button"
                className="logout-option"
                onClick={handleLogout}
                role="menuitem"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
