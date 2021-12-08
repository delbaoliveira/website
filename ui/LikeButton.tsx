import { usePostLikes } from "@/lib/usePostLikes"
import { LoadingDots } from "@/ui/LoadingDots"
import HeartIcon from "@heroicons/react/solid/HeartIcon"
import { motion } from "framer-motion"
import React from "react"

const emojis = ["👍", "🙏", "🥰"]

// A visual component that...
// 1. Fills a heart shape with a gradient depending on the number of likes passed
// 2. Animates a thank you emoji as the number of likes increase
export const LikeButton = ({ id }: { id: string }) => {
  const { currentUserLikes, totalPostLikes, isLoading, increment } =
    usePostLikes(id)

  return (
    <div className="flex items-center space-x-2">
      <button
        className="focus:outline-none"
        onClick={() => {
          if (isLoading) return

          increment()
        }}
      >
        <div className="relative">
          {/* Thank you emojis */}
          <div className="absolute w-full text-2xl text-center">
            {emojis.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  className="absolute w-full"
                  // Animate each emoji when `likes` equals their index
                  animate={currentUserLikes === index + 1 ? "show" : "hide"}
                  variants={{
                    hide: { translateY: -80, opacity: 0 },
                    show: {
                      translateY: [0, -40, -60],
                      opacity: [0, 1, 0],
                    },
                  }}
                  initial="hide"
                >
                  {item}
                </motion.div>
              )
            })}
          </div>

          {/* Heart SVG */}
          <motion.div
            className={`relative flex items-center justify-center overflow-hidden rounded-lg w-7 h-7 bg-gradient-to-tl from-white/5 to-white/30 ${
              isLoading && `animate-pulse`
            }`}
            // Animated onHover and onClick
            whileHover="hover"
            whileTap="active"
            variants={{
              hover: {
                scale: 1.15,
              },
              active: {
                scale: 1.3,
              },
            }}
          >
            <motion.div
              className="absolute w-full h-full inset bg-gradient-to-tl from-purple-500 to-rose-400"
              // `animate` passes a stringified `like` to the variants map below
              animate={String(currentUserLikes)}
              // Move gradient up or down depending on number of likes
              variants={{
                // 0 likes
                "0": { translateY: 25 },
                // 1 like etc
                "1": { translateY: 20 },
                "2": { translateY: 10 },
                "3": { translateY: 0 },
              }}
              initial="0"
            />

            <HeartIcon className="relative w-5 text-rose-100" />
          </motion.div>
        </div>
      </button>

      {/* Like counter text */}
      <div className="text-lg text-rose-100/90">
        {isLoading ? <LoadingDots /> : <span>{totalPostLikes}</span>}
      </div>
    </div>
  )
}
