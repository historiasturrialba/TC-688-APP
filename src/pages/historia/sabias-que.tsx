import { useState } from "react";
import SabiasQueCard from "../../components/sabias-que/sabias-que-card.tsx";
import categoriasData from "../../data/sabias-que-data.ts";

export default function SabiasQuePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredData =
    selectedCategory === "Todas"
      ? categoriasData
      : categoriasData.filter((item) => item.categoria === selectedCategory);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const categoriasUnicas = [
    "Todas",
    ...new Set(categoriasData.map((item) => item.categoria)),
  ];

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Sabías que...</h1>
      <p className="text-center mb-8">
        Datos curiosos e interesantes sobre Turrialba y sus alrededores que quizás no conocías.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 flex-1">
          {currentItems.map((item) => (
            <SabiasQueCard key={item.id} data={item} />
          ))}

          {currentItems.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No hay datos disponibles en esta categoría.
            </p>
          )}
        </div>

        {/* Sidebar de categorías */}
        <div className="w-full md:w-64">
          <h3 className="text-lg font-semibold mb-2">Categorías</h3>
          <ul className="space-y-1">
            {categoriasUnicas.map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer px-3 py-1 rounded ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-1">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
