import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  experimental: {
    serverActions: {},
    optimizeRouterScrolling: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;