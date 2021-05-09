const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
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
