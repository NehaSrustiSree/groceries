import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/Payments.css";

function Payments() {
  const { items, totalAmount } = useCart();
  return (
    <div className="payments-container">
      <h2>Checkout</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {items.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <ul>
            {items.map((item, idx) => (
              <li key={`${item.id}-${idx}`}>
                {item.name} x {item.quantity || 1} — ₹{(item.priceNumber * (item.quantity || 1)).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <div className="summary-total">Total: ₹{totalAmount.toFixed(2)}</div>
      </div>

      <h3>Payment Method</h3>
      <div className="payment-methods">
        <button className="payment-btn">UPI</button>
        <button className="payment-btn">Credit/Debit Card</button>
        <button className="payment-btn">Cash on Delivery</button>
      </div>

      <form className="payment-form">
        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="ZIP Code" />
        <button type="button" className="confirm-btn">Confirm and Pay</button>
      </form>
    </div>
  );
}

export default Payments;


