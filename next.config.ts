import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scheduler-api.edsonmarcelo.com.br',
      },
    ],
  },
}

export default nextConfig
