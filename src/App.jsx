import { Routes, Route } from "react-router-dom";

import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from "./context/AuthAdmin";

function App() {
  return (
    <CartProvider>
        <AdminAuthProvider>
          <Routes>
            <Route path="/*" element={<UserLayout />} />
            <Route path="/admin/*" element={<AdminLayout />} />
          </Routes>
        </AdminAuthProvider>
    </CartProvider>
  );
}

export default App;
