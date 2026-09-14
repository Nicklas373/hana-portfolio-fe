import type { NextConfig } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_PATH;

const nextConfig: NextConfig = {
  assetPrefix: baseUrl,
  basePath: baseUrl,
  output: "standalone",
};

export default nextConfig;
