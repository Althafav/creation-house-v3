import Section from "@/components/ui/Section";
import ServiceRow from "./ServiceRow";


export default function Services({ heading, items }: any) {
  return (
    <Section id="services" spacing="none"  bleed={true}  className="bg-white">
      <div className="w-full rounded-t-3xl bg-[#111] py-8 sm:rounded-t-4xl sm:py-10">
        <div className="container mx-auto">
          <div className="flex items-center gap-1.5 text-white">
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="size-[1.1em] fill-none stroke-current stroke-[1.2]"
            >
              <path d="M8 1.5v13M1.5 8h13" />
            </svg>
            <h2 className="font-medium ">{heading}</h2>
          </div>

          <ul className="mt-12 md:mt-20 lg:mt-32">
            {items.map((item: any, i: number) => (
              <ServiceRow
                key={item.elements.name.value}
                index={i}
                title={item.elements.name.value}
                imageUrl={item.elements.image.value?.[0]?.url}
              />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
