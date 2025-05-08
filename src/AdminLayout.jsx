import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthAdmin";
import Dashboard from "./components/pages/admin-view/Dashboard";
import Error from "./components/pages/error";

function AdminLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Dashboard />
          ) : (
            <Navigate to="/admin-signin" replace />
          )
        }
      />
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AdminLayout;
