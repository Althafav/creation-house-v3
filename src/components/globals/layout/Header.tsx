"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MENU_LINKS = [
  { num: "01", label: "About Us", href: "/about" },
  { num: "02", label: "Services", href: "/#services" },
  { num: "03", label: "Projects", href: "/projects" },
  // { num: "04", label: "Process", href: "/#process" },
];

const CONTACT_ROWS = [
  {
    label: "Email",
    value: "info@creation-house.ae",
    href: "mailto:info@creation-house.ae",
  },
  { label: "Phone", value: "+971 56 403 4046", href: "tel:+971564034046" },
  { label: "Studio", value: "Al Quoz Industrial, Dubai, UAE", href: "" },
];

const BAR =
  "block h-[1.5px] w-5 rounded-sm bg-white transition-[transform,translate,rotate,opacity] duration-[450ms] ease-expo";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Keep the page behind the open menu from scrolling.
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-80 flex animate-fade items-center justify-between gap-4 bg-black px-4 md:px-10 lg:px-16 py-4  backdrop-blur-[14px] sm:gap-6 sm:py-5">
        <Link href="/" className="flex items-center gap-3 text-white">
          <Image
            src="/assets/imgs/ch-logo.png"
            alt="Creation House"
            width={46}
            height={46}
            className="block h-10 w-auto object-contain sm:h-11.5"
          />
        </Link>
        <nav className="flex items-center gap-3 md:gap-4 lg:gap-5">
          <span
            title="ICV Certified"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-[10px] bg-white px-2.5 sm:h-10.5 sm:px-3"
          >
            <Image
              src="/assets/imgs/icv-logo.png"
              alt="ICV Certified — National In-Country Value Program"
              width={64}
              height={64}
              className="block h-8 w-auto object-contain sm:h-16"
            />
          </span>
          <a
            href="/contact-us"
            className="shine-btn hidden shrink-0 sm:inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,#8be2c6,#b9f0dd_55%,#8be2c6)] px-[22px] py-3 text-[13.5px] font-semibold tracking-normal whitespace-nowrap text-black shadow-[0_12px_30px_-14px_rgba(139,226,198,.9),inset_0_1px_0_rgba(255,255,255,.5)] transition-[translate,box-shadow] duration-500 ease-expo hover:-translate-y-0.5 hover:text-black hover:shadow-[0_18px_40px_-16px_rgba(139,226,198,1),inset_0_1px_0_rgba(255,255,255,.7)]"
          >
            <span className="relative">Make an inquiry</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 shrink-0 sm:size-11.5 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 bg-transparent transition-colors duration-200 hover:border-accent"
          >
            <span
              className={`${BAR} ${open ? "translate-y-[3.75px] rotate-45" : ""}`}
            />
            <span
              className={`${BAR} ${open ? "-translate-y-[3.75px] -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>

      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-90 bg-black/70 transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-y-0 right-0 z-100 flex w-full flex-col overflow-y-auto overscroll-contain bg-[#ece8e0] px-6 py-8 text-black transition-transform duration-700 ease-expo sm:w-[440px] sm:px-10 sm:py-10 lg:w-[35vw] lg:max-w-[560px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-heading text-4xl leading-none font-extrabold uppercase">
            Menu
          </span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="inline-flex size-14 cursor-pointer items-center justify-center rounded-full border border-black transition-colors duration-200 hover:bg-black hover:text-[#ece8e0]"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <nav className="mt-8 flex flex-col">
          {MENU_LINKS.map((ml) => (
            <Link
              key={ml.label}
              href={ml.href}
              onClick={closeMenu}
              className="group flex items-baseline gap-4 font-heading text-5xl leading-[1.15] font-extrabold uppercase transition-colors duration-200 hover:text-[#2f7f78] sm:text-6xl"
            >
              <span className="font-mono text-sm font-semibold text-[#2f7f78]">
                {ml.num}
              </span>
              {ml.label}
            </Link>
          ))}
        </nav>

        <div className="mt-9 flex flex-col gap-6 border-t border-black/20 pt-9">
          {CONTACT_ROWS.map((r) => (
            <div key={r.label} className="flex flex-col gap-1">
              <span className="font-mono text-xs tracking-[.18em] text-black/60 uppercase">
                {r.label}
              </span>
              {r.href ? (
                <a
                  href={r.href}
                  className="text-xl text-black transition-colors duration-200 hover:text-[#2f7f78] sm:text-2xl"
                >
                  {r.value}
                </a>
              ) : (
                <span className="text-xl text-black sm:text-2xl">{r.value}</span>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
