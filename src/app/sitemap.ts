import type { MetadataRoute } from "next";
import { SITE_URL } from "@/modules/Global";

// No lastModified: the pages are CMS-driven and we don't have a reliable
// per-page timestamp here, and a build-time date would mislead crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "about", "projects", "contact-us"].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
