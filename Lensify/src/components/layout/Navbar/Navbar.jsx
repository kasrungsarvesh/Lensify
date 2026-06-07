import { useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  

  return (
    <div className="navbar">
    

      <div className="nav-right">
        <input type="text" placeholder="Search..." />
        <div className="profile">SK</div>
        
      </div>
    </div>
  );
};

export default Navbar;