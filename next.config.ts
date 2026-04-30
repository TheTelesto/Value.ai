import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/Value.ai',
  images: { unoptimized: true },
}

export default nextConfig
