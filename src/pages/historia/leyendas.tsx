import { useEffect, useState } from "react";
import data from "./datos-historia/datos-leyendas.json";

interface Leyenda {
  id: number;
  titulo: string;
  descripcion: string;
}

export default function LeyendasSection() {
  const [leyendas, setLeyendas] = useState<Leyenda[]>([]);

  useEffect(() => {
    setLeyendas(data);
  }, []);

  return (
    <div className="w-full bg-[#f0f9ff] py-12 px-4 flex justify-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">
          👻 Leyendas Populares
        </h2>
        <div className="space-y-6">
          {leyendas.map((leyenda) => (
            <div
              key={leyenda.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {leyenda.titulo}
              </h3>
              <p className="text-gray-700">{leyenda.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}