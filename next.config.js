const { createMdxtsPlugin } = require('mdxts/next');
const withMdxts = createMdxtsPlugin({
    theme: 'nord',
    gitSource: "https://github.com/delbaoliveira/website"
});

const { withContentlayer } = require("next-contentlayer")

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    modularizeImports: {
        "@heroicons/react/24/outline": {
            transform: "@heroicons/react/24/outline/{{member}}",
        },
        "@heroicons/react/24/solid": {
            transform: "@heroicons/react/24/solid/{{member}}",
        },
        "@heroicons/react/20/solid": {
            transform: "@heroicons/react/20/solid/{{member}}",
        },
    },
    images: {
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

module.exports = withMdxts(withContentlayer(nextConfig));
