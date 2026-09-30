import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import HeroExit from "@/components/motion/HeroExit";

export default function Hero({
  heading,
  bannervideolink,
  ctabuttons = [],
}: any) {
  return (
    <Section
      id="top"
      bleed
      spacing="none"
      className="overflow-hidden text-white"
    >
      {/* Intro stays CSS (animate-rise) for LCP; HeroExit only drives the scroll-away. */}
      <HeroExit className="flex min-h-svh flex-col justify-center pt-35 pb-7 md:pb-12 lg:pb-16">
        <div data-hero-media className="absolute inset-0 will-change-transform">
          {bannervideolink && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={bannervideolink} type="video/mp4" />
            </video>
          )}

          {/* Scrim so the heading and buttons stay readable over the video. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.75)_0%,rgba(0,0,0,.4)_55%,rgba(0,0,0,.15)_100%),linear-gradient(180deg,rgba(0,0,0,.55)_0%,transparent_30%,transparent_55%,rgba(0,0,0,.9)_100%)]"
          />
        </div>

        <div
          data-hero-content
          className="container relative flex flex-col gap-7 md:gap-10 lg:gap-12"
        >
          <h1 className="max-w-[16ch] text-[2.75rem] leading-[0.92] wrap-break-word sm:text-6xl lg:text-8xl font-extrabold tracking-normal text-balance">
            <span className="block overflow-hidden">
              <span className="block animate-rise">{heading}</span>
            </span>
          </h1>

          <div className="flex animate-rise flex-wrap items-end justify-between gap-8 pb-2 md:pb-4 lg:pb-6">
            {/* Stacked, full-width tap targets on phones; a row from sm up. */}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap [&>a]:justify-between sm:[&>a]:justify-center">
              {ctabuttons.map((item: any) => (
                <Button
                  key={item.system.codename}
                  label={item.elements.name?.value ?? ""}
                  href={item.elements.link?.value ?? "#"}
                  variant={
                    item.elements.variant?.value?.[0]?.codename === "primary"
                      ? "primary"
                      : "outline"
                  }
                  target={
                    item.elements.target?.value?.[0]?.codename === "_blank"
                      ? "_blank"
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </HeroExit>
    </Section>
  );
}
