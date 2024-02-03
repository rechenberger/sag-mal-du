/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'd39ob9hwkmfin1.cloudfront.net',
      },
    ],
  },
}

module.exports = nextConfig
