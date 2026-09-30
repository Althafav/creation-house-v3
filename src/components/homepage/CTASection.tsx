import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import ZoomIn from "@/components/motion/ZoomIn";

// Print crop marks, drawn for the top-left corner and flipped into the others.
const CROP_MARKS = [
  "-top-4 -left-4 sm:-top-6 sm:-left-6",
  "-top-4 -right-4 -scale-x-100 sm:-top-6 sm:-right-6",
  "-bottom-4 -left-4 -scale-y-100 sm:-bottom-6 sm:-left-6",
  "-right-4 -bottom-4 -scale-100 sm:-right-6 sm:-bottom-6",
];

export default function CTASection() {
  return (
    <Section id="inquiry" spacing="md" className="bg-white">
      <ZoomIn className="relative">
        {CROP_MARKS.map((position) => (
          <svg
            key={position}
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`absolute size-4 text-black/35 sm:size-6 ${position}`}
          >
            <path d="M0 24h16M24 0v16" stroke="currentColor" strokeWidth="1" />
          </svg>
        ))}

        <div className="flex flex-col gap-10 rounded-2xl bg-black sm:rounded-3xl px-7 md:px-12 lg:px-20 pt-10 md:pt-16 lg:pt-24 pb-8 md:pb-12 lg:pb-16 text-white lg:flex-row lg:items-end lg:justify-between">
          <TextReveal className="max-w-[11ch] text-4xl sm:text-7xl   font-semibold tracking-normal">
            Planning your next stand?
          </TextReveal>
          <Reveal
            delay={0.2}
            className="shrink-0 lg:pb-[0.6vw] [&>a]:w-full [&>a]:justify-between sm:[&>a]:w-auto"
          >
            <Button label="Start an inquiry" href="/contact-us" variant="primary" />
          </Reveal>
        </div>
      </ZoomIn>
    </Section>
  );
}
