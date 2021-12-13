import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import TwitterIcon from "@/ui/TwitterIcon"
import AnnotationIcon from "@heroicons/react/solid/AnnotationIcon"
import VideoCameraIcon from "@heroicons/react/solid/VideoCameraIcon"
import cx from "clsx"
import Link from "next/link"
import React from "react"

export const Navigation = () => {
  return (
    <div className="flex items-center leading-none sm:text-lg space-x-7 text-rose-100/90">
      <Link href="/videos">
        <a
          className={cx(
            "group transition-colors hover:text-rose-200/90 rounded-lg",
            FOCUS_VISIBLE_OUTLINE,
          )}
        >
          <div className="sm:items-center sm:space-x-2 sm:flex">
            <div className="flex justify-center mb-1.5 sm:block sm:mb-0">
              <div className="p-1 transition-shadow rounded-lg shadow-lg bg-gradient-to-tl from-purple-500/60 to-rose-400/60 group-hover:shadow-rose-500/25">
                <VideoCameraIcon className="w-4 text-rose-50/50" />
              </div>
            </div>
            <div>Videos</div>
          </div>
        </a>
      </Link>
      <Link href="/blog">
        <a
          className={cx(
            "group transition-colors hover:text-rose-200/90 rounded-lg",
            FOCUS_VISIBLE_OUTLINE,
          )}
        >
          <div className="sm:items-center sm:space-x-2 sm:flex">
            <div className="flex justify-center mb-1.5 sm:block sm:mb-0">
              <div className="p-1 transition-shadow rounded-lg shadow-lg bg-gradient-to-tl from-purple-500/60 to-rose-400/60 group-hover:shadow-rose-500/25">
                <AnnotationIcon className="w-4 text-rose-50/50" />
              </div>
            </div>
            <div>Posts</div>
          </div>
        </a>
      </Link>

      <a
        className={cx(
          "group transition-colors hover:text-rose-200/90 rounded-lg",
          FOCUS_VISIBLE_OUTLINE,
        )}
        href="https://twitter.com/delba_oliveira"
      >
        <div className="sm:items-center sm:space-x-2 sm:flex">
          <div className="flex justify-center mb-1.5 sm:block sm:mb-0">
            <div className="p-1 transition-shadow rounded-lg shadow-md shadow-gray-900 bg-gradient-to-tl from-purple-500/60 to-rose-400/60 group-hover:shadow-rose-500/25">
              <TwitterIcon className="w-4 text-rose-50/50" />
            </div>
          </div>
          <div>Twitter</div>
        </div>
      </a>
    </div>
  )
}
