import { createContext, useState, useMemo, useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  // Memoized cart calculations
  const { total, count } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.total += item.price * item.quantity;
        acc.count += item.quantity;
        return acc;
      },
      { total: 0, count: 0 }
    );
  }, [cart]);

  // Memoized wishlist count
  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  // Stable callback functions
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        );
      }
      return [
        ...prevCart,
        { ...product, quantity: 1, subtotal: product.price },
      ];
    });
  }, []);

  const increaseQty = useCallback((id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item
      )
    );
  }, []);

  const decreaseQty = useCallback((id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: (item.quantity - 1) * item.price,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Wishlist functions
  const addToWishlist = useCallback((product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id) ? prev : [...prev, product]
    );
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const isInWishlist = useCallback(
    (id) => {
      return wishlist.some((item) => item.id === id);
    },
    [wishlist]
  );

  // New getTotal function
  const getTotal = useCallback(() => {
    return cart.reduce((acc, item) => acc + item.subtotal, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      products,
      cartTotal: total,
      cartCount: count,
      wishlistCount,

      // Cart actions
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,

      // Wishlist actions
      addToWishlist,
      removeFromWishlist,
      isInWishlist,

      // Products
      setProducts,

      // New function
      getTotal,
    }),
    [
      cart,
      wishlist,
      products,
      total,
      count,
      wishlistCount,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      getTotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
