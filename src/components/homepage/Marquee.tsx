import Section from "@/components/ui/Section";

const SERVICE_TITLES = [
  "Exhibition Stands",
  "Event Management",
  "Audio Visual",
  "Furniture Rental",
];

const marqueeItems = [...SERVICE_TITLES, ...SERVICE_TITLES];

function Sparkle() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 shrink-0 fill-accent md:size-5 lg:size-6"
    >
      <path d="M12 0C12.9 7.2 16.8 11.1 24 12 16.8 12.9 12.9 16.8 12 24 11.1 16.8 7.2 12.9 0 12 7.2 11.1 11.1 7.2 12 0Z" />
    </svg>
  );
}

export default function Marquee() {
  return (
    <Section
      bleed
      spacing="none"
      className="overflow-hidden bg-[#111] border-y border-white/10 py-3 whitespace-nowrap sm:py-4"
    >
      <div className="inline-flex animate-marquee items-center gap-6 pr-6 will-change-transform sm:gap-10 sm:pr-10">
        {marqueeItems.map((label, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 sm:gap-10"
          >
            <span
              className={`chroma font-heading text-2xl font-extrabold uppercase leading-none tracking-tight md:text-4xl lg:text-5xl ${
                i % 2 ? "text-white" : "text-outline"
              }`}
            >
              {label}
            </span>
            <Sparkle />
          </span>
        ))}
      </div>
    </Section>
  );
}
