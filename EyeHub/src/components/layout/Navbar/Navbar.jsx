import { useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/customers") return "Customers";
    if (location.pathname === "/prescriptions") return "Prescriptions";
    if (location.pathname === "/receipts") return "Receipts";
    if (location.pathname === "/search") return "Search";
  };

  return (
    <div className="navbar">
      <h2>{getTitle()}</h2>

      <div className="nav-right">
        <input type="text" placeholder="Search..." />
        <div className="profile">SK</div>
        
      </div>
    </div>
  );
};

export default Navbar;