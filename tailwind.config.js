const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
const colors = require("tailwindcss/colors")
const hexToRgb = require("hex-to-rgb")

const highlightColor = hexToRgb(colors.amber["200"]).join(",")

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts}",
    "./posts/**/*.mdx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Karla", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        amber: colors.amber,
        orange: colors.orange,
        lime: colors.lime,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        lightBlue: colors.lightBlue,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
        sky: colors.sky,
        gray: colors.warmGray,
      },
      animation: {
        "loading-0": "loading 1.4s ease-in-out infinite",
        "loading-1": "loading 1.4s ease-in-out 0.2s infinite",
        "loading-2": "loading 1.4s ease-in-out 0.4s infinite",
      },
      scale: {
        200: "2",
        300: "3",
      },
      keyframes: {
        loading: {
          "0%": {
            opacity: ".2",
          },
          "20%": {
            opacity: "1",
          },
          to: {
            opacity: ".2",
          },
        },
      },
      boxShadow: {
        "surface-glass": `
          inset 0.25px 1px 0 0 rgba(${highlightColor}, 0.02),
          0px 0.3px 0.3px rgba(3, 2, 2, 0.02),
          0px 2.2px 2.5px -0.4px rgba(3, 2, 2, 0.02),
          0px 4.3px 4.8px -0.8px rgba(3, 2, 2, 0.02),
          0px 7.5px 8.4px -1.2px rgba(3, 2, 2, 0.02),
          0px 12.8px 14.4px -1.7px rgba(3, 2, 2, 0.02),
          0px 21px 23.6px -2.1px rgba(3, 2, 2, 0.02),
          0px 33.2px 37.4px -2.5px rgba(3, 2, 2, 0.02)`,
        "surface-highlight": `inset 0.25px 1px 1px 0 rgba(${highlightColor}, 0.9)`,
        // inspired by https://www.joshwcomeau.com/shadow-palette/
        "surface-elevation-low": `
          inset 0.25px 1px 1px 0 rgba(${highlightColor}, 0.015), 
          0.3px 0.5px 0.7px rgba(3, 2, 2, 0.2),
          0.4px 0.8px 1px -1.2px rgba(3, 2, 2, 0.2),
          1px 2px 2.5px -2.5px rgba(3, 2, 2, 0.2);`,
        "surface-elevation-medium": `
          inset 0.25px 1px 1px 0 rgba(${highlightColor}, 0.03),
          0.3px 0.5px 0.7px rgba(3, 2, 2, 0.1),
          0.8px 1.6px 2px -0.8px rgba(3, 2, 2, 0.1),
          2.1px 4.1px 5.2px -1.7px rgba(3, 2, 2, 0.1),
          5px 10px 12.6px -2.5px rgba(3, 2, 2, 0.1)`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".rounded-tl-xl": {
          "border-radius-top-left": "1rem",
        },
        ".rounded-tr-xl": {
          "border-radius-top-right": "1rem",
        },
        ".rounded-bl-xl": {
          "border-radius-bottom-left": "1rem",
        },
        ".rounded-br-xl": {
          "border-radius-bottom-right": "1rem",
        },
      }
      addUtilities(newUtilities)
    }),
    // https://gist.github.com/samselikoff/b3c5126ee4f4e69e60b0af0aa5bfb2e7
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`,
          )}`
        })
      })
    }),
  ],
}
