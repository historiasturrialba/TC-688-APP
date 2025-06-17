// export default function TriviaPage() {
//   return (
//     <div className="min-h-screen">
//       <div className="rounded-xl bg-muted/50 p-8">
//         <h1 className="text-4xl font-bold text-center mb-6">Página Trivias</h1>
//         <div className="max-w-4xl mx-auto text-center">
//           <p className="text-lg text-muted-foreground">Aquí va el contenido de la página Trivias</p>
//         </div>
//       </div>
//     </div>
//   )
// }
import { useState } from "react";
import BackButtonGame from "../../components/origen-de/back-button-game";

// Tu array grande de preguntas
const allQuestions = [
  {
    question: "¿Cuál es la capital de Costa Rica?",
    options: ["San José", "Cartago", "Alajuela", "Heredia"],
    answer: "San José"
  },
  {
    question: "¿En qué provincia se encuentra Turrialba?",
    options: ["Cartago", "San José", "Limón", "Puntarenas"],
    answer: "Cartago"
  },
  {
    question: "¿Cuál es el volcán más famoso de Turrialba?",
    options: ["Arenal", "Poás", "Turrialba", "Irazú"],
    answer: "Turrialba"
  },
  {
    question: "¿Cuál es la moneda oficial de Costa Rica?",
    options: ["Peso", "Colón", "Dólar", "Euro"],
    answer: "Colón"
  },
  {
    question: "¿Qué animal es símbolo nacional de Costa Rica?",
    options: ["Jaguar", "Puma", "Venado cola blanca", "Mono"],
    answer: "Venado cola blanca"
  },
  {
    question: "¿Cuál es el árbol nacional de Costa Rica?",
    options: ["Guanacaste", "Corteza Amarilla", "Roble Sabana", "Ciprés"],
    answer: "Guanacaste"
  },
  {
    question: "¿En qué año se abolió el ejército en Costa Rica?",
    options: ["1948", "1821", "1987", "2000"],
    answer: "1948"
  },
  {
    question: "¿Qué río pasa por Turrialba?",
    options: ["Reventazón", "Tempisque", "Sarapiquí", "Grande de Térraba"],
    answer: "Reventazón"
  },
  {
    question: "¿Cuál es el platillo típico hecho a base de maíz en Costa Rica?",
    options: ["Gallo pinto", "Tamales", "Casado", "Olla de carne"],
    answer: "Tamales"
  },
  {
    question: "¿Qué mar baña la costa este de Costa Rica?",
    options: ["Mar Caribe", "Océano Pacífico", "Mar Mediterráneo", "Mar Rojo"],
    answer: "Mar Caribe"
  },
  {
    question: "¿Cuál es el nombre del parque arqueológico cerca de Turrialba famoso por sus esferas?",
    options: ["Guayabo", "Las Baulas", "La Amistad", "Santa Rosa"],
    answer: "Guayabo"
  },
  {
    question: "¿Qué flor es símbolo nacional de Costa Rica?",
    options: ["Guaria Morada", "Rosa", "Orquídea blanca", "Girasol"],
    answer: "Guaria Morada"
  },
  {
    question: "¿Cuál es el lema nacional de Costa Rica?",
    options: ["Pura Vida", "Libertad o Muerte", "Dios, Patria y Libertad", "Viva la Patria"],
    answer: "Pura Vida"
  },
  {
    question: "¿Qué océano está al oeste de Costa Rica?",
    options: ["Océano Atlántico", "Océano Pacífico", "Mar Caribe", "Mar Báltico"],
    answer: "Océano Pacífico"
  },
  {
    question: "¿Cuál es la bebida tradicional hecha de maíz en Costa Rica?",
    options: ["Chicha", "Atole", "Pinolillo", "Café"],
    answer: "Chicha"
  }
];

function getRandomQuestions(arr: typeof allQuestions, n: number) {
  // Mezcla el array y toma los primeros n elementos
  return arr
    .map(q => ({ q, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, n)
    .map(({ q }) => q);
}

export default function TriviaPage() {
  const [questions, setQuestions] = useState(() => getRandomQuestions(allQuestions, 10));
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
    setQuestions(getRandomQuestions(allQuestions, 10)); // <-- Selecciona nuevas preguntas aleatorias
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
              <button
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleNext}
              >
                {current === questions.length - 1 ? "Ver resultado" : "Siguiente"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
}