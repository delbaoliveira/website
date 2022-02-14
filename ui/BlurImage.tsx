import cx from "clsx"
import type { ImageProps } from "next/image"
import NextImage from "next/image"
import React from "react"

export const BlurImage = (props: ImageProps) => {
  const [isLoading, setLoading] = React.useState(true)

  return (
    <div
      className={cx(
        "flex overflow-hidden rounded-xl bg-white/[2%]",
        isLoading ? "animate-pulse" : "",
      )}
    >
      <NextImage
        {...props}
        className={cx(
          "duration-700 ease-in-out",
          isLoading
            ? "scale-105 blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0",
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}
