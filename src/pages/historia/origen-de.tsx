import BackButton from "../../components/origen-de/back-button"
import PageHeader from "../../components/layout/page-header"
import HistoricalSection from "../../components/origen-de/historical-section"
import { Sparkles } from "lucide-react"

import { getLaIsabelData } from "../../data/datos-origen-de"
import { Key } from "react"

export default function OrigenDePage() {
  const communityData = getLaIsabelData()


  return (
    <div className="min-h-screen bg-gradient-to-br from-coconut-cream via-white to-coconut-cream/50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-hemlock/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-shadow/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-midnight/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>


      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <BackButton />

        <PageHeader title={communityData.title} description={communityData.description} />

        {/* Indicador de secciones */}
        <div className="flex items-center gap-2 mb-8 text-hemlock">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-wider">
            {communityData.sections.length} versiones históricas documentadas
          </span>
        </div>

        <div className="space-y-6">
          {communityData.sections.map((section: { id: Key | null | undefined; title: string; content: string[]; image: { src: string; alt: string; position: "top" | "bottom" } | undefined; sources: string[] | undefined }, index: number | undefined) => (
            <div key={section.id} className="relative">
              {/* Línea conectora entre secciones */}
              {index !== undefined && index < communityData.sections.length - 1 && (
                <div className="absolute left-8 top-full h-6 w-0.5 bg-gradient-to-b from-hemlock/30 to-transparent"></div>
              )}
              <HistoricalSection 
                title={section.title} 
                content={section.content} 
                image={section.image}
                sources={section.sources}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Footer decorativo */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-shadow/60 text-sm">
            <div className="w-8 h-px bg-shadow/30"></div>
            <span>Fin del documento histórico</span>
            <div className="w-8 h-px bg-shadow/30"></div>
          </div>
        </div>
      </div>


      </div>
  )
}