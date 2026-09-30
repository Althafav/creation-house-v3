"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/** Scales up into frame as it scrolls in: a closing "push in" for end-of-page blocks. */
export default function ZoomIn({
  children,
  className = "",
  from = 0.9,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          root.current,
          { scale: from },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "center 60%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
