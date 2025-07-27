import { useState } from "react";
import SabiasQueCard from "../../components/sabias-que/sabias-que-card";
import sabiasQueData from "../../data/sabias-que-data";

export default function SabiasQuePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const filteredData =
    selectedCategory === "Todas"
      ? sabiasQueData
      : sabiasQueData.filter((item) => item.categoria === selectedCategory);

  const categoriasUnicas = [
    "Todas",
    ...new Set(sabiasQueData.map((item) => item.categoria)),
  ];

  return (
    <div
      className="min-h-screen py-12 px-6 relative flex justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top right, rgba(176,108,68,0.15), transparent 70%)," +
          "radial-gradient(circle at bottom left, rgba(0,30,51,0.1), transparent 70%)," +
          "rgb(249,244,225)",
      }}
    >
      <div className="max-w-6xl w-full relative z-10">
        <h1 className="text-4xl font-bold text-center mb-4 text-midnight">
          Sabías que…
        </h1>
        <p
          className="text-center mb-12 max-w-3xl mx-auto leading-relaxed text-lg"
          style={{ color: "rgb(134,109,78)" }}
        >
          Datos curiosos e interesantes sobre Mora y su historia que quizás no conocías.
        </p>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-8">
            {filteredData.length > 0 ? (
              filteredData.map((item) => <SabiasQueCard key={item.id} data={item} />)
            ) : (
              <p className="text-center text-sm" style={{ color: "rgb(176,108,68)" }}>
                No hay datos disponibles en esta categoría.
              </p>
            )}
          </div>

          <aside
            className="w-full md:w-64 rounded-xl p-6 flex flex-col items-center shadow-lg"
            style={{
              backgroundColor: "rgb(176,108,68)",
              color: "rgb(249,244,225)",
            }}
          >
            <h3 className="text-xl font-semibold mb-5">Categorías</h3>
            <ul className="w-full space-y-3">
              {categoriasUnicas.map((cat) => {
                const selected = selectedCategory === cat;
                return (
                  <li
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`cursor-pointer text-center py-2 rounded-lg font-medium transition-colors select-none ${
                      selected
                        ? "bg-coconut-cream text-midnight shadow"
                        : "hover:bg-shadow hover:text-coconut-cream"
                    }`}
                    style={{
                      backgroundColor: selected ? "rgb(249,244,225)" : "transparent",
                      color: selected ? "rgb(0,30,51)" : "rgb(249,244,225)",
                    }}
                  >
                    {cat}
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
