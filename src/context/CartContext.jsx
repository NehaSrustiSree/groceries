import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext({
  items: [],
  itemCount: 0,
  totalAmount: 0,
  addToCart: () => {},
  increment: () => {},
  decrement: () => {},
  getItemQuantity: () => 0,
});

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === product.id);
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: (copy[existingIndex].quantity || 1) + 1,
        };
        return copy;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increment = (productId) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: (p.quantity || 1) + 1 } : p
      )
    );
  };

  const decrement = (productId) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === productId ? { ...p, quantity: Math.max((p.quantity || 1) - 1, 0) } : p
        )
        .filter((p) => (p.quantity || 0) > 0)
    );
  };

  const totalAmount = useMemo(() => {
    return items.reduce((sum, p) => sum + (p.priceNumber || 0) * (p.quantity || 1), 0);
  }, [items]);
  const itemCount = items.reduce((sum, p) => sum + (p.quantity || 1), 0);

  const getItemQuantity = (productId) => {
    const item = items.find((p) => p.id === productId);
    return item ? item.quantity || 0 : 0;
  };

  const value = useMemo(
    () => ({ items, itemCount, totalAmount, addToCart, increment, decrement, getItemQuantity }),
    [items, itemCount, totalAmount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}


