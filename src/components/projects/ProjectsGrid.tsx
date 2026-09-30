"use client";

import { useMemo, useState } from "react";
import Section from "@/components/ui/Section";
import CmsImage from "@/components/ui/CmsImage";

const ALL = "all";

type Category = { name: string; codename: string };

/** Options picked in the `category` multiple-choice element (an item can have several). */
const getCategories = (item: any): Category[] =>
  item.elements.category?.value ?? [];

export default function ProjectsGrid({ projects = [] }: { projects?: any[] }) {
  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const item of projects) {
      for (const { codename, name } of getCategories(item)) {
        if (!seen.has(codename)) seen.set(codename, name);
      }
    }
    return [
      { codename: ALL, name: "All" },
      ...Array.from(seen, ([codename, name]) => ({ codename, name })),
    ];
  }, [projects]);

  const [active, setActive] = useState(ALL);

  const filtered =
    active === ALL
      ? projects
      : projects.filter((item) =>
          getCategories(item).some((c) => c.codename === active),
        );

  if (projects.length === 0) return null;

  return (
    <Section bleed spacing="none" className="bg-[#111] py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto">
        {categories.length > 2 && (
          <div className="mb-6 flex flex-wrap gap-2.5 md:mb-8 lg:mb-10">
            {categories.map(({ codename, name }) => (
              <button
                key={codename}
                type="button"
                onClick={() => setActive(codename)}
                aria-pressed={active === codename}
                className={`cursor-pointer rounded-full border px-5 py-2 font-mono text-[11px] tracking-[.2em] uppercase transition-colors duration-200 ${
                  active === codename
                    ? "border-accent bg-accent text-black"
                    : "border-white/20 text-white/70 hover:border-accent hover:text-accent"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5">
          {filtered.map((item: any) => (
            <div key={item.system.codename} className="group flex flex-col">
              <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                <CmsImage
                  src={item.elements.card_image?.value?.[0]?.url}
                  alt={
                    item.elements.card_image?.value?.[0]?.description ||
                    item.elements.name?.value ||
                    ""
                  }
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-expo group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1 pt-3 sm:pt-4">
                {getCategories(item).length > 0 && (
                  <span className="font-mono text-[11px] tracking-[.2em] text-accent uppercase">
                    {getCategories(item)
                      .map((c) => c.name)
                      .join(" · ")}
                  </span>
                )}
                <h3 className="text-lg leading-tight font-bold text-white uppercase transition-colors duration-200 group-hover:text-accent sm:text-xl lg:text-2xl">
                  {item.elements.name.value}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
