import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    baseUrl: "https://linked-posts.routemisr.com",
  },
  images: {
    domains: ["linked-posts.routemisr.com"],
  },
};

export default nextConfig;
