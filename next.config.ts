import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "nobroker.in", pathname: "/blog/wp-content/uploads/**" },
      { protocol: "https", hostname: "www.nobroker.in", pathname: "/blog/wp-content/uploads/**" },
    ],
  },
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
