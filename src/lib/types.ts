export interface HistoricalSectionType {
  id: string
  title: string
  content: string[]
  image?: {
    src: string
    alt: string
    position: "top" | "bottom"
  }
}

export interface NotablePersonType {
  id: string
  name: string
  description: string
  image: string
}

export interface GalleryImageType {
  id: string
  src: string
  alt: string
}

export interface CommunityDataType {
  id: string
  slug: string
  title: string
  description: string
  sections: HistoricalSectionType[]
  notablePersons: NotablePersonType[]
  gallery: GalleryImageType[]
  galleryLink: string
}
