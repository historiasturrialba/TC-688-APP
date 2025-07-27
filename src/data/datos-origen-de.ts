import type { CommunityDataType } from "./types"

const communitiesData: CommunityDataType[] = [
  {
    id: "1",
    slug: "la-isabel",
    title: "Origen de La Isabel",
    description: "Las múltiples historias sobre cómo esta importante comunidad de Turrialba obtuvo su nombre.",
    sections: [
      {
        id: "finca-isabel-v1",
        title: "Origen debido a la finca La Isabel (Versión 1)",
        content: [
          'El nombre "La Isabel" proviene de una finca adquirida por el terrateniente Manuel Francisco Jiménez Ortiz, quien la nombró así en honor a su esposa, Isabel de la Guardia.',
          "La pareja fue influyente y parte de las familias de alto rango social en Costa Rica, lo que dio prestigio y reconocimiento a la propiedad y, posteriormente, a la comunidad que se desarrolló en sus alrededores.",
        ],
        sources: ["Los Díaz", "Flor Gamboa"],
      },
      {
        id: "finca-isabel-v2",
        title: "Origen debido a la finca La Isabel (Versión 2)",
        content: [
          "El nombre del distrito La Isabel proviene de una finca del mismo nombre, que fue muy representativa en la zona.",
          "Esta finca, dedicada al cultivo de caña y café, pertenecía a la empresa Juan Viñas. La importancia económica y social de esta propiedad fue tal que la finca dio identidad al actual distrito.",
        ],
        sources: [
          "Gerardo Ramírez Segura",
          "Gerardo Castro Vega",
          "Jorge Luis Calderón Martínez",
          "Hierling Almendares Víquez",
          "Juan Carlos Mora",
          "Yerlyn Fuentes",
          "Carlos Fuentes Cerdas",
          "Carlos Molina Zamora",
          "Jenny García Valerin",
        ],
      },
      {
        id: "santa-isabel",
        title: "Origen debido a Santa Isabel",
        content: [
          "En La Isabel, muchos creen que el nombre proviene de Santa Isabel, patrona del distrito.",
          "El templo principal está dedicado a esta santa, y su figura ha sido central en la vida religiosa y cultural del pueblo, influenciando no solo las celebraciones y tradiciones locales, sino también la identidad misma de la comunidad.",
        ],
        sources: [
          "Yamileth Benavides",
          "Yamileth Sojo Álvarez",
          "Ana Díaz González",
          "Douglas Campos Chaves",
          "Geovanny Valverde Montoya",
          "Vilma Calvo",
          "Mileidy María Hernández Delgado",
          "Benjamin Calvo",
          "Carlos Molina Cervantes",
          "Jose Mario Alvarado Arce",
          "Jose Mario Alvarado Granados",
          "Raquel Chaves",
          "Doña Alicia Quesada",
          "Doña Rosa Salazar Arias",
          "Avelino Coto Molina",
        ],
      },
      {
        id: "situacion-politica",
        title: "Origen debido a situación política",
        content: [
          "Antes, la comunidad se llamaba El Mora, pero gracias al esfuerzo de líderes como Eduardo Almendares y al apoyo del diputado Ovidio Pacheco, el nuevo nombre pasó a ser La Isabel, con cabecera en El Mora.",
          "El proceso de cambio de nombre incluyó luchas políticas y trabajo comunitario, reflejando el compromiso de los habitantes por establecer una identidad propia para su distrito.",
        ],
        sources: [
          "María Graciela Víquez Víquez",
          "Eduardo Murillo Chavarría",
          "Asada El Mora",
          "Carlos Mora Vargas",
        ],
      },
      {
        id: "senora-isabel",
        title: "Origen debido a una señora de nombre Isabel",
        content: [
          'Algunos relatos indican que el nombre "La Isabel" proviene de una mujer llamada Isabel que vivió en la zona y fue reconocida por su influencia o vínculos familiares.',
          "Se menciona que podría haber sido esposa o hija de antiguos propietarios de tierras, aunque los detalles específicos varían según quien cuenta la historia.",
        ],
        sources: [
          "Miguel García",
          "Rolando Picado Gonzales",
          "Adrian Monge",
          "José Guillen Sánchez",
          "Noe Vives",
          "Jose Mario Alvarado Arce",
          "Jose Mario Alvarado Granados",
        ],
      },
      {
        id: "hacienda-isabel",
        title: "Origen debido a la hacienda La Isabel",
        content: [
          'Varios testimonios coinciden en que el nombre "La Isabel" proviene de una antigua hacienda del mismo nombre, reconocida en la zona por su historia y actividad cafetalera.',
          "Esta hacienda fue un punto de referencia local importante que marcó el desarrollo económico de la región y dio identidad a la comunidad que creció a su alrededor.",
        ],
        sources: [
          "Doña Blanca León Coto",
          "Guillermo Ulloa Calvo",
          "Martin Vives",
          "Olga Mercedes Castaño Ortega",
          "Jose Mario Alvarado Arce",
          "Jose Mario Alvarado Granados",
          "Luis Gerardo",
          "Lidia Ramírez Centeno",
        ],
      },
    ],
    notablePersons: [
      {
        id: "manuel-francisco-jimenez",
        name: "Manuel Francisco Jiménez Ortiz",
        description: "Terrateniente que nombró la finca en honor a su esposa",
        image: "/images/origen-de/manuel-francisco-jimenez.jpg",
      },
      {
        id: "isabel-de-la-guardia",
        name: "Isabel de la Guardia",
        description: "Esposa de Manuel Francisco Jiménez, en cuyo honor se nombró la finca",
        image: "/images/origen-de/isabel-de-la-guardia.jpg",
      },
      {
        id: "eduardo-almendares",
        name: "Eduardo Almendares",
        description: "Líder comunitario que luchó por el cambio de nombre del distrito",
        image: "/images/origen-de/eduardo-almendares.jpg",
      },
      {
        id: "ovidio-pacheco",
        name: "Ovidio Pacheco",
        description: "Diputado que apoyó el cambio de nombre de El Mora a La Isabel",
        image: "/images/origen-de/ovidio-pacheco.jpg",
      },
    ],
    gallery: [
      {
        id: "img1",
        src: "/images/origen-de/finca-la-isabel.jpg",
        alt: "Antigua finca La Isabel",
      },
      {
        id: "img2",
        src: "/images/origen-de/templo-santa-isabel.jpg",
        alt: "Templo dedicado a Santa Isabel",
      },
      {
        id: "img3",
        src: "/images/origen-de/hacienda-cafetalera.jpg",
        alt: "Hacienda cafetalera La Isabel",
      },
      {
        id: "img4",
        src: "/images/origen-de/comunidad-el-mora.jpg",
        alt: "Vista de la comunidad cuando se llamaba El Mora",
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