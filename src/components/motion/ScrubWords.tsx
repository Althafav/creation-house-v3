"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type ScrubWordsProps = {
  text: string;
  as?: "h2" | "h3" | "p";
  className?: string;
};

/** Words light up one by one as the block scrolls through the viewport. */
export default function ScrubWords({ text, as: Tag = "p", className }: ScrubWordsProps) {
  const root = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-scrub-word]",
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: root.current,
              start: "top 80%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <Tag ref={root} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} data-scrub-word="" aria-hidden="true">
          {word}
        </span>
      ))}
    </Tag>
  );
}
