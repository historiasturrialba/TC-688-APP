import { useEffect, useState } from "react";
import items from "./datos-juegos/datos-juego-memoria.json";

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
    // Crear las 9 piezas del rompecabezas
    const newPieces: PuzzlePiece[] = [];
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      newPieces.push({
        id: i,
        correctPosition: i,
        currentPosition: i,
        backgroundPosition: `${-col * 64}px ${-row * 64}px`
      });
    }
    
    // Revolver las piezas
    const shuffled = [...newPieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i].currentPosition;
      shuffled[i].currentPosition = shuffled[j].currentPosition;
      shuffled[j].currentPosition = temp;
    }
    
    // Ordenar por posición actual para el renderizado
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
      const isComplete = pieces.every(piece => piece.correctPosition === piece.currentPosition);
      if (isComplete && !won) {
        setWon(true);
        setScore(Math.max(1000 - moves * 10, 100));
      }
    }
  }, [pieces, won, moves]);

  const handleClick = (piece: PuzzlePiece) => {
    if (selectedPiece === null) {
      // Seleccionar la primera pieza
      setSelectedPiece(piece);
    } else if (selectedPiece.id === piece.id) {
      // Deseleccionar si se hace clic en la misma pieza
      setSelectedPiece(null);
    } else {
      // Intercambiar posiciones entre la pieza seleccionada y la nueva pieza
      setPieces(prev => prev.map(p => {
        if (p.id === selectedPiece.id) {
          return { ...p, currentPosition: piece.currentPosition };
        }
        if (p.id === piece.id) {
          return { ...p, currentPosition: selectedPiece.currentPosition };
        }
        return p;
      }));
      setMoves(prev => prev + 1);
      setSelectedPiece(null);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-yellow-100 via-blue-50 to-green-100 relative">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">
        🧩 Juego de Rompecabezas
      </h1>
      
      <div className="text-center mb-6">
        <p className="text-lg mb-2 text-gray-700 font-medium">
          Movimientos: <span className="font-bold text-blue-600">{moves}</span> | 
          Puntos: <span className="font-bold text-green-600">{score}</span>
        </p>
        <button
          onClick={startNewGame}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm shadow transition mr-2"
        >
          Nueva Imagen
        </button>
      </div>

      {won && (
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700 mb-4">🎉 ¡Completaste el rompecabezas! 🎉</h2>
          <button
            onClick={startNewGame}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg shadow transition"
          >
            Jugar de nuevo
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Imagen de referencia */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-4">📸 Imagen de referencia</h3>
            <div className="inline-block bg-white p-4 rounded-xl shadow-lg">
              <img
                src={currentImage.imagen}
                alt={currentImage.alt}
                className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Tablero del rompecabezas */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-4">🧩 Toca las piezas</h3>
            <div className="inline-block bg-white p-4 rounded-xl shadow-lg">
              <div className="grid grid-cols-3 gap-1 w-48 h-48 sm:w-64 sm:h-64">
                {pieces
                  .sort((a, b) => a.currentPosition - b.currentPosition)
                  .map((piece) => (
                    <div
                      key={piece.id}
                      onClick={() => handleClick(piece)}
                      className={`w-14 h-14 sm:w-20 sm:h-20 cursor-pointer border-2 transition-all duration-200 touch-manipulation ${
                        selectedPiece?.id === piece.id
                          ? 'border-blue-500 scale-105 ring-2 ring-blue-300 shadow-lg'
                          : 'border-gray-300 hover:border-blue-400'
                      } ${
                        piece.correctPosition === piece.currentPosition
                          ? 'border-green-400 bg-green-50'
                          : ''
                      }`}
                      style={{
                        backgroundImage: `url(${currentImage.imagen})`,
                        backgroundSize: '192px 192px',
                        backgroundPosition: piece.backgroundPosition,
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Toca una pieza para seleccionarla, luego toca otra para intercambiarlas.
            Las piezas en la posición correcta se mostrarán con borde verde.
          </p>
          {selectedPiece && (
            <p className="text-blue-600 font-medium mt-2">
              Pieza seleccionada - Toca otra pieza para intercambiar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}