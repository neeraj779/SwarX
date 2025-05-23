import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.saavncdn.com",
      },
      {
        protocol: "https",
        hostname: "c.sop.saavncdn.com",
      },
      {
        protocol: "https",
        hostname: "www.jiosaavn.com",
      },
    ],
  },
};

export default nextConfig;
