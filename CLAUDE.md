# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## GSAP

Before writing or editing any GSAP/animation code, read @GSAP.md (project conventions) and load the relevant `gsap-*` skill from `.agents/skills/`.

## Project

Marketing site for Creation House (exhibition stands & events, Dubai) — https://creation-house.ae/. Next.js 16 App Router, React 19 with the React Compiler enabled (`reactCompiler: true`), Tailwind CSS v4, TypeScript (strict). Content comes from Kontent.ai.

## Commands

```bash
npm run dev     # dev server on http://localhost:3000
npm run build   # production build (also the only type-check step)
npm run start   # serve the production build
```

There is no lint script, test runner, or test suite configured. Use `npx tsc --noEmit` for a quick type check.

## Architecture

**Content (Kontent.ai).** `src/modules/Global.ts` exports a shared `deliveryClient` (`@kontent-ai/delivery-sdk`, secured mode) plus site constants (`SITE_NAME`, `SITE_URL`, `EventID`). Pages and sections are async Server Components that fetch directly, e.g. `src/app/page.tsx` loads the `home_page_2026` item with `depthParameter(2)` and passes raw element values (`pageData.x?.value`, `.linkedItems`) down as props. Some sections (e.g. `homepage/Work.tsx`) fetch their own content. Fetches are wrapped in try/catch so the page still renders if Kontent is unreachable — keep props optional-chained accordingly.

**CMS images.** Use `src/components/ui/CmsImage.tsx` instead of `next/image` for Kontent assets: it swaps in a custom loader that resizes on Kontent's image CDN (`w`/`q`/`auto=format`) rather than the Next optimizer. Kontent hostnames are whitelisted in `next.config.ts` `images.remotePatterns`.

**Contact form (ActiveCampaign).** `src/app/contact-us/page.tsx` server-fetches country lists from `api.strategic.ae` and reads `mainsource`/`subsource` from the query string. `components/contact/ContactForm.tsx` is a plain React form that POSTs to ActiveCampaign (`https://ac.strategic.ae/proc.php`, form 488) with `fetch` in `no-cors` mode, so the response can't be read — any resolved request is treated as success. The hidden inputs and `field[N]` names are ActiveCampaign form config and custom field ids (12 mobile_phone, 3 country, 360 creation_house_services, 6 message, 328 mainsource, 329 subsource, 38 forms_submitted); keep them intact. Validation is native HTML (`required`, `type="email"`) styled with Tailwind's `user-invalid:` variant, and reCAPTCHA is loaded with `next/script` and rendered explicitly into a ref.

**Components.** `src/components/` is split into `globals/layout` (Header/Footer, rendered by the root layout), per-page folders (`homepage/`, `contact/`), and `ui/` primitives (`Section` with `spacing`/`bleed` props, `PageBanner`, `Button`, `CmsImage`). Import via the `@/*` → `src/*` alias.

**Styling.** Tailwind v4 is configured CSS-first in `src/app/globals.css` — no `tailwind.config`. Theme tokens (`--color-primary`, `--ease-expo`, animation tokens), a custom `container` utility (90vw, capped at 1536px), and custom utilities (`text-outline`, `chroma`) live there. Fonts are loaded in `layout.tsx` via `next/font` (Roboto → `font-sans`, Big Shoulders → `font-heading`, applied to all h1–h6).

## Skills

The `frontend-design` skill is installed under `.claude/skills/` (tracked in `skills-lock.json`); use it for UI/visual design work.
