/** @type {import('next').NextConfig} */
const replitDevOrigin = process.env.REPLIT_DEV_DOMAIN
  ? `https://${process.env.REPLIT_DEV_DOMAIN}`
  : undefined
const replitDevHost = process.env.REPLIT_DEV_DOMAIN

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  experimental: {
    // Allow large file uploads (up to 1GB) via Server Actions / Route Handlers
    serverActions: {
      bodySizeLimit: "1024mb",
    },
  },
  allowedDevOrigins: [
    'http://localhost:5000',
    'http://0.0.0.0:5000',
    replitDevHost,
    replitDevOrigin,
  ].filter(Boolean),
  async rewrites() {
    return [
      {
        source: '/__mockup/:path*',
        destination: 'http://localhost:23636/__mockup/:path*',
      },
    ]
  },
}

export default nextConfig
