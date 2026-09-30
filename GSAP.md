# GSAP in this project

Next.js 16 App Router · React 19 + React Compiler · Tailwind v4 · Kontent.ai content.

Read this file before writing, editing or reviewing any animation code. For API detail, load the matching official skill from `.agents/skills/`: `gsap-react`, `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins` (SplitText), `gsap-utils` and `gsap-performance`. This file is the project layer on top of them. Where they differ, this file wins.

---

## 1. Goal: every section moves, the site still feels light

"Light" means four things:

- The first paint is never delayed.
- Scrolling stays native, with no scroll hijacking.
- Every animation runs on the compositor.
- There is one small, consistent motion vocabulary, not a different effect per section.

These rules follow from that:

| Rule | Why |
|---|---|
| **Above the fold uses CSS, not GSAP.** Hero and `PageBanner` keep the existing `animate-rise` / `animate-fade` keyframes from `globals.css`. | GSAP waits for hydration. Hiding the hero heading or video until JS runs delays LCP. |
| **Native scroll only.** No ScrollSmoother, no Lenis, no `normalizeScroll`, unless the user explicitly asks. | Smooth-scroll libraries add JS, add input latency and fight trackpads and mobile. |
| **Animate `transform` + `opacity` only** (`x`, `y`, `xPercent`, `yPercent`, `scale`, `autoAlpha`). | No layout or paint per frame. Never animate `width`/`height`/`top`/`margin`, `filter: blur()` or `box-shadow`. |
| **Reveals play once** (`once: true`). | A finished trigger is killed, so the page gets lighter as you scroll. Reveals do not reverse on scroll-up. |
| **`scrub` only for scroll-tied motion** (parallax, stack, word scrub, clip expand, hero exit, zoom in). Use `scrub: true`, not a number. | A numeric scrub adds a catch-up tween on every scroll frame. |
| **Split headings into lines, not chars.** | A char split creates hundreds of nodes. |
| **Parallax is off below 768px** and everything is off for `prefers-reduced-motion`. | Saves mobile CPU and battery, and respects accessibility settings. |
| **Sticky beats pin.** Stack cards use CSS `position: sticky`, with GSAP only scaling the cards. | No pin-spacer, no reflow on refresh, and it works inside the transformed `Section bleed`. |
| **Register only ScrollTrigger + SplitText globally.** Any other plugin or ease is registered in the one component that needs it (e.g. `ExpoScaleEase` in `BentoGallery`). | Flip, Draggable, ScrollSmoother and the rest stay out of the bundle until a feature really needs them. |

### Motion vocabulary (use these defaults; don't invent new ones per section)

| Effect | Component | Default |
|---|---|---|
| Scroll reveal | `<Reveal>` | `y: 40 → 0`, `autoAlpha 0 → 1`, 1.1s `expo.out`, stagger 0.08, start `top 85%`, once |
| Text reveal | `<TextReveal>` | SplitText lines + `mask: "lines"`, `yPercent: 110 → 0`, stagger 0.08, once |
| Image reveal | `<ImageReveal>` | Curtain wipe up (mask `yPercent 100 → 0`, inner `yPercent -100 → 0` + `scale 1.3 → 1`), 1.4s, once |
| Parallax | `<Parallax>` | Inner layer moves ±15% of the frame height, `ease: "none"`, `scrub: true`, ≥768px |
| Stack cards | `<StackCards>` | Sticky cards; each covered card scales to 0.92 and fades to 0.5, scrubbed |
| Word scrub | `<ScrubWords>` | Words go opacity 0.15 → 1 as the block passes `top 80%` → `bottom 55%`, scrubbed. For one statement paragraph per page |
| Clip expand | `<ClipExpand>` | Signature moment: `clip-path` inset frame (14% 10%, 28px radius; 8% 5% on mobile) opens to full bleed, inner `scale 1.25 → 1`, scrubbed. Max one or two per page |
| Hero exit | `<HeroExit>` | Scroll-away only: `[data-hero-media]` `scale 1.12` + `yPercent 15`, `[data-hero-content]` `yPercent -30` + fade, black shade to 0.6, scrubbed `top top` → `bottom top` |
| Bento zoom | `<BentoGallery>` | Home About images (5+). Bento grid on a sticky stage (`250svh` wrapper). Tweens the grid's `--col`/`--row` track sizes `32.5vw/23vh → 100vw/49.5vh` with `expoScale(1, 5)`, scrubbed, until the centre hero fills the screen. Track sizes, not Flip: no stretching, no rebuild on resize. A contained layout exception to the transform-only rule. `ExpoScaleEase` is registered locally in this file only |
| Zoom in | `<ZoomIn>` | Closing block scales `0.9 → 1` from `top bottom` to `center 60%`, scrubbed |

Helpers: `RefreshOnToggle` wraps `<details>` lists and refreshes ScrollTrigger on open/close. `FooterWordmark` (in `globals/layout/`) refreshes on `usePathname()` because the footer persists across routes.

`expo.out` matches the site's CSS `--ease-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`), so GSAP and CSS motion feel the same.

