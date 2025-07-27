import { useEffect, useState, useRef } from "react";
import gameData from "../../data/datos-juego-matching.json";

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
    // Seleccionar solo 5 items aleatorios del conjunto de datos
    const selectedItems = gameData
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    // Crear items de imágenes (lado izquierdo)
    const images = selectedItems
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
    const names = selectedItems
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
    <div
      className="min-h-screen p-6 relative"
      style={{ backgroundColor: "#F9F4E1" }}
    >
      {/* Patrón de fondo sutil */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23001E33' fill-opacity='0.08'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1
            className="text-5xl font-bold mb-3"
            style={{
              color: "#001E33",
              fontFamily: "serif",
              textShadow: "2px 2px 4px rgba(0,30,51,0.1)",
            }}
          >
            🎯 Juego de Matching
          </h1>
          <div className="w-24 h-1 mx-auto mb-4" style={{ backgroundColor: '#866D4E' }}></div>
          <p className="text-lg mb-2" style={{ color: "#866D4E" }}>
            Asocia cada imagen con su nombre correspondiente
          </p>
        </div>

        {/* Score */}
        <div className="text-center mb-6">
          <p className="text-lg font-medium" style={{ color: "#866D4E" }}>
            Puntos:{" "}
            <span className="font-bold" style={{ color: "#56915D" }}>
              {score}
            </span>
          </p>
        </div>

        {/* Win Message */}
        {won && (
          <div className="text-center mb-6">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#56915D" }}
            >
              🎉 ¡Excelente! 🎉
            </h2>
            <p className="text-lg mb-4" style={{ color: "#866D4E" }}>
              ¡Has asociado todas las imágenes correctamente!
            </p>
            <button
              onClick={shuffleItems}
              className="px-5 py-3 rounded-full text-lg shadow transition hover:scale-105"
              style={{
                backgroundColor: "#001E33",
                color: "#F9F4E1",
              }}
            >
              Jugar de nuevo
            </button>
          </div>
        )}

        {/* Game Instructions */}
        {!won && (
          <div className="text-center mb-6">
            <p className="text-base" style={{ color: "#866D4E" }}>
              Haz clic en una imagen y luego en su nombre correspondiente
            </p>
          </div>
        )}

        {/* Contenedor principal del juego */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* SVG para las líneas de conexión */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ minHeight: "600px" }}
          >
            {connections.map((connection, index) => (
              <line
                key={index}
                x1={connection.from.x}
                y1={connection.from.y}
                x2={connection.to.x}
                y2={connection.to.y}
                stroke="#56915D"
                strokeWidth="4"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            ))}
          </svg>

          {/* Grid de dos columnas */}
          <div className="flex justify-between gap-12">
            {/* Columna izquierda - Imágenes (más grande) */}
            <div className="space-y-5 w-80">
              <h3
                className="text-xl font-bold mb-6 text-center"
                style={{ color: "#001E33" }}
              >
                🖼️ Imágenes
              </h3>
              {imageItems.map((item, i) => (
                <div
                  key={i}
                  data-item-id={item.id}
                  onClick={() => handleChoice(item)}
                  className="rounded-xl shadow-md p-5 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: item.matched
                      ? "#56915D"
                      : isSelected(item)
                      ? "#866D4E"
                      : "#F9F4E1",
                    border: `4px solid ${
                      item.matched
                        ? "#001E33"
                        : isSelected(item)
                        ? "#001E33"
                        : "#866D4E"
                    }`,
                  }}
                >
                  <img
                    src={item.content}
                    alt={item.alt}
                    className="w-full h-32 object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Columna derecha - Nombres (más espacio y mejor centrado) */}
            <div className="space-y-5 w-48">
              <h3
                className="text-xl font-bold text-center mb-6"
                style={{ color: "#001E33" }}
              >
                📝 Nombres
              </h3>
              {nameItems.map((item, i) => (
                <div
                  key={i}
                  data-item-id={item.id}
                  onClick={() => handleChoice(item)}
                  className="rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 flex items-center justify-center h-40 hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: item.matched
                      ? "#56915D"
                      : isSelected(item)
                      ? "#866D4E"
                      : "#F9F4E1",
                    border: `4px solid ${
                      item.matched
                        ? "#001E33"
                        : isSelected(item)
                        ? "#001E33"
                        : "#866D4E"
                    }`,
                  }}
                >
                  <span
                    className="text-xl font-semibold text-center leading-relaxed"
                    style={{
                      color:
                        item.matched || isSelected(item)
                          ? "#F9F4E1"
                          : "#001E33",
                    }}
                  >
                    {item.content}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reset button */}
        {!won && (
          <div className="text-center mt-8">
            <button
              onClick={shuffleItems}
              className="px-4 py-2 rounded-full text-sm shadow transition hover:scale-105"
              style={{
                backgroundColor: "#866D4E",
                color: "#F9F4E1",
              }}
            >
              Reiniciar juego
            </button>
          </div>
        )}
      </div>
    </div>
  );
}