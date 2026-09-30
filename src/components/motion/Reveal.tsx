"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Reveal `[data-reveal]` children in batches instead of the wrapper. */
  stagger?: boolean;
  y?: number;
  delay?: number;
};

/** Scroll reveal: fade up once when it enters the viewport. */
export default function Reveal({
  children,
  className,
  stagger = false,
  y = 40,
  delay = 0,
}: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Use matchMedia's own contextSafe, not useGSAP's: batch can fire onEnter
      // synchronously (element already in view at load), and calling an outer
      // context's function from inside this one nests them in a cycle, which
      // overflows the stack on revert.
      mm.add(MOTION_OK, (_ctx, contextSafe) => {
        const targets = stagger
          ? gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current)
          : [root.current!];

        gsap.set(targets, { autoAlpha: 0, y });

        const show = contextSafe!((els: Element[]) =>
          gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.08, delay, overwrite: true }),
        ) as (els: Element[]) => void;

        ScrollTrigger.batch(targets, { start: "top 85%", once: true, onEnter: show });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className} data-reveal={stagger ? undefined : ""}>
      {children}
    </div>
  );
}
