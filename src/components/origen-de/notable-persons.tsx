import Image from "next/image"

import type { NotablePersonType } from "../../lib/types"

interface NotablePersonsProps {
  persons: NotablePersonType[]
}

export default function NotablePersons({ persons }: NotablePersonsProps) {
  return (
    <section className="bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Personajes destacados</h2>

      <div className="space-y-4">
        {persons.map((person) => (
          <div key={person.id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100">
              <Image src={person.image || "/placeholder.svg"} alt={person.name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{person.name}</h3>
              <p className="text-sm text-gray-600">{person.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
