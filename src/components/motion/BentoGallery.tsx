"use client";

import { useRef } from "react";
import { ExpoScaleEase } from "gsap/EasePack";
import CmsImage from "@/components/ui/CmsImage";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

// Registered here, not in lib/gsap.ts, so only this component's bundle carries it.
gsap.registerPlugin(ExpoScaleEase);

type Img = { url: string; description?: string | null };

/**
 * Grid areas (row-start / col-start / row-end / col-end) on a 3×4 grid.
 * The first slot is always the hero: the centre tile spanning rows 2–3,
 * which ends up filling the viewport.
 */
const LAYOUTS: Record<5 | 8, string[]> = {
  5: ["2 / 2 / 4 / 3", "1 / 2 / 2 / 3", "1 / 3 / 5 / 4", "1 / 1 / 5 / 2", "4 / 2 / 5 / 3"],
  // GSAP's Scrubbed Bento Gallery demo layout.
  8: [
    "2 / 2 / 4 / 3",
    "1 / 1 / 3 / 2",
    "1 / 2 / 2 / 3",
    "1 / 3 / 3 / 4",
    "3 / 1 / 4 / 2",
    "3 / 3 / 5 / 4",
    "4 / 1 / 5 / 2",
    "4 / 2 / 5 / 3",
  ],
};

/**
 * Scrubbed bento zoom (after GSAP's "Scrubbed Bento Gallery" demo). It starts
 * as a bento grid and, as you scroll, grows the grid tracks until the centre
 * hero (images[0]) fills the screen and the other tiles are pushed off the
 * edges. Needs at least 5 images; 8 uses the full demo layout.
 *
 * It tweens the grid's --col/--row track sizes rather than using Flip, so
 * the browser lays out every frame correctly (no stretched images) and
 * resizing needs no rebuild, because the sizes are in vw/vh. The layout work
 * stays inside the `contain`ed stage. It uses a sticky stage rather than a pin.
 */
export default function BentoGallery({ images }: { images: Img[] }) {
  const root = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  const areas = images.length >= 8 ? LAYOUTS[8] : LAYOUTS[5];
  const tiles = images.slice(0, areas.length);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          grid.current,
          { "--col": "32.5vw", "--row": "23vh" },
          {
            "--col": "100vw",
            // Two rows plus the 1vh gap = the full viewport height.
            "--row": "49.5vh",
            ease: "expoScale(1, 5)",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative motion-safe:h-[250svh]">
      <div className="top-0 flex h-svh items-center justify-center overflow-clip [contain:layout_paint] motion-safe:sticky">
        <div
          ref={grid}
          className="grid shrink-0 content-center justify-center gap-[1vh] [--col:32.5vw] [--row:23vh]"
          style={{
            gridTemplateColumns: "repeat(3, var(--col))",
            gridTemplateRows: "repeat(4, var(--row))",
          }}
        >
          {tiles.map((img, i) => (
            <div
              key={img.url}
              className="relative overflow-clip bg-black/5"
              style={{ gridArea: areas[i] }}
            >
              <CmsImage
                src={img.url}
                alt={img.description ?? ""}
                fill
                sizes={i === 0 ? "100vw" : "33vw"}
                // The hero is the tile you land on; don't show it grey.
                loading={i === 0 ? "eager" : "lazy"}
                quality={70}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
