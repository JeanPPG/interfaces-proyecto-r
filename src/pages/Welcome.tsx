import React from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Camera, GamepadIcon } from "lucide-react";
export function Welcome() {
  const navigate = useNavigate();
  return <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Bienvenido a AtentionTrack
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Plataforma de detección de nivel de atención mediante reconocimiento
        facial
      </p>
      <div className="space-y-6 mb-8">
        <FeatureCard icon={<Camera className="w-8 h-8 text-white" />} title="Reconocimiento Facial" description="Análisis en tiempo real del nivel de atención mediante tecnología avanzada" bgColor="bg-gradient-to-r from-blue-500 to-purple-600" />
        <FeatureCard icon={<GamepadIcon className="w-8 h-8 text-white" />} title="Minijuegos" description="Ejercicios interactivos diseñados para evaluar y mejorar tu atención" bgColor="bg-gradient-to-r from-green-500 to-teal-600" />
        <FeatureCard icon={<Brain className="w-8 h-8 text-white" />} title="Test D2R" description="Evaluación estandarizada para medir la atención selectiva" bgColor="bg-gradient-to-r from-orange-500 to-red-600" />
      </div>
      <div className="flex gap-4">
        <button onClick={() => navigate("/register")} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Comenzar Ahora
        </button>
        <button onClick={() => navigate("/login")} className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
          Iniciar Sesión
        </button>
      </div>
    </div>;
}
function FeatureCard({
  icon,
  title,
  description,
  bgColor
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}) {
  return <div className={`${bgColor} p-6 rounded-xl text-white hover:shadow-lg transition-shadow`}>
      <div className="flex items-center gap-6">
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-white/80">{description}</p>
        </div>
      </div>
    </div>;
}