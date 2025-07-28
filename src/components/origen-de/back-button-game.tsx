import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BackButtonGame() {
  return (
    <Link
      href="/historia"
      className="inline-flex items-center text-hemlock hover:text-midnight mb-6 transition-all duration-300 group"
    >
      <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
      <span className="font-medium">Volver a Juegos</span>
    </Link>
  )
}
