import Section from "@/components/ui/Section";

const STEPS = [
  {
    num: "01",
    title: "We Plan",
    body: "Space, budget and objective. We come back with questions before we come back with drawings.",
  },
  {
    num: "02",
    title: "We Sketch",
    body: "3D concept, renders and technical drawings, revised until the layout works on the floor.",
  },
  {
    num: "03",
    title: "We Execute",
    body: "Fabricated and pre-assembled in our own factory, inspected before it leaves the workshop.",
  },
  {
    num: "04",
    title: "We Build",
    body: "Install on site, live support through show days, dismantle and storage after.",
  },
];

export default function Process() {
  return (
    <Section id="process" className="border-t bg-black border-white/10">
      <div className="container mx-auto">
        <div className="mb-10 md:mb-16 lg:mb-19">
          <h2 className="mt-[18px] text-white max-w-[16ch] text-3xl md:text-5xl lg:text-[66px] leading-[1.02] font-semibold tracking-normal">
            We Plan, We Sketch, We Execute, We Build.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:gap-8.5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((st) => (
            <div
              key={st.num}
              className="flex text-white flex-col gap-4 border-t border-white/[.16] pt-[22px]"
            >
              <span className="text-xs tracking-[.2em] text-accent">
                {st.num}
              </span>
              <h3 className="text-[22px] font-medium tracking-normal">
                {st.title}
              </h3>
              <p className="text-[14.5px] leading-[1.55] font-light text-pretty text-white/50">
                {st.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
