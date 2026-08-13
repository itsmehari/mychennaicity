import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/ads.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=300, must-revalidate",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/data/chennai-map/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
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
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.adotrip.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dc-cdn.s3-ap-southeast-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.news9live.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.vccircle.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imagesvs.oneindia.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gumlet-images.assettype.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.etimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.isro.gov.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/ticket9-prod.appspot.com/**",
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
      {
        source: "/international-yoga-day-2026-chennai-yoga-for-healthy-ageing",
        destination:
          "/chennai-local-news/international-yoga-day-2026-chennai-yoga-for-healthy-ageing",
        permanent: true,
      },
      {
        source:
          "/chennai-local-news/reader-listing-perumbakkam-grade3-tuition-teacher-june-2026",
        destination:
          "/chennai-classifieds/tuition-teacher-wanted-grade3-perumbakkam",
        permanent: true,
      },
      {
        source:
          "/chennai-guides/bulk-waste-generator-readiness-checklist-2026",
        destination:
          "/guides/bulk-waste-generator-readiness-checklist-2026",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
