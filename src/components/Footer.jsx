import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3>Grocery Store</h3>
          <p>Freshness at your doorstep.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Orders</li>
            <li>Payments</li>
            <li>Cart</li>
            <li>Profile</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@grocery.com</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Grocery Store | All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
