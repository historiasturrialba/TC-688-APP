import { useEffect, useState } from "react";
import useWordSearchGenerator, { Cell } from "../../hooks/use-word-search-generator";
import Image from "next/image";

const allWords = [
  "CAÑA",
  "CAFÉ",
  "LA ZOILA",
  "PLAZA",
  "LOS MILLER",
  "BENEFICIO",
  "INDÍGENAS",
  "ASENTAMIENTOS",
  "INVU",
  "LA ISABEL",
  "FÚTBOL",
  "ESCUELA",
  "DR. VALERIANO",
  "FIESTAS PATRONALES",
  "IGLESIA",
  "POZAS",
  "EL MORA",
  "TURRIALBA",
  "BUEYES",
  "CARRETA",
  "CONJUNTOS",
  "CENTENARIO",
  "LEYENDAS",
];

export default function WordSearchBoard() {
  const {
    board,
    toggleCell,
    foundWords,
    generateBoard,
    currentWords,
  } = useWordSearchGenerator();

  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    const selected = allWords.sort(() => 0.5 - Math.random()).slice(0, 7);
    generateBoard(selected);
  }, []);

  useEffect(() => {
    if (
      currentWords.length > 0 &&
      foundWords.length === currentWords.length
    ) {
      setGameFinished(true);
    } else {
      setGameFinished(false);
    }
  }, [foundWords, currentWords]);

  const handleRestart = () => {
    const selected = allWords.sort(() => 0.5 - Math.random()).slice(0, 7);
    generateBoard(selected);
    setGameFinished(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4">
      <div>
        <div
          className="grid gap-1 border p-2"
          style={{ gridTemplateColumns: `repeat(12, minmax(0, 2.5rem))` }}
        >
          {board.map((row: Cell[], rIdx) =>
            row.map((cell: Cell, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                onClick={() => toggleCell(rIdx, cIdx)}
                className={`w-10 h-10 flex items-center justify-center border text-base font-semibold rounded cursor-pointer
                ${
                  cell.selected
                    ? cell.partOfWord
                      ? "bg-green-400 text-white"
                      : "bg-yellow-300"
                    : "bg-white"
                } ${cell.blocked ? "cursor-not-allowed" : ""}`}
              >
                {cell.letter}
              </div>
            ))
          )}
        </div>

        <button
          onClick={handleRestart}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Reiniciar Juego
        </button>

        {gameFinished && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded text-center">
            <p className="text-lg font-semibold text-green-800 mb-2">
              ¡Felicidades! Has encontrado todas las palabras. 🎉
            </p>
            <p className="text-sm text-green-700">
              Si deseas jugar de nuevo, presiona el botón de reiniciar.
            </p>
            <div className="mt-4">
              <img
                src="/personajes/canita.png"
                alt="Canita"
                width={180}
                height={180}
                className="mx-auto"
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 border rounded p-4 w-full max-w-xs">
        <h3 className="font-semibold mb-2">Palabras</h3>
        <ul className="space-y-1">
          {currentWords.map((word) => (
            <li
              key={word}
              className={`${
                foundWords.includes(word)
                  ? "text-green-600 line-through"
                  : "text-gray-800"
              } font-medium`}
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
