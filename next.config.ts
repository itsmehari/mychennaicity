import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/events",
        destination: "/chennai-local-events",
        permanent: true,
      },
      {
        source: "/events/:path*",
        destination: "/chennai-local-events/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
