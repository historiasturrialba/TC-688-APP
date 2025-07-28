export type CommunityDataType = {
    id: string
    slug: string
    title: string
    description: string
    sections: Array<{
      id: string
      title: string
      content: string[]
      sources: string[]
    }>
    notablePersons: Array<{
      id: string
      name: string
      description: string
      image: string
    }>
    gallery: Array<{
      id: string
      src: string
      alt: string
    }>
    galleryLink: string
  }