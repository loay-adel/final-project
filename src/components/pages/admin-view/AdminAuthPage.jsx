import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";

export default function AdminAuthPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Fetch users from JSON server
      const res = await fetch("http://localhost:5000/users");
      const users = await res.json();

      // Find admin user with matching credentials
      const admin = users.find(
        (user) =>
          user.email === email &&
          user.password === password && // Note: In production, compare hashed passwords
          user.role === "admin"
      );

      if (admin) {
        onLogin(); // Notify parent component
        localStorage.setItem("admin", JSON.stringify(admin)); // Store admin data
        navigate("/admin"); // Redirect to admin dashboard
      } else {
        setError("Invalid credentials or not an admin");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error connecting to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Typography variant="h4" className="font-bold text-gray-900">
            Admin Portal
          </Typography>
          <Typography color="gray" className="mt-2">
            Please enter admin credentials
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="email"
              label="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              size="lg"
            />
          </div>

          <div>
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              size="lg"
            />
          </div>

          {error && (
            <Typography color="red" className="text-sm text-center">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            className="flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Continue to Admin Dashboard"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
