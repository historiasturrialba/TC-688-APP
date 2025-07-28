import { useEffect, useState } from "react";
import items from "../../data/datos-juego-memoria-rompecabezas.json";

type PuzzlePiece = {
  id: number;
  correctPosition: number;
  currentPosition: number;
  backgroundPosition: string;
};

export default function RompecabezasPage() {
  const [currentImage, setCurrentImage] = useState(items[0]);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<PuzzlePiece | null>(null);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const initializePuzzle = () => {
    const newPieces: PuzzlePiece[] = [];
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      newPieces.push({
        id: i,
        correctPosition: i,
        currentPosition: i,
        backgroundPosition: `${-col * 128}px ${-row * 128}px`,
      });
    }

    const shuffled = [...newPieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i].currentPosition;
      shuffled[i].currentPosition = shuffled[j].currentPosition;
      shuffled[j].currentPosition = temp;
    }

    shuffled.sort((a, b) => a.currentPosition - b.currentPosition);

    setPieces(shuffled);
    setScore(0);
    setWon(false);
    setMoves(0);
    setSelectedPiece(null);
  };

  const selectRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setCurrentImage(items[randomIndex]);
  };

  const startNewGame = () => {
    selectRandomImage();
    setTimeout(initializePuzzle, 100);
  };

  useEffect(() => {
    selectRandomImage();
  }, []);

  useEffect(() => {
    initializePuzzle();
  }, [currentImage]);

  useEffect(() => {
    if (pieces.length > 0) {
      const isComplete = pieces.every(
        (piece) => piece.correctPosition === piece.currentPosition
      );
      if (isComplete && !won) {
        setWon(true);
        setScore(Math.max(1000 - moves * 10, 100));
      }
    }
  }, [pieces, won, moves]);

  const handleClick = (piece: PuzzlePiece) => {
    if (selectedPiece === null) {
      setSelectedPiece(piece);
    } else if (selectedPiece.id === piece.id) {
      setSelectedPiece(null);
    } else {
      setPieces((prev) =>
        prev.map((p) => {
          if (p.id === selectedPiece.id) {
            return { ...p, currentPosition: piece.currentPosition };
          }
          if (p.id === piece.id) {
            return { ...p, currentPosition: selectedPiece.currentPosition };
          }
          return p;
        })
      );
      setMoves((prev) => prev + 1);
      setSelectedPiece(null);
    }
  };

  return (
    <div className="min-h-screen p-6 relative" style={{ backgroundColor: "#F9F4E1" }}>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23001E33' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="relative z-10">
        <h1
          className="text-5xl font-bold mb-3 text-center"
          style={{
            color: "#001E33",
            fontFamily: "serif",
            textShadow: "2px 2px 4px rgba(0,30,51,0.1)",
          }}
        >
          🧩 Juego Rompecabezas
        </h1>
        <div className="w-24 h-1 mx-auto mb-4" style={{ backgroundColor: "#866D4E" }}></div>
        <div className="text-center mb-6">
          <p className="text-lg mb-2 font-medium" style={{ color: "#866D4E" }}>
            Movimientos:{" "}
            <span className="font-bold" style={{ color: "#001E33" }}>
              {moves}
            </span>{" "}
            | Puntos:{" "}
            <span className="font-bold" style={{ color: "#56915D" }}>
              {score}
            </span>
          </p>
          <button
            onClick={startNewGame}
            className="px-5 py-2 rounded-full text-sm shadow transition hover:scale-105 mr-2"
            style={{
              backgroundColor: "#866D4E",
              color: "#F9F4E1",
            }}
          >
            Nueva Imagen
          </button>
        </div>

        {won && (
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#56915D" }}>
              🎉 ¡Completaste el rompecabezas! 🎉
            </h2>
            <div className="mt-4">
              <img
                src="/personajes/don-grano.png"
                alt="Canita"
                width={180}
                height={180}
                className="mx-auto"
              />
            </div>
            <button
              onClick={startNewGame}
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

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4" style={{ color: "#001E33" }}>
                📸 Imagen de referencia
              </h3>
              <div
                className="inline-block p-4 rounded-xl shadow-lg"
                style={{
                  backgroundColor: "#F9F4E1",
                  border: `2px solid #866D4E`,
                }}
              >
                <img
                  src={currentImage.imagen}
                  alt={currentImage.alt}
                  className="w-96 h-96 object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-4" style={{ color: "#001E33" }}>
                🧩 Toca las piezas
              </h3>
              <div
                className="inline-block p-4 rounded-xl shadow-lg"
                style={{
                  backgroundColor: "#F9F4E1",
                  border: `2px solid #866D4E`,
                }}
              >
                <div className="grid grid-cols-3 gap-1 w-[384px] h-[384px]">
                  {pieces
                    .sort((a, b) => a.currentPosition - b.currentPosition)
                    .map((piece) => (
                      <div
                        key={piece.id}
                        onClick={() => handleClick(piece)}
                        className="w-32 h-32 cursor-pointer border-2 transition-all duration-200 touch-manipulation"
                        style={{
                          backgroundImage: `url(${currentImage.imagen})`,
                          backgroundSize: "384px 384px",
                          backgroundPosition: piece.backgroundPosition,
                          backgroundRepeat: "no-repeat",
                          borderColor:
                            selectedPiece?.id === piece.id
                              ? "#001E33"
                              : piece.correctPosition === piece.currentPosition
                              ? "#56915D"
                              : "#866D4E",
                          borderWidth: selectedPiece?.id === piece.id ? "3px" : "5px",
                          transform:
                            selectedPiece?.id === piece.id ? "scale(1.05)" : "scale(1)",
                          boxShadow:
                            selectedPiece?.id === piece.id
                              ? "0 4px 12px rgba(0,30,51,0.3)"
                              : piece.correctPosition === piece.currentPosition
                              ? "0 2px 8px rgba(86,145,93,0.3)"
                              : "none",
                          backgroundColor:
                            piece.correctPosition === piece.currentPosition
                              ? "rgba(86,145,93,0.1)"
                              : "transparent",
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm max-w-md mx-auto" style={{ color: "#866D4E" }}>
              Toca una pieza para seleccionarla, luego toca otra para intercambiarlas. Las piezas en
              la posición correcta se mostrarán con borde verde.
            </p>
            {selectedPiece && (
              <p className="font-medium mt-2" style={{ color: "#001E33" }}>
                Pieza seleccionada - Toca otra pieza para intercambiar
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
