import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthAdmin";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/users/login`, {
        email,
        password,
      });

      const token = res.data.data.data; // token
      const decoded = parseJwt(token); // custom function below

      if (decoded?.role !== "admin") {
        throw new Error("Access denied. Not an admin.");
      }

      localStorage.setItem("admin_token", token); // optional
      setIsAuthenticated(true);
      toast.success("Welcome, admin!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials or not an admin.");
    } finally {
      setLoading(false);
    }
  };

  // helper to decode JWT (optional but useful)
  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
