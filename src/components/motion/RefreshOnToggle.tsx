"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Recalculates ScrollTrigger positions when a <details> inside opens or
 * closes, since that changes the height of everything below it.
 */
export default function RefreshOnToggle({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    // `toggle` doesn't bubble, so listen in the capture phase.
    el.addEventListener("toggle", refresh, true);
    return () => el.removeEventListener("toggle", refresh, true);
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
