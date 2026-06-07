import {
  FaTachometerAlt,
  FaUsers,
  FaFileMedical,
  FaCalendarAlt,
  FaReceipt,
  FaBoxOpen,
  FaUserShield,
  FaChartBar,
  FaSearch,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";



function Sidebar() {
const navigate = useNavigate();

const handleLogout = () => {
  navigate("/");
};

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Lensify</h2>
      </div>

      <nav className="sidebar-menu">

        <NavLink to="/dashboard" className="menu-item">
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <div className="menu-title">
          Customer Management
        </div>

        <NavLink to="/customers" className="menu-item">
          <FaUsers />
          <span>Customers</span>
        </NavLink>

        <NavLink to="/prescriptions" className="menu-item">
          <FaFileMedical />
          <span>Prescriptions</span>
        </NavLink>

        <NavLink to="/appointments" className="menu-item">
          <FaCalendarAlt />
          <span>Appointments</span>
        </NavLink>

        <div className="menu-title">
          Billing
        </div>

        <NavLink to="/receipts" className="menu-item">
          <FaReceipt />
          <span>Receipts</span>
        </NavLink>

        <div className="menu-title">
          Inventory
        </div>

        <NavLink to="/products" className="menu-item">
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink to="/categories" className="menu-item">
          <FaBoxOpen />
          <span>Categories</span>
        </NavLink>

        <div className="menu-title">
          Administration
        </div>

        <NavLink to="/users" className="menu-item">
          <FaUserShield />
          <span>Users</span>
        </NavLink>

        <NavLink to="/reports" className="menu-item">
          <FaChartBar />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/search" className="menu-item">
          <FaSearch />
          <span>Search</span>
        </NavLink>

        <NavLink to="/settings" className="menu-item">
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
        
      </div>
    </aside>
  );
}

export default Sidebar;