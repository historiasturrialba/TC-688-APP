import { Calendar, UserRound, Tags } from "lucide-react";

interface Personaje {
  id: number;
  nombre: string;
  categoria: string;
  fotoUrl: string | string[];
  descripcion: string;
  año?: string;
  labor?: string;
}

interface PersonajeCardProps {
  data: Personaje;
}

export default function PersonajeCard({ data }: PersonajeCardProps) {
  const imagenes = Array.isArray(data.fotoUrl) ? data.fotoUrl : [data.fotoUrl];

  return (
    <article
      className="flex flex-col lg:flex-row gap-6 rounded-2xl p-6 border border-white/50 bg-white/80 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02]"
      style={{ color: "rgb(0,30,51)" }}
    >
      <div
        className={`flex ${imagenes.length === 2 ? "gap-4" : ""} justify-center`}
      >
        {imagenes.map((src, index) => (
          <div
            key={index}
            className="w-64 h-64 rounded-xl overflow-hidden border border-white/40 shadow-inner"
          >
            <img
              src={src}
              alt={`Foto de ${data.nombre}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between flex-1 mt-4 lg:mt-0 gap-2">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-serif font-bold text-midnight">{data.nombre}</h2>
            <span
              className="flex items-center gap-2 bg-desert-clay text-coconut-cream text-sm font-medium px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgb(176,108,68)",
                color: "rgb(249,244,225)",
              }}
            >
              <Tags size={16} />
              {data.categoria}
            </span>
          </div>

          {data.labor && (
            <p
              className="flex items-center gap-2 italic text-base mb-1"
              style={{ color: "rgb(134,109,78)" }}
            >
              <UserRound size={18} /> {data.labor}
            </p>
          )}

          {data.año && (
            <p
              className="flex items-center gap-2 text-sm font-medium mb-2"
              style={{ color: "rgb(176,108,68)" }}
            >
              <Calendar size={18} /> {data.año}
            </p>
          )}

          <p className="text-[15px] leading-relaxed" style={{ whiteSpace: "pre-line" }}>
            {data.descripcion}
          </p>
        </div>
      </div>
    </article>
  );
}
