// app/(routes)/register-interest/page.tsx

import ContactForm from "@/components/contact/ContactForm";
import PageBanner from "@/components/ui/PageBanner";
import Section from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start an inquiry with Creation House for exhibition stands, events, audio visual or furniture rental in Dubai.",
  alternates: { canonical: "/contact-us" },
};

// Same details as the header menu and footer.
const DIRECT = [
  { label: "Phone / WhatsApp", value: "+971 56 403 4046", href: "tel:+971564034046" },
  {
    label: "Email",
    value: "info@creation-house.ae",
    href: "mailto:info@creation-house.ae",
  },
  { label: "Studio and factory", value: "Al Quoz Industrial, Dubai, UAE", href: "" },
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Creation+House+Al+Quoz+Industrial+Dubai";

async function getJSON<T>(url: string): Promise<T> {
  // Server-side fetch with no caching because this is dynamic data
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return (await res.json()) as T;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  // Pull from query string (e.g., ?attendAs=Speaker&mainsource=...&subsource=...)
  const params = await searchParams;

  const mainsource = params.mainsource ?? "";
  const subsource = params.subsource ?? "";

  // Countries and codes from your API
  type Option = { label: string; value: string };
  const [CountriesData, CountriesCode] = await Promise.all([
    getJSON<Option[]>("https://api.strategic.ae/api/generic/countries").catch(
      () => [] as Option[],
    ),
    getJSON<Option[]>(
      "https://api.strategic.ae/api/generic/countrycodes",
    ).catch(() => [] as Option[]),
  ]);

  return (
    <div className="selection:bg-primary selection:text-black">
      <PageBanner
        title={"Contact Us"}
        description="Tell us what you're building: a stand, an event, screens or furniture. The more you share, the better our first answer."
        breadcrumbs={[{ label: "Contact us" }]}
      />

      <Section spacing="none" className="mt-6 mb-16 md:mb-24 lg:mt-10">
        <div className="container grid items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* Direct lines: for anyone who would rather call than fill in a form. */}
          <aside className="rounded-3xl bg-black p-7 text-white sm:p-10 lg:sticky lg:top-28 lg:p-12">
            <h2 className="font-heading text-5xl leading-[0.9] font-semibold md:text-6xl">
              Prefer to talk?
            </h2>
            <address className="mt-10 grid gap-8 not-italic">
              {DIRECT.map((d) => (
                <div key={d.label} className="grid gap-1.5">
                  <span className="text-sm text-white/65">{d.label}</span>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="w-fit text-xl font-light break-all text-white underline decoration-white/25 decoration-1 underline-offset-8 transition-colors duration-200 hover:text-primary hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-2xl"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <span className="text-xl font-light text-white sm:text-2xl">
                      {d.value}
                    </span>
                  )}
                </div>
              ))}
            </address>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex min-h-12 items-center rounded-full border border-white/30 px-6 text-[15px] font-medium text-white transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Open in Google Maps
            </a>
          </aside>

          <ContactForm
            CountriesCode={CountriesCode}
            CountriesData={CountriesData}
            mainsource={mainsource}
            subsource={subsource}
          />
        </div>
      </Section>
    </div>
  );
}

export const revalidate = 30;
