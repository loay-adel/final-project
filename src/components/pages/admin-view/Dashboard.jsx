import { Outlet, Link, useNavigate } from "react-router-dom";
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
import { useState } from "react";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
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
              <Link
                to="/admin"
                end
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <FiHome className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <FiPackage className="mr-3" />
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <FiShoppingBag className="mr-3" />
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <FiUsers className="mr-3" />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <FiSettings className="mr-3" />
                Settings
              </Link>
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
