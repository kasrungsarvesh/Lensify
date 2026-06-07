import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main">

        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <div className="content">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default Layout;