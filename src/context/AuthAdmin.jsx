import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
