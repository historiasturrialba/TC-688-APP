import Image from "next/image"

import type { HistoricalSectionType } from "../../lib/types"

interface HistoricalSectionProps {
  title: string
  content: string[]
  image?: HistoricalSectionType["image"]
}

export default function HistoricalSection({ title, content, image }: HistoricalSectionProps) {
  return (
    <section className="bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

      {image && image.position === "top" && (
        <div className="relative w-full h-64 md:h-80 mb-6 overflow-hidden rounded-md">
          <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
        </div>
      )}

      <div className="space-y-4">
        {content.map((paragraph, index) => (
          <p key={index} className="text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>

      {image && image.position === "bottom" && (
        <div className="relative w-full h-64 md:h-80 mt-6 overflow-hidden rounded-md">
          <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
        </div>
      )}
    </section>
  )
}
