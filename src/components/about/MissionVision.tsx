import Section from "@/components/ui/Section";
import CmsImage from "@/components/ui/CmsImage";

type Asset = { url: string; description?: string | null; width: number; height: number };

type Block = {
  heading?: string;
  description?: string;
  image?: Asset;
};

function Row({ heading, description, image, reverse }: Block & { reverse?: boolean }) {
  return (
    <div
      className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="flex flex-col gap-4 md:gap-6">
        {heading && (
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-8 w-1 shrink-0 bg-[#2f7f78] md:h-10" />
            <h3 className="text-3xl leading-[1.1] font-extrabold text-black uppercase md:text-4xl lg:text-5xl">
              {heading}
            </h3>
          </div>
        )}
        {description && (
          <div
            className="prose prose-neutral max-w-lg text-base leading-relaxed text-black/65 lg:text-lg"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>

      {image && (
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
          <CmsImage
            src={image.url}
            alt={image.description ?? heading ?? ""}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default function MissionVision({
  mission,
  vision,
}: {
  mission: Block;
  vision: Block;
}) {
  return (
    <Section spacing="none" bleed className="bg-accent/15 py-14 md:py-20 lg:py-28">
      <div className="container mx-auto flex flex-col gap-16 md:gap-24 lg:gap-28">
        <Row {...mission} />
        <Row {...vision} reverse />
      </div>
    </Section>
  );
}
