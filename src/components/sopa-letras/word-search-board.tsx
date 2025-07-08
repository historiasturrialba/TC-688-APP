import { useEffect } from "react";
import useWordSearchGenerator, { Cell } from "../../hooks/use-word-search-generator";

const allWords = [
  "GUAYABO",
  "TURRIALBA",
  "TRADICION",
  "HISTORIA",
  "CULTURA",
  "QUESO",
  "COMUNIDAD",
  "VOLCAN",
  "RUINAS",
  "CAFE",
  "NATURALEZA"
];

export default function WordSearchBoard() {
  const {
    board,
    toggleCell,
    foundWords,
    generateBoard,
    currentWords,
  } = useWordSearchGenerator();

  // Generar juego al montar (cargar) el componente
  useEffect(() => {
    const selected = allWords.sort(() => 0.5 - Math.random()).slice(0, 7);
    generateBoard(selected);
  }, []);

  const handleRestart = () => {
    const selected = allWords.sort(() => 0.5 - Math.random()).slice(0, 7);
    generateBoard(selected);
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
