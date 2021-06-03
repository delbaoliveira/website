import { LikeButtonHeart, HEART_PATH } from "@/ui/LikeButtonHeart"
import { LoadingDots } from "@/ui/LoadingDots"
import { motion } from "framer-motion"
import React from "react"

const SkeletonHeart = ({
  likes,
  className = "w-12",
}: {
  likes: number
  className?: string
}) => {
  return (
    // viewbox is taller here to ensure we show the offscreen gradient in the
    // demo
    <svg viewBox="0 0 20 40" className={className}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FACC15", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#EF4444", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#EC4899", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      <motion.rect
        fill="url(#gradient)"
        width={18}
        height={18}
        rx={3}
        // Animation
        animate={String(likes)}
        x="1"
        y="1"
        initial="0"
        variants={{
          "0": { translateY: 18 },
          "1": { translateY: 12 },
          "2": { translateY: 8 },
          "3": { translateY: 1 },
        }}
      />

      <path
        d={HEART_PATH}
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.3}
        strokeWidth={0.4}
      />
    </svg>
  )
}

export const LikeButtonDemo = ({
  isLoading,
  initialLikes = 1,
  enableCounts = true,
  enableEmojis = false,
  isSkeleton = false,
}: {
  isLoading?: boolean
  isSkeleton?: boolean
  initialLikes?: number
  enableEmojis?: boolean
  enableCounts?: boolean
}) => {
  const [likes, setLikes] = React.useState(initialLikes)
  const [countDirection, setCountDirection] = React.useState("up")

  React.useEffect(() => {
    if (likes === 0) {
      setCountDirection("up")
    }

    if (likes === 3) {
      setCountDirection("down")
    }
  }, [likes])

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-gray-300 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d={HEART_PATH} fillRule="evenodd" clipRule="evenodd" />
          </svg>
        </div>
        <div className="mt-1">
          <LoadingDots />
        </div>
      </div>
    )
  }

  if (isSkeleton) {
    return (
      <button
        className="focus:outline-none"
        onClick={() => {
          if (countDirection === "up") {
            setLikes((p) => p + 1)
          } else {
            setLikes((p) => p - 1)
          }
        }}
      >
        <div className="flex space-x-8 text-center">
          <div>
            <div className="mb-2 text-[11px] font-bold tracking-wide uppercase text-gray-600 bg-white shadow-sm border px-1 py-0.5 rounded-full">
              Mask off
            </div>
            <SkeletonHeart className="w-20" likes={likes} />
          </div>

          <div>
            <div className="mb-2 text-[11px] font-bold tracking-wide uppercase text-gray-600 bg-white shadow-sm border px-1 py-0.5 rounded-full">
              Mask on
            </div>
            <LikeButtonHeart
              likes={likes}
              isLarge={true}
              enableEmojis={false}
            />
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        className="focus:outline-none"
        onClick={() => {
          if (countDirection === "up") {
            setLikes((p) => p + 1)
          } else {
            setLikes((p) => p - 1)
          }
        }}
      >
        <LikeButtonHeart
          likes={likes}
          enableEmojis={
            (countDirection === "up" || likes === 3) && enableEmojis
          }
          className="w-20"
        />
      </button>

      {enableCounts ? (
        <div className="mt-1 font-mono text-3xl font-medium text-transparent decoration-clone bg-clip-text bg-gradient-to-b from-yellow-400 via-red-500 to-pink-500">
          {likes}
        </div>
      ) : null}
    </div>
  )
}
