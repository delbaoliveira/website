import delbaImg from "@/public/delba-profile.jpg"
import clsx from "clsx"
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
      className={clsx(
        "rounded-full shadow-lg bg-gradient-to-tl from-purple-700/60 to-rose-400/60",
        {
          "p-[3px]": size === "small",
          "p-1 ": size === "large",
          "hover:from-purple-700 hover:to-rose-400": isInteractive,
        },
      )}
    >
      <div
        className={clsx("p-[2px] rounded-full bg-black/60", {
          "w-[38px] h-[38px]": size === "small",
          "w-[66px] h-[66px]": size === "large",
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
