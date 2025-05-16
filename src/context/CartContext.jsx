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
  const [user, setUser] = useState(null);
  
  const getUserId = useCallback(() => {
    if (!user || !user._id) {
      return null;
    }
    return user._id;
  }, [user]);

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
      const response = await axios.get(`https://gioco-rx7d.vercel.app/api/users/${userId}`);
       console.log(response.data);
        
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }, []);

  // Update user data helper
  const updateUserData = useCallback(async (userId, updates) => {
    try {
      
      const res = await axios.patch(`https://gioco-rx7d.vercel.app/api/users/${userId}`, updates);
      return true;
    } catch (error) {
      console.error("Error updating user data:", error);
      return false;
    }
  }, []);

  const fetchAllProducts = useCallback(async () => {
    try {
      const response = await axios.get(`https://gioco-rx7d.vercel.app/api/products`);
      const allProducts = response.data;
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const addToCart = useCallback(
  (product) => {
    const userId = getUserId();

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      let newCart;

      if (existing) {
        newCart = prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity += 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1, subtotal: product.price }];
      }
      
      if (userId) {
        updateUserData(userId, { cart: newCart });
      } else {
        localStorage.setItem("guestCart", JSON.stringify(newCart));
      }

      return newCart;
    });
  },
  [getUserId, updateUserData]
);


  const increaseQty = useCallback(
    (id) => {
      const userId = getUserId();
       console.log(id);
        
      setCart((prevCart) => {
        const newCart = prevCart.map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity += 1,
                subtotal: (item.quantity) * item.price,
              }
            : item
        );

        if (userId) {
          updateUserData(userId, { cart: newCart });
        } else {
          localStorage.setItem("guestCart", JSON.stringify(newCart));
        }
        return newCart;
      });
    },
    [getUserId, updateUserData]
  );

  const decreaseQty = useCallback(
    (id) => {
      const userId = getUserId();
      console.log(id);
      
      setCart((prevCart) => {
        const newCart = prevCart
          .map((item) =>
            item._id === id
              ? {
                  ...item,
                  quantity: item.quantity -= 1,
                  subtotal: (item.quantity) * item.price,
                }
              : item
          )
          .filter((item) => item.quantity > 0);

        if (userId) {
          updateUserData(userId, { cart: newCart });
        } else {
          localStorage.setItem("guestCart", JSON.stringify(newCart));
        }
        return newCart;
      });
    },
    [getUserId, updateUserData]
  );

  const removeFromCart = useCallback(
    (id) => {
      const userId = getUserId();
        
      setCart((prevCart) => {
        const newCart = prevCart.filter((item) => item._id !== id);

        if (userId) {
          updateUserData(userId, { cart: newCart });
        } else {
          localStorage.setItem("guestCart", JSON.stringify(newCart));
        }
        return newCart;
      });
    },
    [getUserId, updateUserData]
  );

  const clearCart = useCallback(async () => {
    const userId = getUserId();

    setCart([]);

    if (userId) {
      await updateUserData(userId, { cart: [] });
    } else {
      localStorage.setItem("guestCart", "[]");
    }
  }, [getUserId, updateUserData]);

  // Wishlist operations
  const addToWishlist = useCallback(
    (product) => {
      const userId = getUserId();

      setWishlist((prev) => {
        const newWishlist = prev.includes(product._id)
          ? prev
          : [...prev, product._id];

        if (userId) {
          updateUserData(userId, { wishlist: newWishlist });
        } else {
          localStorage.setItem("guestWishlist", JSON.stringify(newWishlist));
        }
        return newWishlist;
      });
    },
    [getUserId, updateUserData]
  );

  const removeFromWishlist = useCallback(
    (id) => {
      const userId = getUserId();

      setWishlist((prev) => {
        const newWishlist = prev.filter((itemId) => itemId !== id);

        if (userId) {
          updateUserData(userId, { wishlist: newWishlist });
        } else {
          localStorage.setItem("guestWishlist", JSON.stringify(newWishlist));
        }
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

  const initializeUserData = useCallback(async () => {
    const userId = getUserId();

    if (userId) {
      const userData = await fetchUserData(userId);
      if (userData) {
        setCart(userData.cart || []);
        setWishlist(userData.wishlist || []);
      }
    } else {
      // Load guest data from localStorage
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const guestWishlist =
        JSON.parse(localStorage.getItem("guestWishlist")) || [];
      setCart(guestCart);
      setWishlist(guestWishlist);
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
      user,
      setUser,
      fetchUserData,
      setCart,
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
      user,
      setUser,
      fetchUserData,
      setCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};