import { useContext, useEffect, useState } from "react";
import {
  FiHome,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import ProductsAdmin from "./ProductsAdmin";
import OrdersPage from "./OrderPage";
import UsersPage from "./UserPage";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./../../../context/CartContext";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { products } = useContext(CartContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/admin-signin");
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_URL}users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      });
  };
  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductsAdmin />;
      case "orders":
        return <OrdersPage />;
      case "users":
        return <UsersPage fetchUsers={fetchUsers} />;

      case "dashboard":
      default:
        if (loading) return <p>Loading users...</p>;
        return (
          <div className="dashboard-content">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Total Products</h3>
                <p className="text-3xl font-bold mt-2">{products.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">New Orders</h3>
                <p className="text-3xl font-bold mt-2">24</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Active Users</h3>
                <p className="text-3xl font-bold mt-2">{users.length}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out 
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  setActiveTab("dashboard");
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 ${
                  activeTab === "dashboard"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <FiHome className="mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("products");
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 ${
                  activeTab === "products"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <FiPackage className="mr-3" />
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("orders");
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 ${
                  activeTab === "orders"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <FiShoppingBag className="mr-3" />
                Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("users");
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 ${
                  activeTab === "users"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <FiUsers className="mr-3" />
                Users
              </button>
            </li>
          </ul>

          <div className="absolute bottom-4 left-0 right-0 px-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-700"
            >
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b shadow-sm">
          <button
            className="p-2 rounded-md lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600">AD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
