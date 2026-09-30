import Link from "next/link";
import type { ReactNode } from "react";
import Section from "@/components/ui/Section";
import CmsImage from "@/components/ui/CmsImage";

type Crumb = { label: string; href?: string };

type PageBannerProps = {
  title: string;
  /** Short intro line under the title. */
  description?: ReactNode;
  /** Trail after "Home". The last item is the current page (no href). */
  breadcrumbs?: Crumb[];
  /** Optional background image; switches the banner to a dark, light-on-image style. */
  image?: { src: string; alt?: string };
  /** "dark" is light text on a transparent background, for pages using `page-bg`. */
  tone?: "light" | "dark";
  className?: string;
};

export default function PageBanner({
  title,
  description,
  breadcrumbs = [],
  image,
  tone = "light",
  className = "",
}: PageBannerProps) {
  const dark = Boolean(image) || tone === "dark";
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...breadcrumbs];

  return (
    <Section
      spacing="hero"
      bleed
      className={`relative isolate overflow-hidden ${
        image ? "bg-black text-white" : dark ? "text-white" : "bg-white text-black"
      } ${className}`.trim()}
    >
      {image && (
        <>
          <CmsImage
            src={image.src}
            alt={image.alt ?? ""}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />
        </>
      )}

      <div className="container flex flex-col gap-4 md:gap-6 lg:gap-8">
        <nav aria-label="Breadcrumb" className="animate-fade">
          <ol
            className={`flex flex-wrap items-center gap-1.5 text-[13px] ${
              dark ? "text-white/65" : "text-black/55"
            }`}
          >
            {trail.map((crumb, i) => {
              const current = i === trail.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden>/</span>}
                  {current || !crumb.href ? (
                    <span
                      aria-current={current ? "page" : undefined}
                      className={dark ? "text-white" : "text-black"}
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className={`transition-colors ${
                        dark
                          ? "hover:text-white"
                          : "hover:text-black"
                      }`}
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <h1 className="text-5xl md:text-8xl lg:text-[136px] leading-[0.9] font-semibold tracking-normal">
          <span className="block overflow-hidden pb-[.08em]">
            <span className="block animate-rise">{title}</span>
          </span>
        </h1>

        {description && (
          <p
            className={`max-w-2xl animate-fade text-base lg:text-xl leading-relaxed [animation-delay:.35s] ${
              dark ? "text-white/80" : "text-black/65"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </Section>
  );
}
