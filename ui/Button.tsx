import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const buttonStyles = cva("button", {
  variants: {
    intent: {
      primary: [
        "bg-blue-500",
        "text-white",
        "border-transparent",
        "hover:bg-blue-600",
      ],
      secondary: [
        "bg-white",
        "text-gray-800",
        "border-gray-400",
        "hover:bg-gray-100",
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
  },
  compoundVariants: [
    { intent: "primary", size: "medium", className: "uppercase" },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
})

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>

export const Button = ({ className, intent, size, ...props }: ButtonProps) => (
  <button className={buttonStyles({ intent, size, className })} {...props} />
)
