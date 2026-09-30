"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

type TextRevealProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
};

/** Heading lines slide up from behind a mask, once. Don't combine with text-balance. */
export default function TextReveal({ children, as = "h2", className }: TextRevealProps) {
  const el = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        SplitText.create(el.current!, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el.current, { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 110,
              stagger: 0.08,
              scrollTrigger: { trigger: el.current, start: "top 85%", once: true },
            });
          },
        });
      });
    },
    { scope: el },
  );

  return (
    <Tag ref={el} className={className} data-reveal-text="">
      {children}
    </Tag>
  );
}
