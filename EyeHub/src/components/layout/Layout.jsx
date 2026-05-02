import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import "./Layout.css";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;