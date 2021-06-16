import { useTheme } from "next-themes"
import React from "react"

export const ThemeSelect = () => {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <select
      className="py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
      value={theme}
      onChange={(e) => setTheme(e.currentTarget.value)}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  )
}
