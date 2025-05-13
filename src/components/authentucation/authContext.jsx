import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const BASE_URL = import.meta.env.VITE_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  // Utility to handle API responses
  const handleResponse = async (response) => {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }
    return response.json();
  };

  // Signup function
  const signup = async (userData) => {
    try {
      // Check if user already exists by email
      const usersResponse = await fetch(
        `${BASE_URL}/users?email=${userData.email}`
      );
      const existingUsers = await handleResponse(usersResponse);

      if (existingUsers.length > 0) {
        throw new Error("User with this email already exists");
      }

      // Since there's no backend, we'll store the password as plain text (not recommended for production)
      const newUser = { ...userData };

      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const createdUser = await handleResponse(response);

      // Store user ID in localStorage
      localStorage.setItem("userId", createdUser.id);

      // Update auth state
      setAuthState({
        isAuthenticated: true,
        user: {
          id: createdUser.id,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          email: createdUser.email,
        },
        loading: false,
      });

      return createdUser;
    } catch (error) {
      throw error;
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users?email=${credentials.email}`
      );
      const users = await handleResponse(response);

      if (users.length === 0) {
        throw new Error("User not found");
      }

      const user = users[0]; // Assuming emails are unique
      if (user.password !== credentials.password) {
        throw new Error("Invalid password");
      }

      // Store user ID in localStorage
      localStorage.setItem("userId", user.id);

      // Update auth state
      setAuthState({
        isAuthenticated: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        loading: false,
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  // Fetch current user
  const fetchCurrentUser = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return null;

    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`);
      const user = await handleResponse(response);
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout(); // Auto-logout if user can't be fetched
      return null;
    }
  };

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("userId");
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  }, []);

  // Check authentication status on mount
  const checkAuth = useCallback(async () => {
    try {
      const userId = localStorage.getItem("userId");
      let user = null;
      if (userId) {
        user = await fetchCurrentUser();
        if (!user) {
          throw new Error("User not found");
        }
      }
      setAuthState({
        isAuthenticated: !!user,
        user,
        loading: false,
      });
    } catch (error) {
      console.error("Auth check failed:", error);
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    }
  }, []);

  useEffect(() => {
    checkAuth();
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ ...authState, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
