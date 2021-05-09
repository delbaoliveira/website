import { useHover } from "@react-aria/interactions"
import React from "react"
import { RoughNotation } from "react-rough-notation"

export const HighlightOnHover = ({ children, color = "#EAEAEA" }) => {
  let { hoverProps, isHovered } = useHover({})

  return (
    <RoughNotation
      type="underline"
      color={color}
      show={isHovered}
      strokeWidth={2}
      iterations={1}
      padding={2}
      animationDuration={300}
      {...hoverProps}
    >
      {children}
    </RoughNotation>
  )
}
