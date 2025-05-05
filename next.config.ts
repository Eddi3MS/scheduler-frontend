import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edsonmarcelo.com',
      },
    ],
  },
}

export default nextConfig
