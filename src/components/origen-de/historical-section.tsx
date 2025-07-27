import { ScrollText, Users, Calendar, MapPin, Hash } from "lucide-react"
import type { HistoricalSectionType } from "../../lib/types"

interface HistoricalSectionProps {
  title: string
  content: string[]
  image?: HistoricalSectionType["image"]
  sources?: string[]
  index?: number
}

export default function HistoricalSection({
  title,
  content,
  image,
  sources,
  index = 0,
}: HistoricalSectionProps) {
  const versionIcons = [
    { icon: MapPin, color: "text-hemlock" },
    { icon: Calendar, color: "text-shadow" },
    { icon: ScrollText, color: "text-midnight" },
    { icon: Users, color: "text-hemlock" },
    { icon: Hash, color: "text-shadow" },
    { icon: MapPin, color: "text-midnight" },
  ]

  const IconComponent = versionIcons[index % versionIcons.length].icon
  const iconColor = versionIcons[index % versionIcons.length].color

  // Alternar personajes
  const personajes = [
    { src: "/personajes/canita.png", alt: "Cañita" },
    { src: "/personajes/don-grano.png", alt: "Don Grano" },
    { src: "/personajes/el-coloso.png", alt: "El Coloso" },
    { src: "/personajes/la-queso-porte.png", alt: "La Queso Porte" },
  ]
  const personaje = personajes[index % personajes.length]

  return (
    <section className="group relative">
      {/* Línea decorativa */}
      <div className="absolute -left-4 top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-1 h-full bg-gradient-to-b from-hemlock/50 to-transparent rounded-full"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/90 relative overflow-hidden">

        {/* Header con ícono */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br from-white to-coconut-cream shadow-md ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-midnight leading-tight">{title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-0.5 w-12 bg-gradient-to-r from-hemlock/50 to-transparent rounded-full"></div>
              <span className="text-xs text-shadow/60 uppercase tracking-wider">Versión {index + 1}</span>
            </div>
          </div>
        </div>

        {/* Imagen top */}
        {image?.position === "top" && (
          <div className="relative w-full h-64 md:h-80 mb-6 overflow-hidden rounded-xl shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/10 to-transparent z-10"></div>
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="object-cover w-full h-full absolute top-0 left-0 transition-transform duration-700 group-hover:scale-105" />
          </div>
        )}

        {/* Globo de diálogo con el primer párrafo */}
        <div className="relative mb-6 pl-24">
          <div className="bg-white border border-black/10 text-gray-800 p-4 rounded-lg shadow-md relative max-w-xl">
            <p className="leading-snug text-shadow/90">{content[0]}</p>
            <div className="absolute -left-3 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white"></div>
          </div>
          {/* Personaje abajo a la izquierda */}
          <img
            src={personaje.src}
            alt={personaje.alt}
            className="absolute -bottom-4 left-0 w-20 h-20 object-contain drop-shadow-md pointer-events-none"
          />
        </div>

        {/* Resto del contenido */}
        <div className="space-y-4">
          {content.slice(1).map((paragraph, idx) => (
            <p
              key={idx}
              className="text-shadow/90 leading-relaxed text-justify relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-hemlock/30 before:rounded-full"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Imagen bottom */}
        {image?.position === "bottom" && (
          <div className="relative w-full h-64 md:h-80 mt-6 overflow-hidden rounded-xl shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/10 to-transparent z-10"></div>
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="object-cover w-full h-full absolute top-0 left-0 transition-transform duration-700 group-hover:scale-105" />
          </div>
        )}

        {/* Fuentes */}
        {sources?.length ? (
          <div className="mt-8 pt-6 border-t-2 border-dashed border-hemlock/20">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-hemlock" />
              <h3 className="text-sm font-semibold text-hemlock uppercase tracking-wider">
                Fuentes consultadas
              </h3>
            </div>
            <div className="bg-gradient-to-r from-coconut-cream/50 to-transparent p-4 rounded-lg">
              <p className="text-sm text-shadow/70 leading-relaxed">
                {sources.map((source, idx) => (
                  <span key={idx}>
                    {source}
                    {idx < sources.length - 1 && (
                      <span className="mx-1 text-hemlock/50">•</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ) : null}


        {/* Número de versión */}
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-hemlock to-shadow rounded-full flex items-center justify-center text-white font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
          {index + 1}
        </div>
      </div>
    </section>
  )
}
