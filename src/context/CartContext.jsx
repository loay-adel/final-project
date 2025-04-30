import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  // Helper function to get user ID
  const getUserId = useCallback(() => {
    return localStorage.getItem("userId");
  }, []);

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

  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  // Fetch user data helper
  const fetchUserData = useCallback(async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }, []);

  // Update user data helper
  const updateUserData = useCallback(async (userId, updates) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, updates);
      return true;
    } catch (error) {
      console.error("Error updating user data:", error);
      return false;
    }
  }, []);

  // Fetch all products
  const fetchAllProducts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      const allProducts = Object.values(response.data.categories).flatMap(
        (category) => (Array.isArray(category) ? category : [])
      );
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  // Cart operations with backend sync
  const addToCart = useCallback(
    async (product) => {
      const userId = getUserId();
      if (!userId) {
        console.error("User ID not found");
        return;
      }

      setCart((prevCart) => {
        const existing = prevCart.find((item) => item.id === product.id);
        const newCart = existing
          ? prevCart.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: (item.quantity + 1) * item.price,
                  }
                : item
            )
          : [...prevCart, { ...product, quantity: 1, subtotal: product.price }];

        updateUserData(userId, { cart: newCart });
        return newCart;
      });
    },
    [getUserId, updateUserData]
  );

  const increaseQty = useCallback(
    async (id) => {
      const userId = getUserId();
      if (!userId) return;

      setCart((prevCart) => {
        const newCart = prevCart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        );
        updateUserData(userId, { cart: newCart });
        return newCart;
      });
    },
    [getUserId, updateUserData]
  );

  const decreaseQty = useCallback(
    async (id) => {
      const userId = getUserId();
      if (!userId) return;

      setCart((prevCart) => {
        const newCart = prevCart
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
        updateUserData(userId, { cart: newCart });
        return newCart;
      });
    },
    [getUserId, updateUserData]
  );

  const removeFromCart = useCallback(
    async (id) => {
      const userId = getUserId();
      if (!userId) return;

      setCart((prevCart) => {
        const newCart = prevCart.filter((item) => item.id !== id);
        updateUserData(userId, { cart: newCart });
        return newCart;
      });
    },
    [getUserId, updateUserData]
  );

  const clearCart = useCallback(async () => {
    const userId = getUserId();
    if (!userId) return;

    setCart([]);
    await updateUserData(userId, { cart: [] });
  }, [getUserId, updateUserData]);

  // Wishlist operations
  const addToWishlist = useCallback(
    async (product) => {
      const userId = getUserId();
      if (!userId) {
        console.error("User ID not found");
        return;
      }

      setWishlist((prev) => {
        const newWishlist = prev.includes(product.id)
          ? prev
          : [...prev, product.id];
        updateUserData(userId, { wishlist: newWishlist });
        return newWishlist;
      });
    },
    [getUserId, updateUserData]
  );

  const removeFromWishlist = useCallback(
    async (id) => {
      const userId = getUserId();
      if (!userId) return;

      setWishlist((prev) => {
        const newWishlist = prev.filter((itemId) => itemId !== id);
        updateUserData(userId, { wishlist: newWishlist });
        return newWishlist;
      });
    },
    [getUserId, updateUserData]
  );

  const isInWishlist = useCallback((id) => wishlist.includes(id), [wishlist]);

  const getTotal = useCallback(
    () => cart.reduce((acc, item) => acc + item.subtotal, 0),
    [cart]
  );

  // Initialize user data
  const initializeUserData = useCallback(async () => {
    const userId = getUserId();
    if (!userId) return;

    const userData = await fetchUserData(userId);
    if (userData) {
      setCart(userData.cart || []);
      setWishlist(userData.wishlist || []);
    }
  }, [getUserId, fetchUserData]);

  // Initialize on mount
  useEffect(() => {
    initializeUserData();
    fetchAllProducts();
  }, [initializeUserData, fetchAllProducts]);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      products,
      cartTotal: total,
      cartCount: count,
      wishlistCount,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      setProducts,
      getTotal,
      fetchAllProducts,
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
      fetchAllProducts,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
