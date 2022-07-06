import cx from "clsx"
import type { ImageProps } from "next/image"
import NextImage from "next/future/image"
import React from "react"

export const BlurImage = (props: ImageProps) => {
  const [isLoading, setLoading] = React.useState(true)

  return (
    <div
      className={cx(
        "relative flex overflow-hidden rounded-xl bg-white/[2%] after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-xl after:border after:border-rose-200/10 after:content-['']",
        isLoading ? "animate-pulse" : "",
      )}
    >
      <NextImage
        {...props}
        className={cx(
          "rounded-xl duration-700 ease-in-out",
          isLoading
            ? "scale-[1.02] blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0",
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}
