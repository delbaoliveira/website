import React from "react"

export function Playground({
  children,
  description,
}: {
  children: React.ReactNode
  description?: string
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-center p-20 border border-gray-100 rounded-md polka-bg-gray">
        {children}
      </div>
      {description ? (
        <div className="mt-3 text-sm text-gray-400">{description}</div>
      ) : null}
    </div>
  )
}
