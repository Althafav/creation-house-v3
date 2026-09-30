import Section from "@/components/ui/Section";
import CmsImage from "@/components/ui/CmsImage";

type Asset = { url: string; description?: string | null; width: number; height: number };

export default function AboutGallery({ images = [] }: { images?: Asset[] }) {
  if (images.length === 0) return null;

  return (
    <Section bleed spacing="none" className="bg-white pb-8 md:pb-12 lg:pb-16">
      <div className="flex h-40 w-full gap-2 sm:h-56 sm:gap-2.5 md:h-64 lg:h-80">
        {images.map((img) => (
          <div
            key={img.url}
            className="relative h-full overflow-hidden bg-black/5"
            style={{ flexGrow: img.width / img.height, flexBasis: 0 }}
          >
            <CmsImage
              src={img.url}
              alt={img.description ?? ""}
              fill
              sizes="(min-width: 768px) 30vw, 45vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
