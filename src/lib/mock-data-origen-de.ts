import type { CommunityDataType } from "./types"

const communitiesData: CommunityDataType[] = [
  {
    id: "1",
    slug: "la-isabel",
    title: "Origen de la Isabel",
    description: "La historia de cómo se fundó y desarrolló esta importante comunidad de Turrialba.",
    sections: [
      {
        id: "primeros-asentamientos",
        title: "Los primeros asentamientos",
        content: [
          "La comunidad de La Isabel comenzó a formarse a principios del siglo XX, alrededor del año 1905, cuando los primeros colonos llegaron a la región atraídos por la fertilidad de sus tierras y el clima favorable para la agricultura.",
          "Estos primeros pobladores, en su mayoría familias provenientes de otras regiones de Costa Rica, se establecieron en pequeñas parcelas donde comenzaron a cultivar principalmente caña de azúcar, café y diversos productos de subsistencia.",
          'El nombre "La Isabel" se atribuye a doña Isabel Rodríguez, una de las primeras habitantes que destacó por su liderazgo y contribución al desarrollo inicial de la comunidad. Su casa servía como punto de reunión y centro de actividades comunitarias.',
        ],
        image: {
          src: "/images/origen-de/la-isabel-asentamiento.jpg",
          alt: "Primeros asentamientos en La Isabel, alrededor de 1905",
          position: "top",
        },
      },
      {
        id: "desarrollo-crecimiento",
        title: "Desarrollo y crecimiento",
        content: [
          "Durante las décadas de 1920 y 1930, La Isabel experimentó un crecimiento significativo con la llegada de más familias y el establecimiento de los primeros servicios básicos. La construcción de la primera escuela en 1927 marcó un hito importante en el desarrollo de la comunidad.",
          "La economía local se fortaleció con la expansión de los cultivos de caña de azúcar y la instalación de pequeños trapiches para la producción de dulce. Algunas familias también se dedicaron a la ganadería a pequeña escala.",
          "En 1935, se construyó la primera capilla, que posteriormente se convertiría en la iglesia actual. Este espacio no solo servía para las actividades religiosas sino también como centro de reuniones comunitarias y celebraciones.",
          "La llegada del ferrocarril a Turrialba en la década de 1940 tuvo un impacto significativo en La Isabel, facilitando el transporte de productos agrícolas y conectando mejor la comunidad con el resto del país. Esto impulsó aún más el desarrollo económico y social de la zona.",
        ],
        image: {
          src: "/images/origen-de/la-isabel-iglesia.jpg",
          alt: "Primera iglesia de La Isabel, construida en 1935",
          position: "bottom",
        },
      },
      {
        id: "actualidad",
        title: "La Isabel en la actualidad",
        content: [
          "Hoy en día, La Isabel es una comunidad vibrante que ha preservado muchas de sus tradiciones mientras se adapta a los tiempos modernos. La agricultura sigue siendo una actividad importante, aunque con métodos más tecnificados y diversificación de cultivos.",
          "La comunidad cuenta con servicios básicos completos, escuelas, centros de salud y espacios recreativos. Las celebraciones tradicionales, como las fiestas patronales y actividades culturales, siguen siendo parte importante de la identidad local.",
          "Los descendientes de los primeros pobladores mantienen viva la memoria histórica de la comunidad, transmitiendo a las nuevas generaciones el legado de esfuerzo y trabajo comunitario que caracterizó los inicios de La Isabel.",
        ],
      },
    ],
    notablePersons: [
      {
        id: "isabel-rodriguez",
        name: "Isabel Rodríguez",
        description: "Fundadora que dio nombre a la comunidad",
        image: "/images/origen-de/isabel-rodriguez.jpg",
      },
      {
        id: "manuel-sanchez",
        name: "Manuel Sánchez",
        description: "Primer maestro de la escuela local",
        image: "/images/origen-de/manuel-sanchez.jpg",
      },
      {
        id: "carmen-jimenez",
        name: "Carmen Jiménez",
        description: "Impulsora de tradiciones culturales",
        image: "/images/origen-de/carmen-jimenez.jpg",
      },
    ],
    gallery: [
      {
        id: "img1",
        src: "/images/origen-de/galeria-1.jpg",
        alt: "Vista histórica de La Isabel en 1920",
      },
      {
        id: "img2",
        src: "/images/origen-de/galeria-2.jpg",
        alt: "Construcción de la primera escuela en 1927",
      },
      {
        id: "img3",
        src: "/images/origen-de/galeria-3.jpg",
        alt: "Celebración comunitaria en 1940",
      },
      {
        id: "img4",
        src: "/images/origen-de/galeria-4.jpg",
        alt: "Trapiche tradicional para procesar caña de azúcar",
      },
    ],
    galleryLink: "/galeria/la-isabel",
  },
]

export function getAllCommunities() {
  return communitiesData
}

export function getCommunityBySlug(slug: string) {
  return communitiesData.find((community) => community.slug === slug)
}

export function getLaIsabelData() {
  return communitiesData[0] // Returns La Isabel data directly
}
