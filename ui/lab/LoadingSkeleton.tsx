import React from "react"

export const LoadingSkeleton = () => {
  return (
    <div className="relative space-y-5 overflow-hidden rounded-2xl bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
      <div className="h-24 rounded-lg bg-rose-100/10"></div>
      <div className="space-y-3">
        <div className="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
        <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
        <div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
      </div>
    </div>
  )
}
