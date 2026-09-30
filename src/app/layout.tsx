import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/globals/layout/Header";
import Footer from "@/components/globals/layout/Footer";
import { SITE_NAME, SITE_URL } from "@/modules/Global";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

// Self-hosted: next/font/google has no fallback metrics for Big Shoulders Display
// and warns on every build.
const bigShoulders = localFont({
  src: "./fonts/BigShouldersDisplay-Variable.woff2",
  weight: "100 900",
  variable: "--font-big-shoulders",
  display: "swap",
});

const DESCRIPTION =
  "Creation House designs and builds exhibition stands, events, audio visual and furniture rental — fabricated in our own factory in Dubai, UAE.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Creation House — Exhibition Stands & Events, Dubai",
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary",
  },
};

// Only facts already published in the header and footer.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}assets/imgs/ch-logo.png`,
  email: "info@creation-house.ae",
  telephone: "+971564034046",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Quoz Industrial",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  sameAs: [
    "https://www.linkedin.com/company/creation-house-exhibition-stand-fitting-and-execution-llc",
    "https://www.instagram.com/ch_globle/",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.variable} ${bigShoulders.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\u003c"),
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
