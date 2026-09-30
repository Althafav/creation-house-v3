import Image from "next/image";
import FooterWordmark from "./FooterWordmark";

const FOOTER_COLS = [
  {
    title: "Services",
    links: [
      { label: "Exhibition Stands", href: "/#services" },
      { label: "Event Management", href: "/#services" },
      { label: "Audio Visual", href: "/#services" },
      { label: "Furniture Rental", href: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Selected work", href: "/projects" },

      { label: "Make an inquiry", href: "/contact-us" },
    ],
  },
];

// Same details as the header menu's "Get in touch" block.
const CONTACT = [
  { label: "info@creation-house.ae", href: "mailto:info@creation-house.ae" },
  { label: "+971 56 403 4046", href: "tel:+971564034046" },
  { label: "Al Quoz Industrial, Dubai, UAE" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/creation-house-exhibition-stand-fitting-and-execution-llc",
    icon: (
      <path
        className="fill-current"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.79-2.07 4.05 0 4.8 2.67 4.8 6.13v5.87h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75Z"
      />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ch_globle/",
    // Outline glyph: rounded camera body, lens and flash dot.
    icon: (
      <g className="fill-none stroke-current stroke-[1.8]">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r=".4" className="fill-current" />
      </g>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="rounded-t-4xl bg-black pt-14 md:pt-20 lg:pt-24 pb-6 md:pb-8 lg:pb-9">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pb-12 sm:grid-cols-3 md:gap-x-10 md:pb-16 lg:grid-cols-4 lg:pb-20">
          <div className="col-span-2 flex flex-col gap-5 sm:col-span-3 lg:col-span-1">
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Creation House on ${s.label}`}
                  className="inline-flex size-12 items-center justify-center rounded-sm border border-white/20 sm:size-14 text-white/70 transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-5.5 sm:size-6"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="mb-1 text-xs tracking-[.18em] text-white/35 uppercase">
                {col.title}
              </span>
              {col.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[14.5px] font-light text-white/70"
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
          {/* Spans both phone columns: the address is too long for half a row. */}
          <address className="col-span-2 flex flex-col gap-3 not-italic sm:col-span-1">
            <span className="mb-1 text-xs tracking-[.18em] text-white/35 uppercase">
              Contact
            </span>
            {CONTACT.map((c) =>
              c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  className="text-[14.5px] font-light text-white/70"
                >
                  {c.label}
                </a>
              ) : (
                <span
                  key={c.label}
                  className="text-[14.5px] font-light text-white/70"
                >
                  {c.label}
                </span>
              ),
            )}
          </address>
        </div>

        {/* Sized in container units: the set wordmark is ~6.7em wide, so 14.4cqi fills ~97% of the row on one line at every width. */}
        <div className="@container mb-10 flex gap-10 justify-center items-center">
          <Image
            src="/assets/imgs/ch-logo.png"
            alt="Creation House"
            width={102}
            height={80}
            className="block h-24 w-auto object-contain object-left sm:h-32 lg:h-44"
          />
          <FooterWordmark />
        </div>

        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-[12.5px] text-white/35">
          <span>© 2026 Creation House LLC · Dubai, UAE</span>
          <span>ICV Certified</span>
        </div>
      </div>
    </footer>
  );
}
