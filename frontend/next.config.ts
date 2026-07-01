import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Proxy to PHP backend hosted in XAMPP
        source: '/api/:path*',
        destination: 'http://localhost/LMS%20Frist/backend/api/:path*.php', 
      },
    ]
  }
};

export default nextConfig;
