import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaGamepad, FaImages, FaUserCog } from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-white-600 text-black p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      )}

      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500"
          onClick={toggleSidebar}
        >
          ×
        </button>

        {/* Encabezado del menú */}
        <div className="flex flex-row items-center justify-start w-full py-8 border-b gap-4">
          <img src="/TCU-logo.png" alt="Logo" className="w-16 h-auto" />
          <span className="font-bold text-lg text-black-700">TC-688 Turrialba</span>
        </div>

        <nav className="flex flex-col gap-2 mt-8 px-6">
          <Link
            to="/"
            onClick={toggleSidebar}
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-black-700 font-medium transition"
          >
            <FaHome />
            Inicio
          </Link>
          <Link
            to="/historia"
            onClick={toggleSidebar}
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-black-700 font-medium transition"
          >
            <FaBook />
            Historia
          </Link>
          <Link
            to="/juegos"
            onClick={toggleSidebar}
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-black-700 font-medium transition"
          >
            <FaGamepad />
            Juegos
          </Link>
          <Link
            to="/galeria"
            onClick={toggleSidebar}
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 text-black-700 font-medium transition"
          >
            <FaImages />
            Galería
          </Link>
        </nav>

        {/* Enlace de administración en la parte inferior */}
        <div className="absolute bottom-8 left-0 w-full px-6">
          <Link
            to="/admin"
            onClick={toggleSidebar}
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 text-black-700 font-medium transition"
          >
            <FaUserCog />
            Administración
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;