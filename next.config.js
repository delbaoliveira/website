const { withContentlayer } = require("next-contentlayer")

/**
 * @type {import('next').NextConfig}
 */
module.exports = withContentlayer({
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
    ]
  },
})
