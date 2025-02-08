import React, { useState, useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { Camera, GamepadIcon, Brain, XCircle, PlayCircle, Play, Timer, Trophy, X, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
/* =============== MINIJUEGOS =============== */

/* ----- Encuentra el Objeto (FindObjectGame) ----- */

const EMOJIS = ['🍎', '🍌', '🍇', '🍊', '🍐', '🍉', '🍓', '🥝', '🍒', '🥭', '🍍', '🥥'];
const INITIAL_TIME = 30;

interface FindObjectGameProps {
  onComplete: () => void;
}

const FindObjectGame: React.FC<FindObjectGameProps> = ({ onComplete }) => {
  const [playing, setPlaying] = useState(false);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(INITIAL_TIME);
  const [targetObject, setTargetObject] = useState("");
  const [objects, setObjects] = useState<string[]>([]);

  const generateObjects = () => {
    const numObjects = Math.min(level * 5, 20);
    const target = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    setTargetObject(target);

    const newObjects: string[] = [];
    for (let i = 0; i < numObjects - 1; i++) {
      let randomEmoji;
      do {
        randomEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      } while (randomEmoji === target);
      newObjects.push(randomEmoji);
    }
    const insertIndex = Math.floor(Math.random() * numObjects);
    newObjects.splice(insertIndex, 0, target);
    setObjects(newObjects);
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (playing && time > 0) {
      timerInterval = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else if (time === 0 && playing) {
      endGame();
    }
    return () => clearInterval(timerInterval);
  }, [playing, time]);

  const startGame = () => {
    setPlaying(true);
    setLevel(1);
    setScore(0);
    setTime(INITIAL_TIME);
    generateObjects();
  };

  const endGame = () => {
    setPlaying(false);
  };

  const handleClick = (object: string) => {
    if (!playing) return;
    if (object === targetObject) {
      setScore(prev => prev + level * 10);
      setLevel(prev => prev + 1);
      generateObjects();
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
      {playing ? (
        <>
          <div className="flex justify-between mb-2 text-gray-700">
            <div>
              Puntuación: <span className="font-bold">{score}</span>
            </div>
            <div>
              Tiempo: <span className="font-bold">{time}s</span>
            </div>
          </div>
          <div className="mb-2 text-gray-700">
            Encuentra: <span className="text-xl font-bold">{targetObject}</span>
          </div>
          <div className="grid grid-cols-5 gap-2 mb-2">
            {objects.map((object, index) => (
              <motion.div
                key={index}
                className="bg-white p-2 rounded cursor-pointer text-center text-2xl"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleClick(object)}
              >
                {object}
              </motion.div>
            ))}
          </div>
          <div className="text-center text-gray-600">Nivel {level}</div>
        </>
      ) : time === 0 ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="text-xl font-semibold">Puntuación Final: {score}</div>
          <button
            onClick={() => onComplete()}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            <XCircle size={24} /> Cerrar Juego
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={startGame}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            <PlayCircle size={24} /> Iniciar Juego
          </button>
        </div>
      )}
    </div>
  );
};

/* ----- Sigue el Punto (PointGame) ----- */

interface PointGameProps {
  onComplete: () => void;
}

const PointGame: React.FC<PointGameProps> = ({ onComplete }) => {
  const [punto, setPunto] = useState({ x: 50, y: 50 });
  const [puntuacion, setPuntuacion] = useState(0);
  const [fallos, setFallos] = useState(0);
  const [jugando, setJugando] = useState(false);
  const [tiempo, setTiempo] = useState(15);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (jugando) {
      const moverPunto = () => {
        setPunto({
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5,
        });
        const delay = Math.random() * 500 + 500;
        timeoutRef.current = setTimeout(moverPunto, delay);
      };

      moverPunto();

      const tiempoIntervalo = setInterval(() => {
        setTiempo((prev) => {
          if (prev <= 1) {
            clearInterval(tiempoIntervalo);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setJugando(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(tiempoIntervalo);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [jugando]);

  const manejarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!jugando) return;

    setPuntuacion((prev) => prev + 1);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPunto({
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
    });
    const delay = Math.random() * 500 + 500;
    timeoutRef.current = setTimeout(() => {
      setPunto({
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
      });
    }, delay);
  };

  const manejarFallo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (jugando) {
      setFallos((prev) => prev + 1);
      const rect = e.currentTarget.getBoundingClientRect();
      setRipple({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTimeout(() => setRipple(null), 600);
    }
  };

  const reiniciarJuego = () => {
    setTiempo(15);
    setPuntuacion(0);
    setFallos(0);
    onComplete();
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 relative overflow-hidden">
      <div className="relative h-64 w-full bg-white rounded-lg shadow-md overflow-hidden" onClick={manejarFallo}>
        {jugando ? (
          <>
            <motion.div
              className="absolute w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full cursor-pointer"
              style={{
                top: `${punto.y}%`,
                left: `${punto.x}%`,
              }}
              onClick={manejarClick}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              key={`${punto.x}-${punto.y}`}
            >
              <Target size={24} color="#fff" />
            </motion.div>

            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-gray-700">
              <div className="flex items-center gap-1">
                <Trophy size={20} />
                <span>{puntuacion}</span>
                <span className="mx-1">|</span>
                <X size={20} />
                <span>{fallos}</span>
              </div>
              <div className="flex items-center gap-1">
                <Timer size={20} />
                <span>{tiempo}s</span>
              </div>
            </div>

            {ripple && (
              <motion.div
                className="absolute bg-blue-300 rounded-full opacity-50 pointer-events-none"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: 50,
                  height: 50,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </>
        ) : tiempo === 0 ? (
          <motion.div
            className="absolute inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center text-white p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">¡Tiempo terminado!</h2>
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={32} />
              <span className="text-xl">{puntuacion}</span>
            </div>
            <button
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={reiniciarJuego}
            >
              <X size={18} /> Cerrar Juego
            </button>
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setJugando(true);
              }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play size={20} /> Comenzar
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ----- Continuous Performance Game ----- */

interface GameProps {
  onComplete: () => void;
}

const ContinuousPerformanceGame: React.FC<GameProps> = ({ onComplete }) => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showTarget, setShowTarget] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Presiona 'Iniciar Prueba' para comenzar.");

  const startGame = () => {
    setGameStarted(true);
    setMessage("Espera a que aparezca la señal...");
    const delay = Math.random() * 2000 + 2000;
    setTimeout(() => {
      setShowTarget(true);
      setMessage("¡Presiona la señal!");
    }, delay);
  };

  const handleTargetPress = () => {
    setMessage("¡Correcto! Has completado el juego.");
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
      <p className="mb-2 text-gray-700">{message}</p>
      {!gameStarted ? (
        <button
          onClick={startGame}
          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
        >
          Iniciar Prueba
        </button>
      ) : showTarget ? (
        <button
          onClick={handleTargetPress}
          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
        >
          ¡Presiona!
        </button>
      ) : null}
    </div>
  );
};

/* ----- Componente de Minijuegos (MiniGames) ----- */

interface MiniGamesProps {
  onCompleteAll: () => void;
}

const MiniGames: React.FC<MiniGamesProps> = ({ onCompleteAll }) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [completedGames, setCompletedGames] = useState({
    findObject: false,
    pointGame: false,
    continuousPerformance: false,
  });

  const handleGameComplete = (gameId: string) => {
    setCompletedGames((prev) => ({ ...prev, [gameId]: true }));
    setActiveGame(null);
    const allCompleted = Object.values({ ...completedGames, [gameId]: true }).every(v => v);
    if (allCompleted) {
      onCompleteAll();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {/* Encuentra el Objeto */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Encuentra el Objeto</h3>
            {completedGames.findObject ? (
              <span className="text-green-600 font-bold">Completado</span>
            ) : (
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                onClick={() => setActiveGame("findObject")}
              >
                Iniciar
              </button>
            )}
          </div>
          {activeGame === "findObject" && !completedGames.findObject && (
            <FindObjectGame onComplete={() => handleGameComplete("findObject")} />
          )}
        </div>

        {/* Sigue el Punto */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Sigue el Punto</h3>
            {completedGames.pointGame ? (
              <span className="text-green-600 font-bold">Completado</span>
            ) : (
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                onClick={() => setActiveGame("pointGame")}
              >
                Iniciar
              </button>
            )}
          </div>
          {activeGame === "pointGame" && !completedGames.pointGame && (
            <PointGame onComplete={() => handleGameComplete("pointGame")} />
          )}
        </div>

        {/* Continuous Performance */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Continuous Performance</h3>
            {completedGames.continuousPerformance ? (
              <span className="text-green-600 font-bold">Completado</span>
            ) : (
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                onClick={() => setActiveGame("continuousPerformance")}
              >
                Iniciar
              </button>
            )}
          </div>
          {activeGame === "continuousPerformance" && !completedGames.continuousPerformance && (
            <ContinuousPerformanceGame onComplete={() => handleGameComplete("continuousPerformance")} />
          )}
        </div>
      </div>
    </div>
  );
};

/* =============== COMPONENTE PRINCIPAL (TestingArea) =============== */

export function TestingArea() {
  const [cameraActive, setCameraActive] = useState(false);
  const [gamesCompleted, setGamesCompleted] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();

  // Función para activar/desactivar la cámara
  const toggleCamera = useCallback(() => {
    setCameraActive((prev) => !prev);
    setGamesCompleted(false); // Se resetea el estado de los minijuegos al cambiar la cámara
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Área de Pruebas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Sección de la Cámara */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Cámara</h2>
            <button
              onClick={toggleCamera}
              className={`px-4 py-2 rounded-lg transition-colors ${
                cameraActive
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {cameraActive ? "Desactivar" : "Activar"}
            </button>
          </div>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            {cameraActive ? (
              <Webcam
                ref={webcamRef}
                className="w-full h-full object-cover rounded-lg"
                videoConstraints={{ facingMode: "user" }}
              />
            ) : (
              <Camera className="w-12 h-12 text-gray-400" />
            )}
          </div>
        </div>

        {/* Sección de Minijuegos y Test */}
        <div className="space-y-4">
          {/* Aquí se muestran los minijuegos */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <GamepadIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Minijuegos</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Prueba tu atención con juegos interactivos diseñados para medir tu nivel de concentración.
            </p>
            {cameraActive ? (
              <MiniGames onCompleteAll={() => setGamesCompleted(true)} />
            ) : (
              <p className="text-sm text-gray-500">
                Activa la cámara para comenzar los minijuegos.
              </p>
            )}
          </div>

          {/* Test D2R */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Test D2R</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Realiza el test D2R para una evaluación completa de tu atención selectiva y concentración.
            </p>
            <button
              disabled={!gamesCompleted || !cameraActive}
              role="button"
              onClick={() => navigate('/d2r')}
              className={`w-full py-2 px-4 rounded-lg transition-colors ${
                gamesCompleted && cameraActive
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Iniciar Test D2R
            </button>
            {!gamesCompleted ? (
              <p className="text-sm text-gray-500 mt-2">Completa los minijuegos primero.</p>
            ) : !cameraActive ? (
              <p className="text-sm text-gray-500 mt-2">Activa la cámara para iniciar el test.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}