"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type ImageRevealProps = {
  children: ReactNode;
  /** Give the frame its size here (`aspect-*` or a height). */
  className?: string;
  /** Seconds; use `index * 0.12` to stagger a row of images. */
  delay?: number;
};

/** Curtain wipe: the mask slides up while the image counter-slides and settles. Once. */
export default function ImageReveal({ children, className = "", delay = 0 }: ImageRevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            delay,
            defaults: { duration: 1.4 },
            scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
          })
          .set(root.current, { visibility: "visible" })
          .fromTo("[data-mask]", { yPercent: 100 }, { yPercent: 0 })
          .fromTo("[data-inner]", { yPercent: -100, scale: 1.3 }, { yPercent: 0, scale: 1 }, "<");
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative overflow-clip ${className}`} data-reveal-image="">
      <div data-mask className="absolute inset-0 overflow-clip">
        <div data-inner className="absolute inset-0">
          {children}
        </div>
      </div>
    </div>
  );
}
