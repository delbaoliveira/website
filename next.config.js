const { withContentlayer } = require("next-contentlayer")

/**
 * @type {import('next').NextConfig}
 */
module.exports = withContentlayer({
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
  images: {
    domains: [
      "api.microlink.io", // Link previews
      "pbs.twimg.com", // Twitter Profile Picture
    ],
  },
})
