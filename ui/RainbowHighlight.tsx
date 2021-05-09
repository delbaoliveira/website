import React from "react"
import { getLightColor } from "@/ui/useColorSeed"
import { RoughNotation } from "react-rough-notation"

export const RainbowHighlight = ({
  colorIndex,
  text,
  className,
}: {
  colorIndex: number
  text: string
  className?: string
}) => {
  // a poor mans algo that changes the animation duration depending on length of
  // words we're animating
  const animationDuration = Math.floor(30 * text.length)

  const color = getLightColor(colorIndex)

  return (
    <span className={color}>
      <RoughNotation
        type="highlight"
        multiline={true}
        padding={[0, 2]}
        iterations={1}
        animationDuration={animationDuration}
      >
        <span className={className}>{text}</span>
      </RoughNotation>
    </span>
  )
}
