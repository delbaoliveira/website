import React from "react"
import cx from "clsx"

const colors = [
  "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
  "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
  "bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500",
  "bg-gradient-to-r from-green-400 to-blue-500",
  "bg-gradient-to-r from-green-500 to-green-700",
  "bg-gradient-to-r from-gray-500 via-gray-100 to-gray-500",
]

export const GradientBorder = () => {
  const [colorIndex, setColorIndex] = React.useState(0)

  const gradientColor = colors[colorIndex]

  return (
    <div>
      <div
        className={cx(
          "flex justify-center w-56 p-1 rounded-md h-14",
          gradientColor,
        )}
        role="button"
      >
        <div className="flex items-center justify-center flex-grow text-white bg-black rounded">
          <p>Gradient Border</p>
        </div>
      </div>
      <div className="flex mt-10 space-x-4 rounded">
        {colors.map((color, index) => {
          return (
            <div
              key={index}
              className={cx(
                "h-6 w-6 rounded cursor-pointer transform ring-1 ring-offset-2 ring-white ring-offset-black",
                color,
                {
                  "ring-opacity-100": colorIndex === index,
                  "ring-opacity-0 hover:ring-opacity-50": colorIndex !== index,
                },
              )}
              onClick={() => setColorIndex(index)}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
