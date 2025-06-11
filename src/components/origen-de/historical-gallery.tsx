import Image from "next/image"
import Link from "next/link"
import type { GalleryImageType } from "../../lib/types"


interface HistoricalGalleryProps {
  images: GalleryImageType[]
  viewMoreLink: string
}

export default function HistoricalGallery({ images, viewMoreLink }: HistoricalGalleryProps) {
  return (
    <section className="bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Galería histórica</h2>

      <div className="grid grid-cols-2 gap-2">
        {images.slice(0, 4).map((image) => (
          <div key={image.id} className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <Link href={viewMoreLink} className="text-blue-500 hover:text-blue-700 text-sm">
          Ver más fotos históricas
        </Link>
      </div>
    </section>
  )
}
