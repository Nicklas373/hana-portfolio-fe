import type { NextConfig } from "next";

const baseUrl = process.env.APP_BASE_PATH;

const nextConfig: NextConfig = {
  assetPrefix: baseUrl,
  // basePath: baseUrl,
  output: "standalone",
};

export default nextConfig;
