import cx from "clsx"
import Image from "next/future/image"

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
          "group transform transition ease-out hover:scale-105 hover:from-purple-700 hover:to-rose-400 hover:shadow-rose-500/25 active:translate-y-[1px]":
            isInteractive,
          "ring-[4px] ring-purple-500/5 ring-offset-1 ring-offset-black/5":
            !isInteractive,
        },
      )}
    >
      <div
        className={cx("rounded-full p-[1px]", {
          "h-[36px] w-[36px]": size === "small",
          "h-[64px] w-[64px]": size === "large",
          "transition duration-300 group-hover:scale-105": isInteractive,
        })}
      >
        <Image
          src="https://res.cloudinary.com/delba/image/twitter_name/c_thumb,g_face,h_380,w_380,q_100/delba_oliveira.jpg"
          alt="A photo of Delba"
          quality={95}
          priority={true}
          className="rounded-full"
          width={size === "small" ? 36 : 64}
          height={size === "small" ? 36 : 64}
        />
      </div>
    </div>
  )
}
