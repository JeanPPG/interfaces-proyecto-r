import React, { useEffect, useState, createContext, useContext } from "react";
import { LogOut } from "lucide-react";
interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(atob(storedUser));
    }
  }, []);
  const login = (email: string) => {
    const token = btoa(Date.now().toString());
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", btoa(email));
    setIsAuthenticated(true);
    setUser(email);
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };
  return <AuthContext.Provider value={{
    isAuthenticated,
    user,
    login,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}