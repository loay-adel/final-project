// src/context/AuthContext.js
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  isAuthenticated,
  logout as authLogout,
  fetchCurrentUser,
} from "./auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const checkAuth = useCallback(async () => {
    try {
      const authenticated = isAuthenticated();
      let user = null;
      if (authenticated) {
        user = await fetchCurrentUser();
      }
      setAuthState({
        isAuthenticated: authenticated,
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
    const handleStorageChange = () => {
      checkAuth();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [checkAuth]);

  const login = useCallback((user) => {
    setAuthState({
      isAuthenticated: true,
      user,
      loading: false,
    });
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
