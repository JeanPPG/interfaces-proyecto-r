import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaPlay, FaStop } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

interface D2RTestProps {
  endTest: () => void;
}

const D2RTest: React.FC<D2RTestProps> = ({ endTest }) => {
  // Estados para instrucciones, inicio, resultados y timer
  const [isInstructionsVisible, setIsInstructionsVisible] = useState(true);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [lettersGrid, setLettersGrid] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(420); // 7 minutos = 420 segundos
  const navigate = useNavigate();

  // Función para formatear el tiempo (mm:ss)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Genera la cuadrícula de letras con 14 filas y 57 columnas, con letras en minúsculas
  const generateGrid = () => {
    const rows = 14;
    const cols = 57;
    const totalElements = rows * cols;
    const correctCount = Math.floor(totalElements / 2.22);
    const correctIndices = new Set<number>();

    while (correctIndices.size < correctCount) {
      correctIndices.add(Math.floor(Math.random() * totalElements));
    }

    const grid = Array.from({ length: totalElements }, (_, index) => ({
      value: correctIndices.has(index)
        ? "d''"
        : Math.random() > 0.5
        ? "d'"
        : 'd',
      isCorrect: correctIndices.has(index),
      clicked: false,
    }));

    setLettersGrid(grid);
  };

  // Timer: se decrementa el contador cada segundo
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTestStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleEndTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestStarted, timeLeft]);

  // Al hacer clic en una celda: solo se marca si es correcta y no fue clicada aún
  const handleLetterClick = (index: number) => {
    if (!lettersGrid[index].clicked && lettersGrid[index].isCorrect) {
      const updatedGrid = [...lettersGrid];
      updatedGrid[index].clicked = true;
      setLettersGrid(updatedGrid);
      setScore(prev => prev + 1);
    }
  };

  const handleStartTest = () => {
    generateGrid();
    setIsTestStarted(true);
    setTimeLeft(420);
  };

  const handleEndTest = () => {
    setIsTestStarted(false);
    setIsResultsVisible(true);
  };

  const getLevel = (score: number) => {
    if (score >= 123) return 'Alto';
    if (score >= 108) return 'Medio alto';
    if (score >= 93) return 'Medio';
    if (score >= 78) return 'Medio bajo';
    return 'Bajo';
  };

  const getInterpretations = (score: number) => {
    const level = getLevel(score);
    return {
      level,
      concentration: score >= 93
        ? 'Buena capacidad para mantener la concentración'
        : 'Problemas para mantener la concentración',
      speed: score >= 93
        ? 'Buena velocidad de procesamiento'
        : 'Procesamiento lento',
      precision: score >= 93 ? 'Fue preciso' : 'Gran proporción de errores',
    };
  };

  const interpretations = getInterpretations(score);

  // Función adicional para detener el stream de la cámara.
  const stopCameraStream = () => {
    // Busca el elemento <video> que se haya renderizado (por ejemplo, desde react-webcam)
    const videoElem = document.querySelector('video');
    if (videoElem && videoElem.srcObject) {
      const stream = videoElem.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {isInstructionsVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow-md mb-4"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle /> Instrucciones
          </h2>
          <p className="mt-2">
            Este test consiste en identificar las letras <strong>d''</strong> en un conjunto de estímulos. Haz clic únicamente en las <strong>d''</strong> para obtener puntos.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsInstructionsVisible(false)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <FaPlay className="inline mr-2" /> Continuar
          </motion.button>
        </motion.div>
      )}

      {!isInstructionsVisible && !isTestStarted && !isResultsVisible && (
        <motion.div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartTest}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            <FaPlay className="inline mr-2" /> Iniciar Test
          </motion.button>
        </motion.div>
      )}

      {isTestStarted && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">
              Tiempo restante: {formatTime(timeLeft)}
            </div>
            <div className="text-lg font-semibold">
              Puntuación: {score}
            </div>
          </div>
          {/* Contenedor de la cuadrícula con scroll horizontal para las 57 columnas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto overflow-y-auto gap-1"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(57, 2rem)',
              maxHeight: '100vh'
            }}
          >
            {lettersGrid.map((cell, index) => (
              <motion.div
                key={index}
                onClick={() => handleLetterClick(index)}
                className={`p-1 border text-center text-sm cursor-pointer select-none flex items-center justify-center h-6 ${
                  cell.clicked && cell.isCorrect ? 'bg-green-300' : 'bg-gray-100'
                }`}
              >
                {cell.value}
              </motion.div>
            ))}
          </motion.div>
          <motion.button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEndTest}
          >
            <FaStop className="inline mr-2" /> Finalizar Test
          </motion.button>
        </>
      )}

      {isResultsVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow-md mt-4"
        >
          <h2 className="text-2xl font-bold mb-4">Resultados del Test</h2>
          <p><strong>Nivel:</strong> {interpretations.level}</p>
          <p><strong>Concentración:</strong> {interpretations.concentration}</p>
          <p><strong>Velocidad de Trabajo:</strong> {interpretations.speed}</p>
          <p><strong>Precisión:</strong> {interpretations.precision}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Lógica adicional: detiene el stream de la cámara
              stopCameraStream();
              setIsResultsVisible(false);
              endTest();
              navigate('/dashboard');
            }}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cerrar y volver
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default D2RTest;
