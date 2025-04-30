import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/admin-view/Dashboard";
import ProductControl from "./components/pages/admin-view/ProductsAdmin";

const AdminLayout = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/product" element={ProductControl}></Route>
      {/* <Route path="/admin" element={loggedUser.role == 'admin'?<Dashboard/>:<Home/>}/> */}
    </Routes>
  );
};

export default AdminLayout;
