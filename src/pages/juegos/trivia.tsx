import { useState } from "react";
import BackButtonGame from "../../components/origen-de/back-button-game";
import triviaQuestions from "../../data/datos-juego-trivia.json";
import personajes from "../../data/personajes.json";

const allQuestions = triviaQuestions;

function getRandomQuestions(arr: typeof allQuestions, n: number) {
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
  const [personajeActual, setPersonajeActual] = useState(personajes[0]);

  const handleOption = (option: string) => {
    setSelected(option);
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    // Selecciona un personaje aleatorio
    const randomIndex = Math.floor(Math.random() * personajes.length);
    setPersonajeActual(personajes[randomIndex]);
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
    setQuestions(getRandomQuestions(allQuestions, 7));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <>
      <div className="fixed top-8 right-16 z-50">
        <BackButtonGame />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coconut-cream via-white to-coconut-cream/50 text-hemlock">
        <div className="rounded-xl bg-white p-8 shadow-lg w-full max-w-xl relative">
          <h1 className="text-4xl font-bold text-center mb-6 text-blue-950">Juego de Trivias</h1>
          {showResult ? (
            <div className="text-center">
              <p className="text-2xl mb-4 text-[#866d4e]">
                {score >= 5 ? "¡Felicidades!" : "¡Suerte en la próxima!"}
              </p>
              <p className="text-xl mb-6 text-[#866d4e]">
                Tu puntaje: <span className="font-bold text-[#866d4e]">{score}</span> de {questions.length}
              </p>
              {/* Mostrar todos los personajes */}
              <div className="flex flex-wrap justify-center gap-4 my-6">
                {personajes.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Personaje ${idx + 1}`}
                    className="w-28 h-28 object-contain drop-shadow-lg"
                  />
                ))}
              </div>
              <button
                className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                onClick={handleRestart}
              >
                Jugar de nuevo
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-lg font-bold mb-4 text-[#866d4e] text-center">
                  Pregunta {current + 1} de {questions.length}
                </p>
                <p className="text-xl mb-4 text-[#866d4e] text-center">{questions[current].question}</p>
                <div className="grid gap-3">
                  {questions[current].options.map((option) => (
                    <button
                      key={option}
                      className={`px-4 py-2 rounded border text-left transition
                        ${selected
                          ? option === questions[current].answer
                            ? "bg-green-200 border-green-600 text-green-700"
                            : option === selected
                              ? "bg-red-200 border-red-600 text-red-700"
                              : "bg-gray-100 border-gray-300 text-[#866d4e]"
                          : "bg-gray-100 border-gray-300 hover:bg-blue-100 text-[#866d4e]"
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
                  <div className="flex flex-row items-start justify-center mt-4 gap-4">
                    <img
                      src={personajeActual}
                      alt="Personaje"
                      className="w-40 h-40 object-contain mt-2 drop-shadow-lg transition-all duration-300"
                      style={{ zIndex: 10 }}
                    />                  
                      <div
                        className="p-6 border border-blue-950 rounded-2xl text-[#565b3e] text-center shadow-md min-w-[260px] max-w-[420px]"
                        style={{ backgroundColor: "#f9f4e1" }}
                      >
                        <p>{questions[current].explanation}</p>
                      </div>
                    </div>
                  <div className="flex justify-center">
                    <button
                      className="mt-6 bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                      onClick={handleNext}
                    >
                      {current === questions.length - 1 ? "Ver resultado" : "Siguiente"}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}