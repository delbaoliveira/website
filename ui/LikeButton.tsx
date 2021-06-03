import { usePostLikes } from "@/lib/usePostLikes"
import { LikeButtonHeart, HEART_PATH } from "@/ui/LikeButtonHeart"
import { LoadingDots } from "@/ui/LoadingDots"
import cx from "clsx"
import React from "react"

export const LikeButton = ({ id }: { id: string }) => {
  const { currentUserLikes, totalPostLikes, isLoading, increment } =
    usePostLikes(id)

  return (
    <div className="flex items-center space-x-2">
      {isLoading ? (
        <div className="text-gray-200 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d={HEART_PATH} fillRule="evenodd" clipRule="evenodd" />
          </svg>
        </div>
      ) : (
        <button className="focus:outline-none" onClick={() => increment()}>
          <LikeButtonHeart likes={currentUserLikes} />
        </button>
      )}

      {/* Like counter text */}
      <div
        className={cx("mt-1 font-medium", {
          "text-gray-400": currentUserLikes === 0,

          // Add a gradient if a user has liked a post
          "decoration-clone bg-clip-text text-transparent bg-gradient-to-b from-yellow-400 via-red-500 to-pink-500":
            currentUserLikes !== 0,
        })}
      >
        {isLoading ? <LoadingDots /> : <span>{totalPostLikes}</span>}
      </div>
    </div>
  )
}
