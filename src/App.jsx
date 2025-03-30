import { Routes, Route } from "react-router-dom";

import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import Store from "./context/Store";
import { useEffect, useState } from "react";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [wishListCount, setwishListCount] = useState(0);
  const [products, setproducts] = useState([]);

  return (
    <Store.Provider
      value={{
        cartCount,
        setCartCount,
        wishListCount,
        setwishListCount,
        products,
        setproducts,
      }}
    >
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Store.Provider>
  );
}

export default App;
