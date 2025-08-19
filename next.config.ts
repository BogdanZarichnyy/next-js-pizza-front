import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizeRouterScrolling: true,
  },
};

export default nextConfig;
