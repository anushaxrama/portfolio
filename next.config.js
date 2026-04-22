/** @type {import('next').NextConfig} */

// Apply static export only for production builds. When `output: 'export'` is set
// during `next dev`, webpack/HMR often corrupts `.next` (e.g. Cannot find module './682.js').
const staticExport = process.argv.includes('build')

const nextConfig = {
  reactStrictMode: true,
  ...(staticExport ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Extra safety in dev: persistent webpack disk cache + HMR can still desync chunk IDs.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }
    return config
  },
}

module.exports = nextConfig
