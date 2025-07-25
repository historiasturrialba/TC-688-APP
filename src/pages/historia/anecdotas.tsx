import { useEffect, useState } from "react";
import data from "./datos-historia/datos-anedotas.json";

interface Anecdota {
  id: number;
  titulo: string;
  descripcion: string;
  fuente?: string;
  lugar?: string;
}

export default function AnecdotasSection() {
  const [anecdotas, setAnecdotas] = useState<Anecdota[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setAnecdotas(data);
  }, []);

  // Calcular los elementos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = anecdotas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(anecdotas.length / itemsPerPage);

  // Cambiar página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full bg-[#f0f9ff] py-12 px-4 flex justify-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          🗣️ Anécdotas de la Comunidad
        </h2>
        
        <div className="space-y-6 mb-8">
          {currentItems.map((anec) => (
            <div
              key={anec.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {anec.titulo}
                {anec.lugar && <span className="text-sm font-normal text-gray-500 ml-2">({anec.lugar})</span>}
              </h3>
              <p className="text-gray-700 mb-2">{anec.descripcion}</p>
              {anec.fuente && <p className="text-sm text-gray-500 italic">Fuente: {anec.fuente}</p>}
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Anterior
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-md ${currentPage === number ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}