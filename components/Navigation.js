import cx from "clsx"
import Link from "next/link"
import React from "react"
import { FOCUS_VISIBLE_OUTLINE } from "../components/constants"
import { HighlightOnHover } from "../components/HighlightOnHover"

const Navigation = () => {
  return (
    <div className="container px-4 mx-auto mt-4 mb-10 lg:mt-8 lg:mb-20">
      <div className="lg:flex lg:items-center lg:justify-between">
        <Link href="/">
          <a
            className={cx(
              "font-medium tracking-wider transition-colors text-gray-600 hover:text-gray-800 focus:text-gray-800 uppercase rounded-sm",
              FOCUS_VISIBLE_OUTLINE,
            )}
          >
            <HighlightOnHover>Delba de Oliveira</HighlightOnHover>
          </a>
        </Link>

        <div className="flex flex-wrap -ml-5 text-gray-600 lg:-ml-8">
          <a
            className={cx(
              "font-medium block transition-colors mt-1.5 lg:mt-0 lg:ml-8 ml-5 hover:text-gray-800 focus:text-gray-800 rounded",
              FOCUS_VISIBLE_OUTLINE,
            )}
            href="#about"
          >
            <HighlightOnHover>About</HighlightOnHover>
          </a>
          <a
            className={cx(
              "font-medium block transition-colors mt-1.5 lg:mt-0 lg:ml-8 ml-5 hover:text-gray-800 focus:text-gray-800 rounded",
              FOCUS_VISIBLE_OUTLINE,
            )}
            href="#skills"
          >
            <HighlightOnHover>Skills</HighlightOnHover>
          </a>
          <a
            className={cx(
              "font-medium block transition-colors mt-1.5 lg:mt-0 lg:ml-8 ml-5 hover:text-gray-800 focus:text-gray-800 rounded",
              FOCUS_VISIBLE_OUTLINE,
            )}
            href="#projects"
          >
            <HighlightOnHover>Projects</HighlightOnHover>
          </a>
          <a
            className={cx(
              "font-medium block transition-colors mt-1.5 lg:mt-0 lg:ml-8 ml-5 hover:text-gray-800 focus:text-gray-800 rounded",
              FOCUS_VISIBLE_OUTLINE,
            )}
            href="#words"
          >
            <HighlightOnHover>Words</HighlightOnHover>
          </a>
          <a
            className={cx(
              "font-medium block transition-colors mt-1.5 lg:mt-0 lg:ml-8 ml-5 hover:text-gray-800 focus:text-gray-800 rounded",
              FOCUS_VISIBLE_OUTLINE,
            )}
            href="#contact"
          >
            <HighlightOnHover>Contact</HighlightOnHover>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navigation
