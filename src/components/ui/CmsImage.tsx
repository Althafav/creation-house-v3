"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";

/**
 * Resize Kontent.ai assets on Kontent's own image CDN instead of the Next.js
 * optimizer, which would download and re-encode every CMS image on our server.
 * https://kontent.ai/learn/docs/apis/image-transformation-api
 */
const kontentLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  return url.toString();
};

const isKontentAsset = (src: ImageProps["src"]) =>
  typeof src === "string" &&
  /^https:\/\/([^/]+\.)?(kc-usercontent\.com|assets\.kontent\.ai)(:443)?\//.test(
    src,
  );

/** `next/image` that serves Kontent.ai URLs straight from Kontent's CDN. */
export default function CmsImage({ alt, ...props }: ImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      loader={isKontentAsset(props.src) ? kontentLoader : undefined}
    />
  );
}
