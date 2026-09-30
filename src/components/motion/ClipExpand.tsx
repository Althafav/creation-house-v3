"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * A widescreen frame that opens to full bleed as it scrolls in, while the
 * image inside settles from a slight zoom. clip-path paints but doesn't lay
 * out, so keep this to one or two signature moments per page.
 */
export default function ClipExpand({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: MOTION_OK, mobile: "(max-width: 767px)" },
        (ctx) => {
          if (!ctx.conditions?.motion) return;
          const inset = ctx.conditions.mobile
            ? "inset(8% 5% 8% 5% round 16px)"
            : "inset(14% 10% 14% 10% round 28px)";

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "top 15%",
                scrub: true,
              },
            })
            .fromTo(root.current, { clipPath: inset }, { clipPath: "inset(0% 0% 0% 0% round 0px)" })
            .fromTo("[data-inner]", { scale: 1.25 }, { scale: 1 }, 0);
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`overflow-clip ${className}`}>
      <div data-inner className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
