import Section from "@/components/ui/Section";
import { deliveryClient } from "@/modules/Global";
import ImageReveal from "@/components/motion/ImageReveal";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";

/**
 * The last three projects from the curated list on Kontent's
 * `previous_projects_page`; reorder that list in the CMS to change them.
 */
export default async function Work() {
  let pageData: any = {};
  try {
    const { data } = await deliveryClient
      .item("previous_projects_page")
      .depthParameter(2)
      .toPromise();
    pageData = data.item.elements;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        '[page] Could not fetch "previous_projects_page" from Kontent.ai.',
        error,
      );
    }
  }
  const projects: any[] =
    pageData.previousprojectsitems?.linkedItems?.slice(-3) ?? [];
  if (projects.length === 0) return null;

  return (
    <Section
      id="work"
      bleed
      spacing="none"
      className="bg-[#111] py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-6 md:mb-8 lg:mb-10">
          <TextReveal className="text-4xl leading-[.9] font-extrabold tracking-tight text-white uppercase md:text-6xl lg:text-[88px]">
            Recent Projects
          </TextReveal>
          <a
            href="/projects"
            className="mb-1 inline-flex items-center gap-1.5 border-b border-accent/40 pb-1 font-mono text-[11px] tracking-[.2em] text-accent uppercase transition-colors duration-200 hover:border-accent"
          >
            All projects
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <Reveal
          stagger
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5"
        >
          {projects.map((item: any, i: number) => (
            <div key={item.system.codename} className="group flex flex-col">
              <ImageReveal
                delay={i * 0.12}
                className="aspect-video w-full bg-white/5"
              >
                <img
                  src={item.elements.card_image.value?.[0]?.url}
                  alt={
                    item.elements.card_image.value?.[0]?.description ||
                    item.elements.name.value ||
                    ""
                  }
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-expo group-hover:scale-105"
                />
              </ImageReveal>
              <div
                data-reveal
                className="flex items-baseline justify-between gap-4 pt-3 sm:pt-4"
              >
                <h3 className="text-lg leading-tight font-bold text-white uppercase transition-colors duration-200 group-hover:text-accent sm:text-xl lg:text-2xl">
                  {item.elements.name.value}
                </h3>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
