interface ChisteCardProps {
    data: {
      id: number;
      autor: string;
      categoria: string;
      contenido: string;
    };
  }
  
  export default function ChisteCard({ data }: ChisteCardProps) {
    return (
      <div className="border rounded shadow p-4 flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          {/* Icono de persona genérico */}
          <span className="text-xl">👤</span>
        </div>
  
        <div>
          <h4 className="font-semibold">{data.autor}</h4>
          <p className="text-sm text-gray-500 mb-2">Categoría: {data.categoria}</p>
          <p className="text-gray-800 whitespace-pre-line">{data.contenido}</p>
        </div>
      </div>
    );
  }
  