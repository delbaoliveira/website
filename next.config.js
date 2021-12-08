module.exports = {
  async redirects() {
    return [
      {
        source: "/interactive-playgrounds",
        destination: "/blog/interactive-playgrounds",
        permanent: true,
      },
    ]
  },
  // Enable image optimization for microlinks.io
  images: {
    domains: ["api.microlink.io"],
  },
}
