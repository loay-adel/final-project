import { Routes, Route } from "react-router-dom";

import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./components/authentucation/authContext";
function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<UserLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
