interface SabiasQueCardProps {
    data: {
      id: number;
      titulo: string;
      descripcion: string;
      imagen: string;
      categoria: string;
    };
  }
  
  export default function SabiasQueCard({ data }: SabiasQueCardProps) {
    return (
      <div className="border rounded shadow p-4 flex flex-col">
        <img
          src={data.imagen}
          alt={data.titulo}
          className="h-40 object-cover rounded mb-4"
        />
        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded self-start mb-2">
          {data.categoria}
        </span>
        <p className="text-gray-800">{data.descripcion}</p>
      </div>
    );
  }
  