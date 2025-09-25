import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { itemCount } = useCart();
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/payments">Payments</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li>
          <Link to="/cart">Cart{itemCount > 0 ? ` (${itemCount})` : ""}</Link>
        </li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
