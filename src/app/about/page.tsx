import AboutGallery from "@/components/about/AboutGallery";
import AboutIntro from "@/components/about/AboutIntro";
import MissionVision from "@/components/about/MissionVision";
import PageBanner from "@/components/ui/PageBanner";
import { getPageElements, getPageMetadata } from "@/modules/seo";


export function generateMetadata() {
  return getPageMetadata("about_page_2026", "/about", {
    title: "About Us", description:
      "Meet Creation House, the Dubai team behind exhibition stands, events, audio visual and furniture rental, built in our own Al Quoz factory.",
  });
}

export default async function AboutPage() {
  const pageData = await getPageElements("about_page_2026");

  return (
    <div className="page-bg relative overflow-x-clip">
      <PageBanner title="Creation House" breadcrumbs={[{ label: "About us" }]} />

      <AboutGallery images={pageData.aboutimages?.value} />

      <AboutIntro
        heading={pageData.aboutheading?.value}
        description={pageData.aboutdescription?.value}
      />

      <MissionVision
        mission={{
          heading: pageData.missionheading?.value,
          description: pageData.missiondescription?.value,
          image: pageData.missionimage?.value?.[0],
        }}
        vision={{
          heading: pageData.visionheading?.value,
          description: pageData.visiondescription?.value,
          image: pageData.visionimage?.value?.[0],
        }}
      />
    </div>
  );
}

export const revalidate = 30;
