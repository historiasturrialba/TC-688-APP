import { useState } from "react";
import ChisteCard from "../../components/chistes/chistes-card.tsx";
import chistesData from "../../data/chistes-data";

export default function ChistesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredData =
    selectedCategory === "Todas"
      ? chistesData
      : chistesData.filter((item) => item.categoria === selectedCategory);

  const categoriasUnicas = [
    "Todas",
    ...new Set(chistesData.map((item) => item.categoria)),
  ];

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Chistes de Turrialba</h1>
      <p className="text-center mb-8">
        El humor característico de la región que refleja la idiosincrasia y cultura local.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Cards */}
        <div className="flex-1 space-y-4">
          {filteredData.map((item) => (
            <ChisteCard key={item.id} data={item} />
          ))}

          {filteredData.length === 0 && (
            <p className="text-center text-gray-500">
              No hay chistes disponibles en esta categoría.
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
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
