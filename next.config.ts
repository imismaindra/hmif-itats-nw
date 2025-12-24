import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // config lain di sini ...
  allowedDevOrigins: ["192.168.1.3:3000", "localhost:3000", "*.localhost:3000"],
};

export default nextConfig;
