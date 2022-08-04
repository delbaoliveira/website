const { withContentlayer } = require("next-contentlayer")

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    images: {
      allowFutureImage: true,
      // allow next/image to serve remote images from safelisted domains
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          pathname: "/delba/**",
        },
        { hostname: "api.microlink.io" },
        { hostname: "pbs.twimg.com" },
      ],
    },
  },
  async redirects() {
    return [
      {
        source: "/interactive-playgrounds",
        destination: "/blog/interactive-playgrounds",
        permanent: true,
      },
      {
        source: "/uni",
        destination: "/unicode",
        permanent: true,
      },
      // changed slugs
      {
        source: "/blog/shimmer-loading-animation-with-tailwind-css",
        destination: "/blog/animated-loading-skeletons-with-tailwind",
        permanent: true,
      },
    ]
  },
}

module.exports = withContentlayer(nextConfig)
