import { Link } from "react-router-dom";
import WordSearchBoard from "../../components/sopa-letras/word-search-board";

export default function SopaLetrasPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-center mb-4">
        <Link
          to="/juegos"
          className="text-blue-500 hover:underline flex items-center"
        >
          <span className="mr-2">←</span> Volver a Juegos
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-6">Sopa de Letras</h1>

      <WordSearchBoard />
    </div>
  );
}
