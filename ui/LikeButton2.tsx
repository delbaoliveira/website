import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { usePostLikes } from "@/lib/usePostLikes"
import { LoadingDots } from "@/ui/LoadingDots"
import HeartIcon from "@heroicons/react/solid/HeartIcon"
import cx from "clsx"
import React from "react"

const emojis = ["👍", "🙏", "🥰"]

// A visual component that...
// 1. Fills a heart shape with a gradient depending on the number of likes passed
// 2. Animates a thank you emoji as the number of likes increase
export const LikeButton2 = ({ id }: { id: string }) => {
  const { currentUserLikes, totalPostLikes, isLoading, increment } =
    usePostLikes(id)

  let [animatedEmojis, setAnimatedEmojis] = React.useState<string[]>(
    currentUserLikes ? [emojis[currentUserLikes]] : [],
  )

  const handleClick = () => {
    increment()
    if (currentUserLikes <= 2) {
      setAnimatedEmojis([...animatedEmojis, emojis[currentUserLikes]])
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        {/* Thank you emojis */}
        {animatedEmojis.map((emoji, index) => {
          return (
            <div
              key={index}
              className="absolute w-full text-center opacity-0 animate-emoji"
            >
              {emoji}
            </div>
          )
        })}

        <button
          className={cx(
            "bg-black block rounded-lg transform transition-all overflow-hidden ease-out duration-300 shadow-lg shadow-black/90 hover:shadow-purple-500/50 hover:scale-110 active:translate-y-1 hover:rounded-[10px]",
            FOCUS_VISIBLE_OUTLINE,
          )}
          onClick={handleClick}
        >
          <div
            className={cx("p-1 bg-gradient-to-tl from-white/5 to-white/30", {
              "animate-pulse": isLoading,
            })}
          >
            <div
              className={cx(
                "absolute inset-0 transform transition-transform bg-gradient-to-tl from-purple-500 to-rose-400",
                {
                  "translate-y-6": currentUserLikes === 0,
                  "translate-y-4": currentUserLikes === 1,
                  "translate-y-2": currentUserLikes === 2,
                },
              )}
            />

            <HeartIcon className="relative w-5 text-rose-100" />
          </div>
        </button>
      </div>

      {/* Like counter text */}
      <div className="text-lg font-medium leading-none text-rose-100/90">
        {isLoading ? <LoadingDots /> : <span>{totalPostLikes}</span>}
      </div>
    </div>
  )
}
