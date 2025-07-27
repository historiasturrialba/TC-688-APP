import { useState } from "react";
import BackButtonGame from "../../components/origen-de/back-button-game";
import triviaQuestions from "../../data/datos-juego-trivia.json";

// Array de preguntas
const allQuestions = triviaQuestions;

function getRandomQuestions(arr: typeof allQuestions, n: number) {
  // Mezcla el array y toma los primeros n elementos
  return arr
    .map(q => ({ q, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, n)
    .map(({ q }) => q);
}

export default function TriviaPage() {
  const [questions, setQuestions] = useState(() => getRandomQuestions(allQuestions, 7));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOption = (option: string) => {
    setSelected(option);
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setQuestions(getRandomQuestions(allQuestions, 7)); // <-- Selecciona nuevas preguntas aleatorias
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <>
      <div className="fixed top-8 left-16 z-50">
        <BackButtonGame />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="rounded-xl bg-white p-8 shadow-lg w-full max-w-xl relative">
          <h1 className="text-4xl font-bold text-center mb-6">Juego de Trivias</h1>
          {showResult ? (
            <div className="text-center">
              <p className="text-2xl mb-4">¡Terminaste!</p>
              <p className="text-xl mb-6">
                Tu puntaje: <span className="font-bold">{score}</span> de {questions.length}
              </p>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleRestart}
              >
                Jugar de nuevo
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-lg font-semibold mb-4">
                  Pregunta {current + 1} de {questions.length}
                </p>
                <p className="text-xl mb-4">{questions[current].question}</p>
                <div className="grid gap-3">
                  {questions[current].options.map((option) => (
                    <button
                      key={option}
                      className={`px-4 py-2 rounded border text-left transition
                        ${selected
                          ? option === questions[current].answer
                            ? "bg-green-200 border-green-600"
                            : option === selected
                              ? "bg-red-200 border-red-600"
                              : "bg-gray-100 border-gray-300"
                          : "bg-gray-100 border-gray-300 hover:bg-blue-100"
                        }
                      `}
                      disabled={!!selected}
                      onClick={() => handleOption(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              {selected && (
                <>
                  <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-gray-800">
                    <p className="font-semibold mb-2">Explicación:</p>
                    <p>{questions[current].explanation}</p>
                  </div>
                  <button
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    onClick={handleNext}
                  >
                    {current === questions.length - 1 ? "Ver resultado" : "Siguiente"}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}