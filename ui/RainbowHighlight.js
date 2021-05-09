import React from "react"
import { getLightColor } from "@/ui/useColorSeed"
import { RoughNotation } from "react-rough-notation"

export const RainbowHighlight = ({ colorIndex, children, className }) => {
  // a poor mans algo that changes the animation duration depending on length of
  // words we're animating
  const animationDuration =
    React.Children.count(children) === 1
      ? Math.floor(30 * children.length)
      : 500

  const color = getLightColor(colorIndex)

  return (
    <span className={color}>
      <RoughNotation
        type="highlight"
        padding={0}
        multiline={true}
        padding={[0, 2]}
        iterations={1}
        animationDuration={animationDuration}
      >
        <span className={className}>{children}</span>
      </RoughNotation>
    </span>
  )
}
