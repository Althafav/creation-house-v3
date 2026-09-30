import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    // Allowed `quality` values for next/image (About and ServiceRow use 70).
    qualities: [70, 75],

    // Kontent.ai asset CDN (used by CMS-driven images such as ScrollRevealImage).
    remotePatterns: [
      { protocol: "https", hostname: "assets.kontent.ai" },
      { protocol: "https", hostname: "**.kc-usercontent.com" },
    ],
  },
};

export default nextConfig;
