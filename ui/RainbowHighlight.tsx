import React from "react"
import { RoughNotation } from "react-rough-notation"

export const RainbowHighlight = ({
  color,
  children,
  type = "highlight",
}: {
  color: string
  children: string
  type: string
}) => {
  // Change the animation duration depending on length of text we're animating (speed = distance / time)
  const animationDuration = Math.floor(30 * children.length)

  return (
    <RoughNotation
      type={type}
      multiline={true}
      padding={[0, 2]}
      iterations={1}
      animationDuration={animationDuration}
      color={color}
    >
      {children}
    </RoughNotation>
  )
}
