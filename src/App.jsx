import { Routes, Route } from "react-router-dom";

import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import Store from "./context/Store";
import { useState } from "react";
import { CartProvider } from "./context/CartContext";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [wishListCount, setwishListCount] = useState(0);
  const [products, setproducts] = useState([]);
  const [headerCart, setheaderCart] = useState([]);
  return (
    <CartProvider>
    <Store.Provider
      value={{
        cartCount,
        setCartCount,
        wishListCount,
        setwishListCount,
        products,
        setproducts,
        headerCart,
        setheaderCart,
      }}
    >
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Store.Provider>
    </CartProvider>
  );
}

export default App;
