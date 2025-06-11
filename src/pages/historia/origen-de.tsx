import BackButton from "../../components/origen-de/back-button"
import PageHeader from "../../components/layout/page-header"
import HistoricalSection from "../../components/origen-de/historical-section"
import NotablePersons from "../../components/origen-de/notable-persons"
import HistoricalGallery from "../../components/origen-de/historical-gallery"
import { getLaIsabelData } from "../../lib/mock-data-origen-de"

export default function OrigenDePage() {
  const communityData = getLaIsabelData()

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <BackButton />

      <PageHeader title={communityData.title} description={communityData.description} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {communityData.sections.map((section) => (
            <HistoricalSection key={section.id} title={section.title} content={section.content} image={section.image} />
          ))}
        </div>

        <div className="space-y-8">
          <NotablePersons persons={communityData.notablePersons} />
          <HistoricalGallery images={communityData.gallery} viewMoreLink={communityData.galleryLink} />
        </div>
      </div>
    </div>
  )
}
