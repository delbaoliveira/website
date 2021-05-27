import React from "react"
import cx from "clsx"

export function Playground({
  children,
  description,
  isDark,
}: {
  children: React.ReactNode
  description?: string
  isDark?: boolean
}) {
  return (
    <div className="mb-6">
      <div
        className={cx(
          "flex items-center justify-center px-6 py-12 rounded-md md:px-10 md:py-20",
          {
            "polka-bg-gray border border-gray-100": !isDark,
            "polka-bg-white bg-black": isDark,
          },
        )}
      >
        {children}
      </div>
      {description ? (
        <div className="mt-3 text-sm text-gray-400">{description}</div>
      ) : null}
    </div>
  )
}
