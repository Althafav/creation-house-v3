import CmsImage from "@/components/ui/CmsImage";
import Parallax from "@/components/motion/Parallax";
import StackCards from "@/components/motion/StackCards";

type ServiceStackProps = {
  /** Kontent `serviceitems` linked items (`name`, `image`). */
  items?: any[];
};

/**
 * Services as full-width cards that stack under the header as you scroll.
 * Each card is sized to fit below the sticky offset on every viewport.
 */
export default function ServiceStack({ items = [] }: ServiceStackProps) {
  if (items.length === 0) return null;

  return (
    <StackCards>
      {items.map((item: any, i: number) => {
        const title: string = item.elements.name?.value ?? "";
        const image = item.elements.image?.value?.[0];

        return (
          <article
            key={item.system.codename ?? title}
            className="flex h-[70svh] max-h-[760px] min-h-[420px] flex-col overflow-clip rounded-2xl border border-white/10 bg-[#1a1a1a] text-white md:flex-row md:rounded-3xl"
          >
            <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 md:w-[42%] lg:p-12">
              <span className="font-mono text-xs tracking-[.2em] text-accent">
                {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <h3 className="text-4xl leading-[.95] font-extrabold uppercase md:text-5xl lg:text-7xl">
                {title}
              </h3>
            </div>

            {image?.url && (
              <Parallax className="min-h-0 flex-1" speed={0.12}>
                <CmsImage
                  src={image.url}
                  alt={image.description || title}
                  fill
                  sizes="(min-width: 768px) 55vw, 90vw"
                  quality={70}
                  className="object-cover"
                />
              </Parallax>
            )}
          </article>
        );
      })}
    </StackCards>
  );
}
