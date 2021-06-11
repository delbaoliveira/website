const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts}",
    "./posts/**/*.mdx",

    // Force tailwind jit to include css rules in compiled css. Specifically,
    // `.rough-notation` which is not in the above whitelisted files because it
    // is rendered by a package. More info:
    // https://tailwindcss.com/docs/just-in-time-mode#known-limitations
    "./safelist.txt",
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
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
      },
      animation: {
        "loading-0": "loading 1.4s ease-in-out infinite",
        "loading-1": "loading 1.4s ease-in-out 0.2s infinite",
        "loading-2": "loading 1.4s ease-in-out 0.4s infinite",
        "background-spin": "halfSpin 15s ease-in-out infinite",
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
        halfSpin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(150deg)",
          },
          to: {
            transform: "rotate(0deg)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
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
  ],
}
