/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // This allows builds to complete even with ESLint warnings
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;