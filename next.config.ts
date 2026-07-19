import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon.svg",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
