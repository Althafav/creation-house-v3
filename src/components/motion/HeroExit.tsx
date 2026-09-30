"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * The hero "camera pulls back" as you scroll past it: the background
 * `[data-hero-media]` pushes in and drifts, `[data-hero-content]` lifts and
 * fades, and the frame fades toward black. Scroll-driven only, so the CSS
 * intro and LCP are untouched.
 */
export default function HeroExit({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
          .to("[data-hero-media]", { scale: 1.12, yPercent: 15 }, 0)
          .to("[data-hero-content]", { yPercent: -30, autoAlpha: 0 }, 0)
          .to("[data-hero-shade]", { autoAlpha: 0.6 }, 0);
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative ${className}`}>
      {children}
      <div
        data-hero-shade
        aria-hidden
        className="pointer-events-none invisible absolute inset-0 bg-black opacity-0"
      />
    </div>
  );
}
