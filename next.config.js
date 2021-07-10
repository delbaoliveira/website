module.exports = {
  async redirects() {
    return [
      {
        source: "/challenge",
        destination: "/#projects",
        permanent: true,
      },
      {
        source: "/challenge/about",
        destination: "/blog/challenge-00",
        permanent: true,
      },
      {
        source: "/challenge/day-01",
        destination: "/blog/challenge-01",
        permanent: true,
      },
    ]
  },
  // Enable image optimization for microlinks.io
  images: {
    domains: ["api.microlink.io", "twemoji.maxcdn.com"],
  },
}
