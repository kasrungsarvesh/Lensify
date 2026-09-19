import {
  FaTachometerAlt,
  FaUsers,
  FaFileMedical,
  FaReceipt,
  FaBoxOpen,
  FaUserShield,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "./Sidebar.css";

import { hasPermission } from "../../../config/rolePermissions";

function Sidebar() {
  const navigate = useNavigate();

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    // Remove authentication information
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  // ============================================================
  // MENU ITEMS
  // ============================================================

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
      permission: "dashboard",
    },

    {
      title: "Customers",
      path: "/customers",
      icon: <FaUsers />,
      permission: "customers",
      section: "Customer Management",
    },

    {
      title: "Prescriptions",
      path: "/prescriptions",
      icon: <FaFileMedical />,
      permission: "prescriptions",
      section: "Customer Management",
    },

    {
      title: "Receipts",
      path: "/receipts",
      icon: <FaReceipt />,
      permission: "receipts",
      section: "Billing",
    },

    {
      title: "Products",
      path: "/products",
      icon: <FaBoxOpen />,
      permission: "products",
      section: "Inventory",
    },

    {
      title: "Categories",
      path: "/categories",
      icon: <FaBoxOpen />,
      permission: "categories",
      section: "Inventory",
    },

    {
      title: "Lenses",
      path: "/lenses",
      icon: <FaBoxOpen />,
      permission: "lenses",
      section: "Inventory",
    },

    {
      title: "Users",
      path: "/users",
      icon: <FaUserShield />,
      permission: "users",
      section: "Administration",
    },

    {
      title: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
      permission: "reports",
      section: "Administration",
    },

    {
      title: "Settings",
      path: "/settings",
      icon: <FaCog />,
      permission: "settings",
      section: "Administration",
    },
  ];

  // ============================================================
  // FILTER MENU BASED ON ROLE
  // ============================================================

  const visibleMenuItems = menuItems.filter((item) =>
    hasPermission(item.permission),
  );

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <aside className="sidebar">
      {/* ======================================================
          LOGO
      ====================================================== */}

      <div className="sidebar-logo">
        <h2>Lensify</h2>
      </div>

      {/* ======================================================
          MENU
      ====================================================== */}

      <nav className="sidebar-menu">
        {visibleMenuItems.map((item, index) => {
          // Show section heading only when the section changes
          const previousItem = visibleMenuItems[index - 1];

          const showSection =
            item.section && item.section !== previousItem?.section;

          return (
            <div key={item.path}>
              {/* SECTION TITLE */}

              {showSection && <div className="menu-title">{item.section}</div>}

              {/* MENU ITEM */}

              <NavLink to={item.path} className="menu-item">
                {item.icon}

                <span>{item.title}</span>
              </NavLink>
            </div>
          );
        })}
      </nav>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
