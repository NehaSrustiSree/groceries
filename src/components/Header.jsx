import React from "react";
import "../styles/Header.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

function Header() {
  const { totalAmount, itemCount } = useCart();
  const navigate = useNavigate();
  const { query, setQuery } = useSearch();
  return (
    <header className="header">
      <h2 className="logo">Grocery Go</h2>
      <input
        type="text"
        placeholder="Search groceries..."
        className="search-bar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="header-actions">
        <div className="cart-pill" onClick={() => navigate("/cart")}>
          <span>Cart</span>
          <strong>({itemCount})</strong>
          <strong>₹{totalAmount.toFixed(2)}</strong>
        </div>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login / Signup
        </button>
      </div>
    </header>
  );
}

export default Header;
