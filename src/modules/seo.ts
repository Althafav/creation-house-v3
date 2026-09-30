import { cache } from "react";
import type { Metadata } from "next";
import { deliveryClient } from "@/modules/Global";

/** One Kontent fetch per request, shared by `generateMetadata` and the page. */
export const getPageElements = cache(
  async (codename: string): Promise<any> => {
    try {
      const { data } = await deliveryClient
        .item(codename)
        .depthParameter(2)
        .toPromise();
      return data.item.elements;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[seo] Could not fetch "${codename}" from Kontent.ai.`, error);
      }
      return {};
    }
  },
);

/** Title/description from the item's `metadata__*` elements, falling back to defaults. */
export async function getPageMetadata(
  codename: string,
  path: string,
  fallback: { title?: string; description: string },
): Promise<Metadata> {
  const el = await getPageElements(codename);
  const title =
    el.metadata__metatitle?.value?.trim() ||
    el.metadata__pagetitle?.value?.trim() ||
    fallback.title;
  const description =
    el.metadata__metadescription?.value?.trim() || fallback.description;
  return {
    // Omit `title` when unset so the layout default applies. Home has no
    // template suffix, so an absolute title is used there.
    ...(title && { title: path === "/" ? { absolute: title } : title }),
    description,
    alternates: { canonical: path },
  };
}
