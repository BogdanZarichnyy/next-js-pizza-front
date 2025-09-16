import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  experimental: {
    serverActions: {},
    optimizeRouterScrolling: true,
  },
};

export default nextConfig;
