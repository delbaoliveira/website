import delbaImg from "@/public/delba-oliveira.jpg"
import cx from "clsx"
import Image from "next/image"
import React from "react"

export const ProfileImage = ({
  size = "large",
  isInteractive,
}: {
  size: "small" | "large"
  isInteractive?: boolean
}) => {
  return (
    <div
      className={cx(
        "rounded-full bg-gradient-to-tl from-purple-700/60 to-rose-400/60 shadow-lg",
        {
          "p-[2px]": size === "small",
          "p-[3px]": size === "large",
          "group transform transition ease-out hover:scale-105 hover:from-purple-700 hover:to-rose-400 hover:shadow-rose-500/25":
            isInteractive,
        },
      )}
    >
      <div
        className={cx("rounded-full p-[1px]", {
          "h-[36px] w-[36px]": size === "small",
          "h-[64px] w-[64px]": size === "large",
        })}
      >
        <Image
          src={delbaImg}
          alt="A photo of Delba"
          priority={true}
          className="rounded-full"
          width={size === "small" ? 36 : 64}
          height={size === "small" ? 36 : 64}
        />
      </div>
    </div>
  )
}
