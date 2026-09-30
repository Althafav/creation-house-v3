"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

const WORDMARK = "Creation House".split("");

/** Footer wordmark: letters rise once from behind a mask when the footer enters. */
export default function FooterWordmark() {
  const root = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-letter]", {
          yPercent: 100,
          duration: 1.2,
          stagger: 0.03,
          // Hand the transform back to the CSS hover lift afterwards.
          clearProps: "transform",
          scrollTrigger: { trigger: root.current, start: "top 95%", once: true },
        });
      });
    },
    { scope: root },
  );

  // The footer outlives page navigations; re-measure once the new page is in.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <h3
      ref={root}
      aria-hidden="true"
      // pt-3 leaves room inside the mask for the 8px hover lift.
      className="flex justify-center overflow-clip whitespace-nowrap pt-3 text-white"
    >
      {WORDMARK.map((ch, i) => (
        <span
          key={i}
          data-letter
          className="inline-block text-[14.4cqi] leading-[.8] font-bold tracking-normal opacity-[.16] transition-[opacity,translate,color] duration-[450ms] ease-expo hover:-translate-y-2 hover:text-accent hover:opacity-100"
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </h3>
  );
}
