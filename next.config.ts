import type { NextConfig } from "next";

const longTermAssetHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: longTermAssetHeaders,
      },
      {
        source: "/uploads/:path*",
        headers: longTermAssetHeaders,
      },
      {
        source: "/images/:path*",
        headers: longTermAssetHeaders,
      },
      {
        source: "/logo.:extension(png|svg|jpg)",
        headers: longTermAssetHeaders,
      },
    ];
  },
};

export default nextConfig;
