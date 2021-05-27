import cx from "clsx"
import React from "react"
import { useInterval } from "react-use"

export const TextSlider = ({
  slides,
}: {
  slides: [string, string, string]
}) => {
  const [currentSlide, setSlide] = React.useState(0)

  const totalSlides = slides.length

  useInterval(() => {
    if (totalSlides - 1 === currentSlide) {
      setSlide(0)
    } else {
      setSlide(currentSlide + 1)
    }
  }, 2000)

  return (
    <>
      {slides.map((text, i) => {
        return (
          <span key={text} className="relative block">
            <span
              className={cx("absolute text-gray-800 transition duration-1000", {
                "opacity-0": currentSlide === i,
                "opacity-100": currentSlide !== i,
              })}
              aria-hidden={true}
            >
              {text}
            </span>

            <span
              className={cx(
                "decoration-clone bg-clip-text text-transparent bg-gradient-to-r",
                {
                  "from-green-400 to-blue-500": i === 0,
                  "from-purple-400 via-pink-500 to-red-500": i === 1,
                  "from-yellow-400 via-red-500 to-pink-500": i === 2,
                },
              )}
            >
              {text}
            </span>
          </span>
        )
      })}
    </>
  )
}
