// Import this module only from Client Components ("use client" files).
// It is also evaluated during SSR, so anything touching window/document is guarded.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

gsap.defaults({ ease: "expo.out", duration: 1.1 });

if (typeof window !== "undefined") {
  // Don't recalculate every trigger when the mobile URL bar shows/hides.
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Heading font (Big Shoulders) and Roboto swap in after first paint and shift layout.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/** matchMedia condition every animation is wrapped in. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = `${MOTION_OK} and (min-width: 768px)`;

export { gsap, ScrollTrigger, SplitText, useGSAP };
