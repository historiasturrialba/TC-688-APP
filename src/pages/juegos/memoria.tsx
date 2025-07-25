import { useEffect, useState } from "react";
import items from "./datos-juegos/datos-juego-memoria-rompecabezas.json";

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
    // Tomar aleatoriamente 5 elementos únicos del arreglo items
    const selectedItems = [...items]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    // Duplicar las 5 cartas seleccionadas para tener pares
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
    <div className="min-h-screen p-6 bg-gradient-to-b from-yellow-100 via-blue-50 to-green-100 relative">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">
        🧠 Juego de Memoria
      </h1>
      <p className="text-center text-lg mb-6 text-gray-700 font-medium">
        Puntos: <span className="font-bold text-green-600">{score}</span>
      </p>

      {won && (
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            🎉 ¡Ganaste! 🎉
          </h2>
          <button
            onClick={shuffleCards}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg shadow transition"
          >
            Jugar de nuevo
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => handleChoice(card)}
            className={`rounded-xl shadow-md p-2 cursor-pointer bg-white hover:scale-105 transition-transform duration-200 ${
              isFlipped(card)
                ? "border-4 border-green-400"
                : "border border-gray-300"
            }`}
          >
            {isFlipped(card) ? (
              <img
                src={card.imagen}
                alt={card.alt}
                className="w-full h-32 object-contain"
              />
            ) : (
              <div className="w-full h-32 bg-green-400 rounded flex items-center justify-center">
                <span className="text-white text-3xl font-bold">?</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
