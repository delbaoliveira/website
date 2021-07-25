import { Screen } from "@/ui/challenge/Screen"
import { IconInstagram } from "@/ui/IconInstagram"
import React from "react"

export const AnimatedBackground = () => {
  return (
    <Screen>
      <div className="relative w-full h-80">
        <div className="w-full h-full origin-center animate-background-spin">
          <div className="w-full h-full transform scale-x-150 scale-y-300 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-500"></div>
        </div>
        <div className="absolute flex top-2/4 right-2/4">
          <IconInstagram className="w-20 h-20 -mt-10 -mr-10 text-white" />
        </div>
      </div>
    </Screen>
  )
}
