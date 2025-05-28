import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f0f9ff] flex flex-col items-center">
      {/* Hero Banner */}
      <div className="relative w-full max-w-6xl h-[220px] overflow-hidden rounded-b-xl">
        <img
          src="/TCU-688-portada.png"
          alt="Escribimos la historia"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              TC-688: Escribimos la historia de las comunidades de Turrialba
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex justify-center py-12 px-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full justify-items-center">
          {/* Historia Section */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center w-full max-w-sm">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">Historia</h2>
              <p className="text-gray-600 mt-1">Para adultos - Descubre el pasado de Turrialba</p>
            </div>
            <div className="px-6">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img
                  src="/TCU-688-portada.png"
                  alt="Historia de Turrialba"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="mt-6 mb-4 text-gray-700">
                Explora leyendas, anécdotas y el rico patrimonio cultural de nuestras comunidades.
              </p>
              <Link
                to="/historia"
                className="inline-block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 px-4 rounded-md font-medium transition mb-6"
              >
                Explorar Historia
              </Link>
            </div>
          </div>

          {/* Juegos Section */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center w-full max-w-sm">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">Juegos</h2>
              <p className="text-gray-600 mt-1">Para niños - Aprende jugando</p>
            </div>
            <div className="px-6">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img
                  src="/TCU-688-portada.png"
                  alt="Juegos educativos"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 rounded-lg"
                />
              </div>
              <p className="mt-6 mb-4 text-gray-700">
                Diviértete con juegos educativos como trivia, rompecabezas, memoria y más.
              </p>
              <Link
                to="/juegos"
                className="inline-block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 px-4 rounded-md font-medium transition mb-6"
              >
                Jugar Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
