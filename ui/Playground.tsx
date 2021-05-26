import React from "react"

export function Playground({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center p-20 mb-4 border border-gray-100 rounded-md polka-bg-gray">
      {children}
    </div>
  )
}
