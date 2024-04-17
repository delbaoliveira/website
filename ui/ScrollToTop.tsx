"use client"

import React from "react"

export const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      className="text-sm text-rose-200/30 hover:text-rose-200/70"
      onClick={() => {
        window.scrollTo({ top: 0 })
      }}
    >
      {children}
    </button>
  )
}
