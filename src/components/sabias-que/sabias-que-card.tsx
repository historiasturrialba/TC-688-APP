interface SabiasQueCardProps {
  data: {
    id: number;
    titulo: string;
    descripcion: string;
    categoria: string;
  };
}

export default function SabiasQueCard({ data }: SabiasQueCardProps) {
  return (
    <article className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 flex flex-col hover:scale-[1.03] hover:shadow-lg transition-transform">
      <div className="flex items-center mb-3 space-x-3">
        <span className="inline-block px-3 py-1 rounded-full bg-[#B06C44] text-white font-semibold text-sm tracking-wide">
          {data.categoria}
        </span>
      </div>
      <h3 className="text-[#001E33] font-serif text-xl mb-2">{data.titulo}</h3>
      <p className="text-[#86704E] text-base leading-relaxed">{data.descripcion}</p>
    </article>
  );
}
