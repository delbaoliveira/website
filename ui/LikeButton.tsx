import { usePostLikes } from "@/ui/usePostLikes"
import cx from "clsx"
import { motion } from "framer-motion"
import React from "react"

const path =
  "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"

const emojiVariants = {
  hidden: { x: 10, y: 0, opacity: 0 },
  show: {
    x: 10,
    y: [-24, -50, -80],
    opacity: [0, 1, 0],
  },
}

const fillVariants = {
  "0": { translateY: 17 },
  "1": { translateY: 12 },
  "2": { translateY: 8 },
  "3": { translateY: 1 },
}

const emojis = ["👍", "🙏", "🥰"]

const HeartButton = ({
  increment,
  bgColor = "#ccc",
  currentUserLikes,
}: {
  increment: () => void
  bgColor?: string
  currentUserLikes: number
}) => {
  return (
    <button className="focus:outline-none" onClick={() => increment()}>
      <div className="relative">
        {/* Thank you emojis */}
        <div className="absolute text-2xl">
          {emojis.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              className="absolute"
              // Animate each emoji after a like action
              animate={currentUserLikes === i + 1 && "show"}
              variants={emojiVariants}
            >
              {item}
            </motion.div>
          ))}
        </div>

        {/* Heart */}
        <motion.svg
          initial={false}
          animate={String(currentUserLikes)}
          viewBox="0 0 20 20"
          className="w-12 text-red-600"
          style={{ originX: "50%", originY: "50%" }}
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
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#FACC15", stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#EF4444", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#EC4899", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          {/* Heart shape mask */}
          <mask id="mask" mask-type="alpha" maskUnits="userSpaceOnUse">
            <path d={path} />
          </mask>

          <g mask="url(#mask)">
            {/* Background */}
            <rect width="20" height="20" fill={bgColor} />

            {/* Fill */}
            <motion.rect
              width="16"
              height="16"
              x="2"
              y="2"
              fill="url(#grad1)"
              variants={fillVariants}
            />
          </g>
        </motion.svg>
      </div>
    </button>
  )
}

export const LikeButton = ({ id }: { id: string }) => {
  const { currentUserLikes, totalPostLikes, isLoading, increment } =
    usePostLikes(id)

  return (
    <div className="flex items-center space-x-2">
      {isLoading ? (
        <div className="text-gray-300 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d={path} fillRule="evenodd" clipRule="evenodd" />
          </svg>
        </div>
      ) : (
        <HeartButton
          increment={increment}
          currentUserLikes={currentUserLikes}
        />
      )}

      <div
        className={cx("mt-1 font-medium transition-colors", {
          "text-gray-500": currentUserLikes === 0,
          "bg-clip-text text-transparent bg-gradient-to-b from-yellow-400 via-red-500 to-pink-500":
            currentUserLikes !== 0,
        })}
      >
        {totalPostLikes}
      </div>
    </div>
  )
}
