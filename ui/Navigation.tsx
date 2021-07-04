import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import cx from "clsx"
import Link from "next/link"
import React from "react"
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai"

export const Navigation = () => {
  return (
    <div className="sticky top-0 z-10 py-2 bg-white md:py-6 md:mb-6">
      <div className="container px-4 mx-auto lg:max-w-4xl md:flex md:items-center md:justify-between">
        <Link href="/">
          <a
            className={cx(
              "font-medium tracking-wider transition-colors text-gray-900 hover:text-sky-500 focus:text-sky-500 uppercase",
              FOCUS_VISIBLE_OUTLINE,
            )}
          >
            Delba de Oliveira
          </a>
        </Link>

        <div className="flex items-center -ml-5 text-gray-900 lg:-ml-8">
          <Link href="/#about">
            <a
              className={cx(
                "font-medium block transition-colors mt-1.5 lg:mt-0 lg:ml-8 ml-5 hover:text-sky-500 focus:text-sky-500 rounded",
                FOCUS_VISIBLE_OUTLINE,
              )}
            >
              About
            </a>
          </Link>

          <Link href="/blog">
            <a
              className={cx(
                "font-medium block transition-colors mt-1.5 lg:mt-0 lg:ml-8 ml-5 hover:text-sky-500 focus:text-sky-500 rounded",
                FOCUS_VISIBLE_OUTLINE,
              )}
            >
              Blog
            </a>
          </Link>

          <Link href="/#projects">
            <a
              className={cx(
                "font-medium block transition-colors mt-1.5 lg:mt-0 lg:ml-8 ml-5 hover:text-sky-500 focus:text-sky-500 rounded",
                FOCUS_VISIBLE_OUTLINE,
              )}
            >
              Projects
            </a>
          </Link>

          <p className="flex pl-6 space-x-3 text-xl">
            <a
              href="https://twitter.com/delba_oliveira"
              className={cx(
                "transition-colors text-gray-900 hover:text-sky-500 focus:text-sky-500 cursor-pointer rounded",
                FOCUS_VISIBLE_OUTLINE,
              )}
              target="_blank"
            >
              <AiOutlineTwitter></AiOutlineTwitter>
            </a>
            <a
              href="https://github.com/delbaoliveira"
              className={cx(
                "transition-colors text-gray-900 hover:text-sky-500 focus:text-sky-500 cursor-pointer rounded",
                FOCUS_VISIBLE_OUTLINE,
              )}
              target="_blank"
            >
              <AiOutlineGithub></AiOutlineGithub>{" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
