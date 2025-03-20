/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  trailingSlash: true, // Ensures correct routing
  images: { unoptimized: true }, // Required for static exports
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
