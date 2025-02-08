import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
export function Login() {
  const navigate = useNavigate();
  const {
    login
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (email === "test@example.com" && password === "123456") {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        login(email);
        navigate("/testing");
      } else {
        setError("Credenciales incorrectas");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <LogIn className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h1>
      </div>
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="font-semibold text-blue-800 mb-2">
          Credenciales de prueba:
        </h2>
        <p className="text-blue-600">Email: test@example.com</p>
        <p className="text-blue-600">Contraseña: 123456</p>
      </div>
      {error && <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200 flex items-center gap-2 text-red-600 animate-shake">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico
          </label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" placeholder="tu@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" placeholder="********" />
        </div>
        <button type="submit" disabled={isLoading} className={`w-full py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"} text-white`}>
          {isLoading ? <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
            </span> : "Iniciar Sesión"}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        ¿No tienes una cuenta?{" "}
        <button onClick={() => navigate("/register")} className="text-blue-600 hover:underline transition-all duration-300">
          Regístrate
        </button>
      </p>
    </div>;
}