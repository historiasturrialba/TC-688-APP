import { useEffect, useState } from "react";
import data from "../../data/datos-leyendas.json";

interface Leyenda {
  id: number;
  titulo: string;
  descripcion: string;
}

interface Personaje {
  nombre: string;
  imagen: string;
  alt: string;
}

export default function LeyendasSection() {
  const [leyendas, setLeyendas] = useState<Leyenda[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Array de personajes disponibles
  const personajes: Personaje[] = [
    { nombre: "Canita", imagen: "/personajes/canita.png", alt: "Canita" },
    {
      nombre: "Don Grano",
      imagen: "/personajes/don-grano.png",
      alt: "Don Grano",
    },
    {
      nombre: "El Coloso",
      imagen: "/personajes/el-coloso.png",
      alt: "El Coloso",
    },
    {
      nombre: "La Queso Porte",
      imagen: "/personajes/la-queso-porte.png",
      alt: "La Queso Porte",
    },
  ];

  // Función para asignar un personaje aleatorio a cada leyenda
  const asignarPersonajeAleatorio = () => {
    const randomIndex = Math.floor(Math.random() * personajes.length);
    return personajes[randomIndex];
  };

  useEffect(() => {
    setLeyendas(data);
  }, []);

  // Calcular los elementos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leyendas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(leyendas.length / itemsPerPage);

  // Cambiar página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div
      className="w-full py-12 px-4 flex justify-center relative"
      style={{ backgroundColor: "#F9F4E1" }}
    >
      {/* Patrón de fondo sutil */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23001E33' fill-opacity='0.06'%3E%3Cpath d='M0 0h50v50H0V0zm50 50h50v50H50V50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              color: "#001E33",
              fontFamily: "serif",
            }}
          >
            👻 Leyendas Populares
          </h2>
          <div
            className="w-24 h-1 mx-auto mb-4"
            style={{ backgroundColor: "#866D4E" }}
          ></div>
          <p className="text-lg" style={{ color: "#866D4E" }}>
            Relatos misteriosos que han perdurado en el tiempo
          </p>
        </div>

        {/* Cards de leyendas */}
        <div className="space-y-6 mb-8">
          {currentItems.map((leyenda) => {
            const personajeAsignado = asignarPersonajeAleatorio();

            return (
              <div
                key={leyenda.id}
                className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl p-6 hover:scale-[1.01] transform relative overflow-hidden"
                style={{
                  backgroundColor: "#F9F4E1",
                  border: `2px solid #866D4E`,
                }}
              >
                {/* Elemento decorativo lateral */}
                <div
                  className="absolute left-0 top-0 h-full w-1"
                  style={{ backgroundColor: "#56915D" }}
                ></div>

                {/* Contenido */}
                <div className="ml-4">
                  {/* Título */}
                  <h3
                    className="text-xl font-bold mb-4 flex items-center"
                    style={{ color: "#001E33" }}
                  >
                    <span className="mr-3 text-2xl">📖</span>
                    {leyenda.titulo}
                  </h3>

                  {/* Personaje y descripción */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Imagen del personaje */}
                    <div className="flex-shrink-0">
                      <img
                        src={personajeAsignado.imagen}
                        alt={personajeAsignado.alt}
                        width={80}
                        height={80}
                        className="rounded-full border-2"
                        style={{ borderColor: "#866D4E" }}
                      />
                    </div>

                    {/* Globo de diálogo con la descripción - Estilo misterioso */}
                    <div className="flex-1 relative">
                      {/* Flecha del globo */}
                      <div
                        className="absolute -left-2 top-4 w-0 h-0"
                        style={{
                          borderTop: "8px solid transparent",
                          borderBottom: "8px solid transparent",
                          borderRight: "12px solid #FFFFFF",
                        }}
                      ></div>

                      {/* Contenido del globo - Tema oscuro para leyendas */}
                      <div
                        className="bg-white rounded-lg p-4 shadow-md border-2"
                        style={{ borderColor: "#866D4E" }}
                      >
                        <div className="relative z-10">
                          <p
                            className="text-base leading-relaxed"
                            style={{ color: "#001E33" }}
                          >
                            "{leyenda.descripcion}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decoración inferior */}
                <div
                  className="mt-4 pt-3 border-t flex justify-end items-center"
                  style={{ borderColor: "#866D4E" }}
                >
                  <div className="flex items-center">
                    <span
                      className="text-xs font-medium mr-2"
                      style={{ color: "#866D4E" }}
                    >
                      Leyenda tradicional
                    </span>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#866D4E" }}
                    >
                      <span className="text-xs" style={{ color: "#F9F4E1" }}>
                        ✨
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "hover:scale-105 shadow-md hover:shadow-lg"
            }`}
            style={{
              backgroundColor: currentPage === 1 ? "#866D4E" : "#001E33",
              color: "#F9F4E1",
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
                backgroundColor: currentPage === number ? "#56915D" : "#866D4E",
                color: "#F9F4E1",
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
                ? "cursor-not-allowed opacity-50"
                : "hover:scale-105 shadow-md hover:shadow-lg"
            }`}
            style={{
              backgroundColor:
                currentPage === totalPages ? "#866D4E" : "#001E33",
              color: "#F9F4E1",
            }}
          >
            Siguiente
          </button>
        </div>

        {/* Elemento decorativo inferior */}
        <div
          className="text-center mt-12 pt-8 border-t-2"
          style={{ borderColor: "#866D4E" }}
        >
          <p className="text-sm italic" style={{ color: "#866D4E" }}>
            "Las leyendas son el alma de los pueblos, contadas de generación en
            generación"
          </p>
        </div>
      </div>
    </div>
  );
}