---

## 2. Setup (do once, the first time GSAP is added)

```bash
npm install gsap @gsap/react
```

All GSAP plugins are free and ship in the public `gsap` package (import from `gsap/SplitText`, etc.). Never add an `.npmrc`, an auth token or the `npm.greensock.com` registry.

### `src/lib/gsap.ts`: the only place GSAP is imported from `"gsap"`

```ts
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
```

Components import `import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "@/lib/gsap";`. Don't put `"use client"` in this file, because it's a module, not a component.

### No-flash CSS: add to `src/app/globals.css`

Server HTML is painted before hydration. Without this rule, elements that animate in are visible, then snap to hidden, then animate. The rule hides them **only** when motion is allowed, so reduced-motion users always see content.

```css
@media (prefers-reduced-motion: no-preference) {
  [data-reveal],
  [data-reveal-text],
  [data-reveal-image] {
    visibility: hidden;
  }
}
```

In the root `layout.tsx` `<body>`, add a no-JS fallback so content is never lost:

```tsx
<noscript>
  <style>{`[data-reveal],[data-reveal-text],[data-reveal-image]{visibility:visible!important}`}</style>
</noscript>
```

Because of this rule, **never put `data-reveal*` on anything visible on first load** (hero, `PageBanner`, the first section on a page). Use the CSS keyframes there.

### Fix before using sticky or stack animation

`src/app/page.tsx`, `about/page.tsx` and `projects/page.tsx` wrap the page in `overflow-x-hidden`. `overflow-x: hidden` turns the wrapper into a scroll container, and that breaks `position: sticky` for everything inside it. This already affects `FAQ`'s `lg:sticky`. Replace it with **`overflow-x-clip`**, which clips the same way without creating a scroll container.

---

## 3. The primitives: `src/components/motion/`

Each primitive is a tiny Client Component that takes **server-rendered children**. Sections and pages stay async Server Components that fetch from Kontent. They just wrap parts of their markup:

```tsx
// src/components/homepage/Services.tsx (still a Server Component)
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";

<TextReveal as="h2" className="text-5xl">{heading}</TextReveal>
<Reveal stagger className="grid gap-6 md:grid-cols-3">
  {items.map((item) => <ServiceCard key={item.system.id} data-reveal {...item} />)}
</Reveal>
```

Shared rules for every primitive:

- `useGSAP` with `{ scope: root }`. No GSAP calls or `ref.current` reads during render (React Compiler safe).
- Wrap all setup in `gsap.matchMedia()` with `MOTION_OK` (or `DESKTOP_MOTION`). `useGSAP` reverts the matchMedia automatically on unmount.
- Anything created later, inside a callback (`onEnter`, click, hover), goes through `contextSafe`.
- **Inside `mm.add`, use the handler's own `contextSafe`** (`mm.add(MOTION_OK, (_ctx, contextSafe) => …)`), never useGSAP's. A callback can fire synchronously while the matchMedia context is active (e.g. `ScrollTrigger.batch` `onEnter` for an element already in view at load). Calling useGSAP's wrapper there pushes the outer context into its own child, and the revert then crashes with `Maximum call stack size exceeded` (`Context.getTweens` recursion).
- The component that sets `data-reveal*` is the one that removes the hidden state (`autoAlpha: 1` / `visibility: "visible"`).

### Scroll reveal: `Reveal.tsx`

- **Default mode:** the wrapper itself fades up.
- **`stagger` mode:** the wrapper stays visible and its `[data-reveal]` children reveal in batches as they enter. This suits grids and lists; rows further down animate when they arrive, not all at once.

```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Reveal `[data-reveal]` children in batches instead of the wrapper. */
  stagger?: boolean;
  y?: number;
};

export default function Reveal({ children, className, stagger = false, y = 40 }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // matchMedia's own contextSafe; see the shared rules above.
      mm.add(MOTION_OK, (_ctx, contextSafe) => {
        const targets = stagger
          ? gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current)
          : [root.current!];

        gsap.set(targets, { autoAlpha: 0, y });

        const show = contextSafe!((els: Element[]) =>
          gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.08, overwrite: true }),
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
```

### Text reveal: `TextReveal.tsx`

Lines slide up from behind a mask. `autoSplit` re-splits after the variable font loads and on resize, and returning the tween from `onSplit` keeps it in sync. `aria: "auto"` (the default) keeps the heading readable as one label for screen readers.

```tsx
"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

type TextRevealProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
};

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
```

Notes:

- Don't combine with `text-balance` / `text-wrap: balance`. It breaks line splitting.
- Tight `leading-*` plus `mask` can clip descenders. Add a little `pb-[0.1em]` to the heading if letters get cut.
- For Kontent rich text (HTML), render it inside the tag. SplitText keeps nested `<strong>`/`<em>` (`deepSlice`).
- Body paragraphs get `<Reveal>`, not `<TextReveal>`. Split only headings.

### Image reveal: `ImageReveal.tsx`

