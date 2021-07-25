import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import cx from "clsx"
import Link from "next/link"
import React from "react"

export const Navigation = () => {
  return (
    <div className="sticky top-0 z-20 py-2 bg-white md:py-6 md:mb-6">
      <div className="container px-4 mx-auto lg:max-w-4xl md:flex md:items-center md:justify-between">
        <Link href="/">
          <a
            className={cx(
              "font-medium tracking-wider transition-colors text-gray-900 hover:text-sky-500 uppercase",
              FOCUS_VISIBLE_OUTLINE,
            )}
          >
            Delba de Oliveira
          </a>
        </Link>

        <div className="flex space-x-4 font-medium text-gray-800">
          <Link href="/#about">
            <a
              className={cx(
                "transition-colors hover:text-sky-500",
                FOCUS_VISIBLE_OUTLINE,
              )}
            >
              About
            </a>
          </Link>
          <Link href="/blog">
            <a
              className={cx(
                "transition-colors hover:text-sky-500",
                FOCUS_VISIBLE_OUTLINE,
              )}
            >
              Blog
            </a>
          </Link>

          <div className="text-gray-300">&bull;</div>

          <a
            href="https://twitter.com/delba_oliveira"
            className={cx(
              "transition-colors hover:text-sky-500",
              FOCUS_VISIBLE_OUTLINE,
            )}
          >
            Twitter
          </a>
          <a
            href="https://www.youtube.com/c/delba"
            className={cx(
              "transition-colors hover:text-sky-500",
              FOCUS_VISIBLE_OUTLINE,
            )}
          >
            YouTube
          </a>
          <a
            href="https://github.com/delbaoliveira"
            className={cx(
              "transition-colors hover:text-sky-500",
              FOCUS_VISIBLE_OUTLINE,
            )}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
