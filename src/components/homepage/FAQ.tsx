import Section from "@/components/ui/Section";
import { getPageElements } from "@/modules/seo";
import RefreshOnToggle from "@/components/motion/RefreshOnToggle";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Accordion driven by Kontent's `faq` item (`faqsection`): `heading`,
 * `subheading`, and linked `faqitems` (`name` question, `content` rich-text answer).
 * Uses native <details> so it works without client JS; the shared `name`
 * keeps one answer open at a time.
 */
export default async function FAQ() {
  const el = await getPageElements("faq");
  const items: any[] = el.faqitems?.linkedItems ?? [];
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.elements.name?.value,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.elements.content?.value ?? ""),
      },
    })),
  };

  return (
    <Section id="faq" spacing="md" className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container mx-auto grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          {el.subheading?.value && (
            <div className="flex items-center gap-1.5 text-black">
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="size-[1.1em] fill-none stroke-current stroke-[1.2]"
              >
                <path d="M8 1.5v13M1.5 8h13" />
              </svg>
              <p className="font-medium">{el.subheading.value}</p>
            </div>
          )}
          <TextReveal className="mt-4 text-4xl leading-[.95] font-extrabold tracking-tight uppercase md:text-6xl lg:text-[72px]">
            {el.heading?.value}
          </TextReveal>
        </div>

        {/* Opening an answer changes page height, so triggers below (CTA, footer) are re-measured. */}
        <RefreshOnToggle className="border-t border-black/15">
          <Reveal stagger>
          {items.map((item) => (
            <details
              key={item.system.codename}
              name="faq"
              data-reveal
              className="group border-b border-black/15"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans! text-lg leading-snug font-semibold sm:text-xl">
                  {item.elements.name?.value}
                </h3>
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-black/20 transition-colors duration-300 group-open:border-transparent group-open:bg-primary sm:size-10"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-4 fill-none stroke-black stroke-[1.4]"
                  >
                    <path d="M1.5 8h13" />
                    <path
                      d="M8 1.5v13"
                      className="origin-center transition-transform duration-300 ease-expo group-open:scale-y-0"
                    />
                  </svg>
                </span>
              </summary>
              <div
                className="max-w-[65ch] pb-6 text-base leading-relaxed text-black/70 sm:pb-8 [&_a]:underline [&_li]:mt-1 [&_p+p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{
                  __html: item.elements.content?.value ?? "",
                }}
              />
            </details>
          ))}
          </Reveal>
        </RefreshOnToggle>
      </div>
    </Section>
  );
}
