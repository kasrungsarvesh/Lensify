import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Lensify. All rights reserved.</p>
      <div className="footer-right">
        <span>Version 1.0.0</span>
      </div>
    </footer>
  );
};

export default Footer;