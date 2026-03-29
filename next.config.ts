import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "pplx-res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "metrorailnews.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.amazon.jobs",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
        pathname: "/**",
      },
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
      {
        source: "/jobs",
        destination: "/chennai-jobs",
        permanent: true,
      },
      {
        source: "/jobs/:slug",
        destination: "/chennai-jobs/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
