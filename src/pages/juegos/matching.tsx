import { useEffect, useState, useRef } from "react";
import gameData from "./datos-juegos/datos-juego-matching.json";

type GameItem = {
  id: number;
  type: "imagen" | "nombre";
  content: string;
  alt: string;
  matchId: number;
  matched: boolean;
  position?: { x: number; y: number };
};

type Connection = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  matchId: number;
};

export default function MatchingPage() {
  const [imageItems, setImageItems] = useState<GameItem[]>([]);
  const [nameItems, setNameItems] = useState<GameItem[]>([]);
  const [firstChoice, setFirstChoice] = useState<GameItem | null>(null);
  const [secondChoice, setSecondChoice] = useState<GameItem | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const shuffleItems = () => {
    // Crear items de imágenes (lado izquierdo)
    const images = gameData
      .map((item) => ({
        id: item.id * 2 - 1,
        type: "imagen" as const,
        content: item.imagen,
        alt: item.alt,
        matchId: item.id,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);

    // Crear items de nombres (lado derecho)
    const names = gameData
      .map((item) => ({
        id: item.id * 2,
        type: "nombre" as const,
        content: item.nombre,
        alt: item.alt,
        matchId: item.id,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setImageItems(images);
    setNameItems(names);
    setScore(0);
    setFirstChoice(null);
    setSecondChoice(null);
    setWon(false);
    setDisabled(false);
    setConnections([]);
  };

  useEffect(() => {
    shuffleItems();
  }, []);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);

      // Verificar si los items hacen match
      if (
        firstChoice.matchId === secondChoice.matchId &&
        firstChoice.type !== secondChoice.type
      ) {
        // Obtener posiciones de los elementos
        const firstElement = document.querySelector(
          `[data-item-id="${firstChoice.id}"]`
        ) as HTMLElement;
        const secondElement = document.querySelector(
          `[data-item-id="${secondChoice.id}"]`
        ) as HTMLElement;

        if (firstElement && secondElement && containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const firstRect = firstElement.getBoundingClientRect();
          const secondRect = secondElement.getBoundingClientRect();

          const connection: Connection = {
            from: {
              x:
                firstChoice.type === "imagen"
                  ? firstRect.right - containerRect.left
                  : firstRect.left - containerRect.left,
              y: firstRect.top + firstRect.height / 2 - containerRect.top,
            },
            to: {
              x:
                secondChoice.type === "imagen"
                  ? secondRect.right - containerRect.left
                  : secondRect.left - containerRect.left,
              y: secondRect.top + secondRect.height / 2 - containerRect.top,
            },
            matchId: firstChoice.matchId,
          };

          setConnections((prev) => [...prev, connection]);
        }

        // Marcar items como matched
        setImageItems((prev) =>
          prev.map((item) =>
            item.matchId === firstChoice.matchId
              ? { ...item, matched: true }
              : item
          )
        );
        setNameItems((prev) =>
          prev.map((item) =>
            item.matchId === firstChoice.matchId
              ? { ...item, matched: true }
              : item
          )
        );

        setScore((prev) => prev + 15);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    const allItems = [...imageItems, ...nameItems];
    if (allItems.length > 0 && allItems.every((item) => item.matched)) {
      setWon(true);
    }
  }, [imageItems, nameItems]);

  const handleChoice = (item: GameItem) => {
    if (!disabled && !item.matched && item !== firstChoice) {
      if (firstChoice) {
        setSecondChoice(item);
      } else {
        setFirstChoice(item);
      }
    }
  };

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  const isSelected = (item: GameItem) =>
    item === firstChoice || item === secondChoice;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-yellow-100 via-blue-50 to-green-100 relative">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">
        🎯 Juego de Matching
      </h1>
      <p className="text-center text-lg mb-2 text-gray-700 font-medium">
        Asocia cada imagen con su nombre correspondiente
      </p>
      <p className="text-center text-lg mb-6 text-gray-700 font-medium">
        Puntos: <span className="font-bold text-green-600">{score}</span>
      </p>

      {won && (
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            🎉 ¡Excelente! 🎉
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            ¡Has asociado todas las imágenes correctamente!
          </p>
          <button
            onClick={shuffleItems}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg shadow transition"
          >
            Jugar de nuevo
          </button>
        </div>
      )}

      {/* Contenedor principal del juego */}
      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* SVG para las líneas de conexión */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ minHeight: "500px" }}
        >
          {connections.map((connection, index) => (
            <line
              key={index}
              x1={connection.from.x}
              y1={connection.from.y}
              x2={connection.to.x}
              y2={connection.to.y}
              stroke="#10B981"
              strokeWidth="4"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          ))}
        </svg>

        {/* Grid de dos columnas */}
        <div className="flex justify-between gap-8">
          {/* Columna izquierda - Imágenes */}
          <div className="space-y-4 w-72">
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              🖼️ Imágenes
            </h3>
            {imageItems.map((item, i) => (
              <div
                key={i}
                data-item-id={item.id}
                onClick={() => handleChoice(item)}
                className={`rounded-xl shadow-md p-4 cursor-pointer transition-all duration-200 ${
                  item.matched
                    ? "bg-green-100 border-4 border-green-500"
                    : isSelected(item)
                    ? "bg-blue-100 border-4 border-blue-500 scale-105"
                    : "bg-white border border-gray-300 hover:scale-105 hover:shadow-lg"
                }`}
              >
                <img
                  src={item.content}
                  alt={item.alt}
                  className="w-full h-24 object-contain"
                />
              </div>
            ))}
          </div>

          {/* Columna derecha - Nombres */}
          <div className="space-y-4 w-32">
            <h3 className="text-xl font-bold text-center text-blue-700 mb-4">
              📝 Nombres
            </h3>
            {nameItems.map((item, i) => (
              <div
                key={i}
                data-item-id={item.id}
                onClick={() => handleChoice(item)}
                className={`rounded-xl shadow-md p-4 cursor-pointer transition-all duration-200 flex items-center justify-center h-32 ${
                  item.matched
                    ? "bg-green-100 border-4 border-green-500"
                    : isSelected(item)
                    ? "bg-blue-100 border-4 border-blue-500 scale-105"
                    : "bg-white border border-gray-300 hover:scale-105 hover:shadow-lg"
                }`}
              >
                <span className="text-xl font-semibold text-gray-800">
                  {item.content}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!won && (
        <div className="text-center mt-8">
          <button
            onClick={shuffleItems}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full text-sm shadow transition"
          >
            Reiniciar juego
          </button>
        </div>
      )}
    </div>
  );
}
