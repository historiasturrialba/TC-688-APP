import { useEffect, useState } from "react";
import data from "./datos-historia/datos-anedotas.json";

interface Anecdota {
  id: number;
  titulo: string;
  descripcion: string;
}

export default function AnecdotasSection() {
  const [anecdotas, setAnecdotas] = useState<Anecdota[]>([]);

  useEffect(() => {
    setAnecdotas(data);
  }, []);

  return (
    <div className="w-full bg-[#f0f9ff] py-12 px-4 flex justify-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          🗣️ Anécdotas de la Comunidad
        </h2>
        <div className="space-y-6">
          {anecdotas.map((anec) => (
            <div
              key={anec.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {anec.titulo}
              </h3>
              <p className="text-gray-700">{anec.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}