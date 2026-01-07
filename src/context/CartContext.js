import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        return prev.map(item =>
          item.id === food.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...food, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty } : item
    ));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
