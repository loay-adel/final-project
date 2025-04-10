import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      const updated = cart.map((item) =>
        item.id === product.id
          ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.price,
          }
          : item
      );
      setCart(updated);
    } else {
      setCart([
        ...cart,
        { ...product, quantity: 1, subtotal: product.price },
      ]);
    }
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id
        ? {
          ...item,
          quantity: item.quantity + 1,
          subtotal: (item.quantity + 1) * item.price,
        }
        : item
    );
    setCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: (item.quantity - 1) * item.price,
          }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updated);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart, getTotal, getCartCount , clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
