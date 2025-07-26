import { useEffect, useState } from "react";
import data from "../../data/datos-anedotas.json";

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
    <div className="w-full py-12 px-4 flex justify-center relative" style={{ backgroundColor: '#F9F4E1' }}>
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-5" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23001E33' fill-opacity='0.06'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
           }}>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" 
              style={{ 
                color: '#001E33',
                fontFamily: 'serif'
              }}>
            🗣️ Anécdotas de la Comunidad
          </h2>
          <div className="w-24 h-1 mx-auto mb-4" style={{ backgroundColor: '#866D4E' }}></div>
          <p className="text-lg" style={{ color: '#866D4E' }}>
            Historias y vivencias que forjan nuestra identidad
          </p>
        </div>
        
        {/* Cards de anécdotas */}
        <div className="space-y-6 mb-8">
          {currentItems.map((anec) => (
            <div
              key={anec.id}
              className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6 hover:scale-[1.02] transform"
              style={{ 
                backgroundColor: '#F9F4E1',
                border: `2px solid #866D4E`
              }}
            >
              {/* Título y lugar */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold flex-1" style={{ color: '#001E33' }}>
                  {anec.titulo}
                </h3>
                {anec.lugar && (
                  <span className="text-sm font-medium px-3 py-1 rounded-full ml-3" 
                        style={{ 
                          backgroundColor: '#866D4E',
                          color: '#F9F4E1'
                        }}>
                    📍 {anec.lugar}
                  </span>
                )}
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <p className="text-base leading-relaxed" style={{ color: '#001E33' }}>
                  {anec.descripcion}
                </p>
              </div>

              {/* Fuente */}
              {anec.fuente && (
                <div className="pt-3 border-t" style={{ borderColor: '#866D4E' }}>
                  <div className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#866D4E"/>
                    </svg>
                    <p className="text-sm italic" style={{ color: '#866D4E' }}>
                      Fuente: {anec.fuente}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === 1 
                ? 'cursor-not-allowed opacity-50' 
                : 'hover:scale-105 shadow-md hover:shadow-lg'
            }`}
            style={{
              backgroundColor: currentPage === 1 ? '#866D4E' : '#001E33',
              color: '#F9F4E1'
            }}
          >
            Anterior
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              style={{
                backgroundColor: currentPage === number ? '#56915D' : '#866D4E',
                color: '#F9F4E1'
              }}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === totalPages 
                ? 'cursor-not-allowed opacity-50' 
                : 'hover:scale-105 shadow-md hover:shadow-lg'
            }`}
            style={{
              backgroundColor: currentPage === totalPages ? '#866D4E' : '#001E33',
              color: '#F9F4E1'
            }}
          >
            Siguiente
          </button>
        </div>

        {/* Elemento decorativo inferior */}
        <div className="text-center mt-12 pt-8 border-t-2" style={{ borderColor: '#866D4E' }}>
          <p className="text-sm italic" style={{ color: '#866D4E' }}>
            "Cada anécdota es un hilo en el tejido de nuestra historia comunitaria"
          </p>
        </div>
      </div>
    </div>
  );
}