const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/posts/**/*.mdx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-hubot)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.stone,
      },
      keyframes: ({ theme }) => ({
        mutation: {
          "0%": {
            background: theme("colors.rose.200 / 3%"),
          },
          "10%": {
            background: theme("colors.rose.200 / 15%"),
            color: theme("colors.rose.200 / 75%"),
          },
          "100%": {
            background: theme("colors.rose.200 / 0%"),
          },
        },
        emoji: {
          "0%": {
            opacity: "0",
            transform: "translateY(0) scale(0)",
          },
          "50%": {
            opacity: "1",
            transform: "translateY(-40px) scale(1)",
          },
          to: {
            opacity: "0",
            transform: "translateY(-60px) scale(1.4)",
          },
        },
        loading: {
          "0%": {
            opacity: ".2",
          },
          "20%": {
            opacity: "1",
            transform: "translateX(1px)",
          },
          to: {
            opacity: ".2",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      }),
      boxShadow: ({ theme }) => ({
        // inspired by https://www.joshwcomeau.com/shadow-palette/
        "surface-glass": `
          inset 0.25px 1px 0 0 ${theme("colors.rose.200 / 3%")},
          0px 0.3px 0.3px rgba(3, 2, 2, 0.02),
          0px 2.2px 2.5px -0.4px rgba(3, 2, 2, 0.02),
          0px 4.3px 4.8px -0.8px rgba(3, 2, 2, 0.02),
          0px 7.5px 8.4px -1.2px rgba(3, 2, 2, 0.02),
          0px 12.8px 14.4px -1.7px rgba(3, 2, 2, 0.02),
          0px 21px 23.6px -2.1px rgba(3, 2, 2, 0.02),
          0px 33.2px 37.4px -2.5px rgba(3, 2, 2, 0.02)`,
        "surface-elevation-low": `
          inset 0.25px 1px 1px 0 ${theme("colors.rose.200 / 1.5%")}, 
          0.3px 0.5px 0.7px rgba(3, 2, 2, 0.2),
          0.4px 0.8px 1px -1.2px rgba(3, 2, 2, 0.2),
          1px 2px 2.5px -2.5px rgba(3, 2, 2, 0.2);`,
        "surface-elevation-medium": `
          inset 0.25px 1px 1px 0 ${theme("colors.rose.200 / 3%")},
          0.3px 0.5px 0.7px rgba(3, 2, 2, 0.1),
          0.8px 1.6px 2px -0.8px rgba(3, 2, 2, 0.1),
          2.1px 4.1px 5.2px -1.7px rgba(3, 2, 2, 0.1),
          5px 10px 12.6px -2.5px rgba(3, 2, 2, 0.1)`,
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        ".layout-sm": {
          "grid-template-columns": `1fr min(${theme("screens.sm")},100%) 1fr`,
        },
        ".layout-xl": {
          "grid-template-columns": `1fr minmax(auto,${theme(
            "spacing.60",
          )}) min(${theme("screens.sm")},100%) minmax(auto,${theme(
            "spacing.60",
          )}) 1fr`,
        },
      })
    }),
    require("@tailwindcss/forms"),
  ],
}
