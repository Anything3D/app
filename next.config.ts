import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Required for static exports if using next/image
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
