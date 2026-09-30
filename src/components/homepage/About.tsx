import Button from "@/components/ui/Button";
import CmsImage from "@/components/ui/CmsImage";
import Section from "@/components/ui/Section";
import BentoGallery from "@/components/motion/BentoGallery";
import ClipExpand from "@/components/motion/ClipExpand";
import Reveal from "@/components/motion/Reveal";
import ScrubWords from "@/components/motion/ScrubWords";

const ABOUT_TEXT =
  "Established in the UAE in 2014 as part of Strategic Holding, Creation House is an exhibition stand fitting and production company — turnkey projects from fabrication and graphics to signage, furniture and AV, and official contractor for several exhibitions.";

// BentoGallery's smallest layout.
const BENTO_MIN_IMAGES = 5;

type AboutProps = {
  /** Kontent `aboutimage` assets; 5+ become a scrubbed bento, fewer show the first one. */
  images?: { url: string; description?: string | null }[];
};

export default function About({ images = [] }: AboutProps) {
  const image = images[0];

  return (
    <Section id="about" className="bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col gap-7 md:gap-10 lg:gap-13">
          <ScrubWords
            as="h3"
            text={ABOUT_TEXT}
            className="flex text-black flex-wrap gap-x-[.28em] text-2xl md:text-4xl lg:text-[54px] leading-[1.24] font-medium tracking-normal text-pretty"
          />
          <Reveal>
            <Button label="More about us" href="/about" variant="primary" />
          </Reveal>
        </div>
      </div>

      {images.length >= BENTO_MIN_IMAGES ? (
        <Section spacing="none" bleed className="mt-12 md:mt-16 lg:mt-20">
          <BentoGallery images={images} />
        </Section>
      ) : image?.url && (
        <Section
          spacing="none"
          bleed
          className="mt-12 h-svh md:mt-16 lg:mt-20"
        >
          {/* Signature moment: a widescreen frame opens to full bleed. */}
          <ClipExpand className="absolute inset-0">
            <CmsImage
              src={image.url}
              alt={image.description ?? ""}
              fill
              sizes="100vw"
              loading="eager"
              quality={70}
              className="object-cover"
            />
          </ClipExpand>
        </Section>
      )}
    </Section>
  );
}
