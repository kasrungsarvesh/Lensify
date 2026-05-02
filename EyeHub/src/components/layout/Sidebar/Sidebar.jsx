import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">EyeHub</h2>

      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/customers">Customers</NavLink>
        <NavLink to="/prescriptions">Prescriptions</NavLink>
        <NavLink to="/receipts">Receipts</NavLink>
        <NavLink to="/search">Search</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;