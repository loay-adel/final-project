import { Routes, Route } from "react-router-dom";

import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
