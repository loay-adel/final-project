import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminLogin from "./components/pages/admin-view/AdminLogin";
import Dashboard from "./components/pages/admin-view/Dashboard";
import ProductsAdmin from "./components/pages/admin-view/ProductsAdmin";
import OrdersPage from "./components/pages/admin-view/OrderPage";
import UsersPage from "./components/pages/admin-view/UserPage";
import Error from "./components/pages/error";

function AdminLayout() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const admin = localStorage.getItem("admin");
    if (admin) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <Routes>
      {/* Admin Routes Structure */}
      <Route
        path="/"
        element={
          isAdmin ? <Dashboard /> : <Navigate to="/admin/login" replace />
        }
      >
        {/* Public Login Route */}
        <Route path="login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />

        {/* Protected Admin Subroutes */}
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<ProductsAdmin />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>

      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* Catch-all route */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AdminLayout;
