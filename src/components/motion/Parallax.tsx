"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Travel as a fraction of the frame height, each direction. */
  speed?: number;
};

/** Oversized inner layer scrubbed through a clipped frame. Desktop only. */
export default function Parallax({ children, className = "", speed = 0.15 }: ParallaxProps) {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const distance = () => root.current!.offsetHeight * speed;
        gsap.fromTo(
          inner.current,
          { y: () => -distance() },
          {
            y: () => distance(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative overflow-clip ${className}`}>
      <div
        ref={inner}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `${-speed * 100}%`, bottom: `${-speed * 100}%` }}
      >
        {children}
      </div>
    </div>
  );
}
