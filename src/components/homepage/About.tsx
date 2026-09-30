import Button from "@/components/ui/Button";
import CmsImage from "@/components/ui/CmsImage";
import Section from "@/components/ui/Section";

const ABOUT_TEXT =
  "Established in the UAE in 2014 as part of Strategic Holding, Creation House is an exhibition stand fitting and production company — turnkey projects from fabrication and graphics to signage, furniture and AV, and official contractor for several exhibitions.";

const ABOUT_WORDS = ABOUT_TEXT.split(" ");

type AboutProps = {
  image?: { url: string; description?: string | null };
};

export default function About({ image }: AboutProps) {
  return (
    <Section id="about" className="bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col gap-7 md:gap-10 lg:gap-13">
          <h3 className="flex text-black flex-wrap gap-x-[.28em] text-2xl md:text-4xl lg:text-[54px] leading-[1.24] font-medium tracking-normal text-pretty">
            {ABOUT_WORDS.map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </h3>
          <div>
            <Button label="More about us" href="/about" variant="primary" />
          </div>
        </div>
      </div>

      {image?.url && (
        <Section
          spacing="none"
          bleed
          className="mt-12 h-svh overflow-hidden md:mt-16 lg:mt-20"
        >
          <CmsImage
            src={image.url}
            alt={image.description ?? ""}
            fill
            sizes="100vw"
            loading="eager"
            quality={70}
            className="object-cover"
          />
        </Section>
      )}
    </Section>
  );
}
