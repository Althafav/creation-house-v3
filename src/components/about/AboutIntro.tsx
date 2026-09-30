import Section from "@/components/ui/Section";

export default function AboutIntro({
  heading,
  description,
}: {
  heading?: string;
  description?: string;
}) {
  return (
    <Section className=" bg-white">
      <div className="container mx-auto flex flex-col items-center gap-8 text-center md:gap-10">
        {heading && (
          <h2 className="max-w-4xl text-3xl leading-[1.1] font-extrabold uppercase text-black md:text-5xl lg:text-[56px]">
            {heading}
          </h2>
        )}
        {description && (
          <div
            className="prose prose-neutral max-w-2xl text-base leading-relaxed text-black/65 lg:text-lg"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        <span aria-hidden className="h-px w-16 bg-black/15" />

        <div className="flex flex-col items-center gap-1">
          <span className="font-heading text-6xl leading-none font-extrabold text-accent md:text-7xl">
            10+
          </span>
          <span className="font-mono text-[11px] tracking-[.2em] text-black/55 uppercase">
            Years of experience
          </span>
        </div>
      </div>
    </Section>
  );
}
