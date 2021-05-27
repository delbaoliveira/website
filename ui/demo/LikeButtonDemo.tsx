import { Heart, HEART_PATH } from "@/ui/Heart"
import { LoadingDots } from "@/ui/LoadingDots"
import React from "react"

export const LikeButtonDemo = ({
  isLoading,
  initialLikes = 1,
  enableCounts = true,
  enableEmojis = false,
}: {
  isLoading?: boolean
  initialLikes?: number
  enableEmojis?: boolean
  enableCounts?: boolean
}) => {
  const [likes, setLikes] = React.useState(initialLikes)
  const [direction, setDirection] = React.useState("up")

  React.useEffect(() => {
    if (likes === 0) {
      setDirection("up")
    }

    if (likes === 3) {
      setDirection("down")
    }
  }, [likes])

  return (
    <div className="flex items-center space-x-4">
      {isLoading ? (
        <>
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
        </>
      ) : (
        <>
          <button
            className="focus:outline-none"
            onClick={() => {
              if (direction === "up") {
                setLikes((p) => p + 1)
              } else {
                setLikes((p) => p - 1)
              }
            }}
          >
            <Heart
              likes={likes}
              enableEmojis={(direction === "up" || likes === 3) && enableEmojis}
              className="w-20"
            />
          </button>

          {enableCounts ? (
            <div className="mt-1 font-mono text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 via-red-500 to-pink-500">
              {likes}
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
