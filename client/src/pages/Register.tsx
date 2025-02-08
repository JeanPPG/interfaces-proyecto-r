import React from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
export function Register() {
  const navigate = useNavigate();
  return <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <UserPlus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Crear Cuenta</h1>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo
          </label>
          <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Juan Pérez" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico
          </label>
          <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="tu@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="********" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Contraseña
          </label>
          <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="********" />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Registrarse
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
          Inicia Sesión
        </button>
      </p>
    </div>;
}