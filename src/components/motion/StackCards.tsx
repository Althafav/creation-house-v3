"use client";

import { Children, useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * CSS sticky does the stacking; GSAP only pushes each covered card back.
 * Cards need an opaque background, and no ancestor may have overflow hidden/auto.
 */
export default function StackCards({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.firstElementChild, {
            scale: 0.92,
            autoAlpha: 0.5,
            ease: "none",
            transformOrigin: "50% 0%",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              // Finish when the next card lands on its own sticky offset.
              end: () => `top top+=${parseFloat(getComputedStyle(next).top) || 0}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`flex flex-col gap-8 ${className}`}>
      {Children.map(children, (child, i) => (
        <div data-stack-card className="sticky" style={{ top: `calc(7rem + ${i * 1.25}rem)` }}>
          <div className="will-change-transform">{child}</div>
        </div>
      ))}
    </div>
  );
}
