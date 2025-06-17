import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BackButtonGame() {
  return (
    <Link
      href="/juegos"
      className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6 transition-colors"
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Volver a Juegos
    </Link>
  )
}
