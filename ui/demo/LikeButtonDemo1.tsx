import { Heart } from "@/ui/Heart"
import React from "react"

export const LikeButtonDemo1 = ({
  initialLikes = 1,
  enableCounts = true,
  enableEmojis = false,
}: {
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
    <div className="flex items-center space-x-5">
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
          enableEmojis={direction === "up" && enableEmojis}
          className="w-20"
        />
      </button>

      {enableCounts ? (
        <div className="mt-1 font-mono text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 via-red-500 to-pink-500">
          {likes}
        </div>
      ) : null}
    </div>
  )
}
