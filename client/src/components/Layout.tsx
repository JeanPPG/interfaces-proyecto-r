import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, LogIn, UserPlus, Brain, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({
  children
}: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isAuthenticated,
    user,
    logout
  } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return <div className="min-h-screen bg-gray-50 flex">
      <nav className="bg-white w-64 border-r border-gray-200 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">AtentionTrack</h1>
        </div>
        <div className="space-y-2 flex-1">
          <button onClick={() => navigate("/")} className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-300 hover:scale-105 ${isActive("/") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}>
            <Home className="w-5 h-5" />
            Inicio
          </button>
          {!isAuthenticated ? <>
              <button onClick={() => navigate("/login")} className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-300 hover:scale-105 ${isActive("/login") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}>
                <LogIn className="w-5 h-5" />
                Iniciar Sesión
              </button>
              <button onClick={() => navigate("/register")} className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-300 hover:scale-105 ${isActive("/register") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}>
                <UserPlus className="w-5 h-5" />
                Registro
              </button>
            </> : <button onClick={() => navigate("/testing")} className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-300 hover:scale-105 ${isActive("/testing") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}>
              <Brain className="w-5 h-5" />
              Área de Pruebas
            </button>}
        </div>
        {isAuthenticated && <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="text-sm text-gray-600 mb-2">{user}</div>
            <button onClick={handleLogout} className="w-full flex items-center gap-2 p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-105">
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>}
      </nav>
      <main className="flex-1 p-8">{children}</main>
    </div>;
}