A transform-only curtain wipe. The outer frame is the trigger and never moves. The mask slides up while the image counter-slides and settles from `scale 1.3`. Give the frame its size (`aspect-*` or height) through `className`, and pass a `CmsImage` with `fill` as children.

```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function ImageReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
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
```

`clip-path: inset()` wipes are acceptable for a one-off variation (they paint but don't lay out). Keep the curtain as the default.

### Parallax: `Parallax.tsx`

The inner layer is oversized by `speed` on the top and bottom, then scrubbed across it. There are no gaps at any viewport size. `invalidateOnRefresh` recomputes the distance on resize. It is desktop only.

```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Travel as a fraction of the frame height, each direction. */
  speed?: number;
};

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
```

- For images: `<Parallax className="aspect-[4/3]"><CmsImage fill … /></Parallax>`.
- **Layered parallax** (text or shapes drifting at different speeds inside a section) uses the same idea without the frame. Tween `yPercent` on each layer with `ease: "none"` and `scrub: true`, with the section as trigger. Keep it to 2–3 layers per section and use it sparingly.
- `ImageReveal` and `Parallax` can nest (reveal outside, parallax inside). Don't put both effects on the same element.

### Stack cards: `StackCards.tsx`

CSS `position: sticky` does the stacking natively. GSAP only pushes each covered card back. Each card's sticky `top` steps down slightly so the edges of earlier cards peek out. `top-28` matches the offset under the fixed header that FAQ and contact already use.

```tsx
"use client";

import { Children, useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function StackCards({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.firstElementChild, {
            scale: 0.92,
            autoAlpha: 0.5,
            ease: "none",
            transformOrigin: "50% 0%",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top+=112", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`flex flex-col gap-8 ${className}`}>
      {Children.map(children, (child, i) => (
        <div data-stack-card className="sticky" style={{ top: `calc(7rem + ${i * 1.25}rem)` }}>
          <div className="will-change-transform">{child}</div>
        </div>
      ))}
    </div>
  );
}
```

- This needs the `overflow-x-clip` fix from section 2, and no ancestor with `overflow: hidden|auto`.
- Cards need an opaque background, or covered cards show through.
- Use `pin` only for effects sticky can't do (horizontal scroll with `containerAnimation`, scrubbed multi-step sequences). A `Section bleed` ancestor has a `translate` transform, which breaks `position: fixed` pins. Pin an element outside it or use `pinReparent`.

---

## 4. Next.js specifics

- **Server/client split.** Only the primitives (and any bespoke animated component) are `"use client"`. Never add `"use client"` to a page or data-fetching section just to animate it. Wrap its markup in a primitive instead.
- **Route changes.** Navigating unmounts the page, and `useGSAP` reverts its tweens, ScrollTriggers and SplitText. Never create ScrollTriggers in layout-level components (Header, Footer) that target page content, because layouts persist and those triggers go stale. For a page-enter effect use `app/template.tsx` (it remounts per navigation) or React `<ViewTransition>` (`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`). Don't build route transitions with GSAP.
- **Trigger order.** Create ScrollTriggers top-to-bottom, which happens naturally with one component per section. If a component creates triggers out of page order (async content), set `refreshPriority`.
- **Late layout shifts.** Fonts are handled in `lib/gsap.ts`. Give every `CmsImage` an aspect ratio or dimensions so images don't shift layout. After anything that changes page height (FAQ accordion open/close, "load more"), call `ScrollTrigger.refresh()` once the change settles.
- **Strict Mode** runs effects twice in dev. If an animation doubles or jumps, cleanup is missing (usually GSAP outside `useGSAP`, or a callback without `contextSafe`).
- **Hydration.** GSAP-generated DOM (SplitText wrappers, inline styles) must never end up in React state or JSX. Let GSAP mutate and revert it.
- **Bespoke section animations** (e.g. a scrubbed timeline for `Process`) follow the same pattern: one Client Component, `useGSAP` + `scope`, `matchMedia`, the ScrollTrigger on the **timeline**, never on a tween inside it, and defaults from the vocabulary table.

---

## 5. Checklist before finishing

- [ ] GSAP imported only from `@/lib/gsap`; only primitive or bespoke animation files are `"use client"`.
- [ ] `useGSAP` + `scope`; all setup inside `gsap.matchMedia(MOTION_OK | DESKTOP_MOTION)`; later callbacks wrapped with `contextSafe`, which is the **matchMedia handler's** `contextSafe` when created inside `mm.add`.
- [ ] Nothing above the fold uses `data-reveal*` or GSAP; the hero and `PageBanner` use CSS keyframes.
- [ ] Only transform/opacity animated; `once: true` on reveals; `scrub: true` only for parallax/stack.
- [ ] Used a primitive from section 3 rather than a one-off effect with new timings.
- [ ] Page works with reduced motion on (DevTools → Rendering → emulate `prefers-reduced-motion`) and with JS disabled.
- [ ] No `markers: true`; `npx tsc --noEmit` passes.
- [ ] Checked in the browser at mobile and desktop widths, including navigating away and back; no jank in the DevTools Performance panel while scrolling.
