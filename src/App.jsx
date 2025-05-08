import { Routes, Route } from "react-router-dom";

import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./components/authentucation/authContext";
import { AdminAuthProvider } from "./context/AuthAdmin";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <Routes>
            <Route path="/*" element={<UserLayout />} />
            <Route path="/admin/*" element={<AdminLayout />} />
          </Routes>
        </AdminAuthProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
