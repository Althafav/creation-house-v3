import About from "@/components/homepage/About";
import CTASection from "@/components/homepage/CTASection";
import FAQ from "@/components/homepage/FAQ";
import Hero from "@/components/homepage/Hero";
import Marquee from "@/components/homepage/Marquee";
import Process from "@/components/homepage/Process";
import Services from "@/components/homepage/Services";
import Work from "@/components/homepage/Work";
import { getPageElements, getPageMetadata } from "@/modules/seo";


export function generateMetadata() {
  return getPageMetadata("home_page_2026", "/", {
    description:
      "Creation House designs and builds exhibition stands, events, audio visual and furniture rental — fabricated in our own factory in Dubai, UAE.",
  });
}

export default async function Home() {
  const pageData = await getPageElements("home_page_2026");

  return (
    <div className="page-bg relative overflow-x-clip">
      <Hero
        heading={pageData.bannerheading?.value}
        bannervideolink={pageData.bannervideolink?.value}
        ctabuttons={pageData.bannercta?.linkedItems}
      />
      <Marquee />
      <About images={pageData.aboutimage?.value} />
      <Services
        heading={pageData.serviceheading?.value}
        items={pageData.serviceitems?.linkedItems}
      />
      <Work />
      <FAQ />

      {/* <Process /> */}
      <div className="container mx-auto">
        <CTASection />
      </div>
    </div>
  );
}
