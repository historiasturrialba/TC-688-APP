import { useEffect, useState } from "react";
import items from "../../data/datos-juego-memoria-rompecabezas.json";

type Card = {
  id: number;
  imagen: string;
  alt: string;
  matched: boolean;
  index: number;
};

export default function MemoriaPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [firstChoice, setFirstChoice] = useState<Card | null>(null);
  const [secondChoice, setSecondChoice] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);

  const shuffleCards = () => {
    // Tomar aleatoriamente 6 elementos únicos del arreglo items
    const selectedItems = [...items]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    // Duplicar las 6 cartas seleccionadas para tener pares
    const duplicated = [...selectedItems, ...selectedItems];

    // Mezclar las cartas
    const shuffled = duplicated
      .map((item) => ({
        ...item,
        matched: false,
        index: Math.random(),
      }))
      .sort((a, b) => a.index - b.index);

    // Establecer el nuevo estado del juego
    setCards(shuffled);
    setScore(0);
    setFirstChoice(null);
    setSecondChoice(null);
    setWon(false);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (
        firstChoice.id === secondChoice.id &&
        firstChoice.index !== secondChoice.index
      ) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstChoice.id ? { ...card, matched: true } : card
          )
        );
        setScore((prev) => prev + 10);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWon(true);
    }
  }, [cards]);

  const handleChoice = (card: Card) => {
    if (!disabled && !card.matched && card !== firstChoice) {
      if (firstChoice) {
        setSecondChoice(card);
      } else {
        setFirstChoice(card);
      }
    }
  };

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  const isFlipped = (card: Card) =>
    card === firstChoice || card === secondChoice || card.matched;

  return (
    <div
      className="min-h-screen p-6 relative"
      style={{ backgroundColor: "#F9F4E1" }}
    >
      {/* Patrón de fondo sutil */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23001E33' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-5xl font-bold mb-3"
            style={{
              color: "#001E33",
              fontFamily: "serif",
              textShadow: "2px 2px 4px rgba(0,30,51,0.1)",
            }}
          >
            🧠 Juego de Memoria
          </h1>
          <div
            className="w-24 h-1 mx-auto mb-4"
            style={{ backgroundColor: "#866D4E" }}
          ></div>
          <p className="text-lg" style={{ color: "#866D4E" }}>
            Descubre las historias de Turrialba
          </p>
        </div>

        {/* Score */}
        <div className="text-center mb-8">
          <div
            className="inline-block px-8 py-4 rounded-xl shadow-lg"
            style={{ backgroundColor: "#001E33" }}
          >
            <span className="text-lg font-medium" style={{ color: "#F9F4E1" }}>
              Puntos:
            </span>
            <span
              className="text-2xl font-bold ml-2"
              style={{ color: "#56915D" }}
            >
              {score}
            </span>
          </div>
        </div>

        {/* Win Message */}
        {won && (
          <div className="text-center mb-8">
            <div
              className="inline-block px-8 py-6 rounded-xl shadow-lg"
              style={{ backgroundColor: "#56915D" }}
            >
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: "#F9F4E1" }}
              >
                🎉 ¡Excelente trabajo! 🎉
              </h2>
              <div className="mt-4">
                <img
                  src="/personajes/el-coloso.png"
                  alt="Canita"
                  width={180}
                  height={180}
                  className="mx-auto"
                />
              </div>
              <p className="mb-4" style={{ color: "#F9F4E1" }}>
                Has completado el juego de memoria
              </p>
              <button
                onClick={shuffleCards}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                style={{
                  backgroundColor: "#F9F4E1",
                  color: "#001E33",
                  border: `2px solid #866D4E`,
                }}
              >
                Jugar nuevamente
              </button>
            </div>
          </div>
        )}

        {/* Game Instructions */}
        {!won && cards.length > 0 && (
          <div className="text-center mb-6">
            <p className="text-base" style={{ color: "#866D4E" }}>
              Encuentra las parejas de imágenes de la historia de Turrialba
            </p>
          </div>
        )}

        {/* Game Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <div key={i} className="group">
              <div
                onClick={() => handleChoice(card)}
                className={`
                  relative rounded-xl shadow-lg cursor-pointer transition-all duration-300 
                  transform group-hover:scale-105 aspect-square overflow-hidden
                  ${
                    disabled && !isFlipped(card)
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }
                  ${
                    isFlipped(card)
                      ? "ring-4 ring-green-600"
                      : "hover:shadow-xl"
                  }
                `}
                style={{
                  backgroundColor: isFlipped(card) ? "#F9F4E1" : "#001E33",
                }}
              >
                {isFlipped(card) ? (
                  <div className="p-3 h-full flex flex-col items-center justify-center">
                    <img
                      src={card.imagen}
                      alt={card.alt}
                      className="w-full h-3/4 object-contain rounded-lg mb-2"
                    />
                    <p
                      className="text-xs text-center font-medium"
                      style={{ color: "#866D4E" }}
                    >
                      {card.alt}
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    {/* Icono decorativo */}
                    <div className="mb-2">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z"
                          fill="#F9F4E1"
                          opacity="0.8"
                        />
                      </svg>
                    </div>
                    <span
                      className="text-lg font-bold"
                      style={{ color: "#F9F4E1" }}
                    >
                      ?
                    </span>
                    <div
                      className="mt-2 w-8 h-0.5"
                      style={{ backgroundColor: "#866D4E" }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
