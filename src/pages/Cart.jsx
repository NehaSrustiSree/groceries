import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();
  const { items, itemCount, totalAmount, increment, decrement } = useCart();

  return (
    <div className="cart-container">
      <h2>Your Cart ({itemCount})</h2>
      {itemCount === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item, idx) => (
              <li key={`${item.id}-${idx}`} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">₹{item.priceNumber.toFixed(2)}</span>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => decrement(item.id)}>-</button>
                  <span className="qty-value">{item.quantity || 1}</span>
                  <button className="qty-btn" onClick={() => increment(item.id)}>+</button>
                </div>
                <div className="cart-item-subtotal">
                  ₹{(item.priceNumber * (item.quantity || 1)).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <div className="cart-total">Total: ₹{totalAmount.toFixed(2)}</div>
            <button className="checkout-btn" onClick={() => navigate("/payments")}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
