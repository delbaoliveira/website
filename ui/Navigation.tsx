import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import TwitterIcon from "@/ui/TwitterIcon"
import AnnotationIcon from "@heroicons/react/solid/AnnotationIcon"
import VideoCameraIcon from "@heroicons/react/solid/VideoCameraIcon"
import cx from "clsx"
import Link from "next/link"
import React from "react"

export const Navigation = () => {
  return (
    <div className="flex items-center space-x-7 leading-none text-rose-100/90 sm:text-lg">
      <Link href="/videos">
        <a className={cx("group rounded-lg", FOCUS_VISIBLE_OUTLINE)}>
          <div className="sm:flex sm:items-center sm:space-x-2">
            <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
              <div className="rounded-lg bg-gradient-to-tl from-purple-500/80 to-rose-400/80 p-1 shadow-lg transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] active:scale-100 active:rounded-lg group-hover:shadow-purple-500/50">
                <VideoCameraIcon className="w-[18px] transform text-rose-100 transition delay-100 duration-500 ease-out hover:scale-110" />
              </div>
            </div>
            <div className="transition-colors hover:text-rose-200/90">
              Videos
            </div>
          </div>
        </a>
      </Link>
      <Link href="/blog">
        <a className={cx("group rounded-lg", FOCUS_VISIBLE_OUTLINE)}>
          <div className="sm:flex sm:items-center sm:space-x-2">
            <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
              <div className="rounded-lg bg-gradient-to-tl from-purple-500/80 to-rose-400/80 p-1 shadow-lg transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] active:scale-100 active:rounded-lg group-hover:shadow-purple-500/50">
                <AnnotationIcon className="w-[18px] transform text-rose-100 transition delay-100 duration-500 ease-out hover:scale-110" />
              </div>
            </div>
            <div className="transition-colors hover:text-rose-200/90">
              Posts
            </div>
          </div>
        </a>
      </Link>

      <a
        className={cx("group rounded-lg", FOCUS_VISIBLE_OUTLINE)}
        href="https://twitter.com/delba_oliveira"
      >
        <div className="sm:flex sm:items-center sm:space-x-2">
          <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
            <div className="rounded-lg bg-gradient-to-tl from-purple-500/80 to-rose-400/80 p-1 shadow-lg transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] active:scale-100 active:rounded-lg group-hover:shadow-purple-500/50">
              <TwitterIcon className="w-[18px] transform text-rose-100 transition delay-100 duration-500 ease-out hover:scale-110" />
            </div>
          </div>
          <div className="transition-colors hover:text-rose-200/90">
            Twitter
          </div>
        </div>
      </a>
    </div>
  )
}
