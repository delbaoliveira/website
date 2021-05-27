const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    "./posts/**/*.mdx",
    // force tailwind jit to include css rules in compiled css
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
