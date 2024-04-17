"use client"

import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "@/lib/constants"
import { FormattedPost } from "@/lib/contentlayer"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import Link from "next/link"
import React from "react"

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="text-xs uppercase text-rose-200/50">Series</div>
      <div className="text-lg font-medium text-rose-200/80">{children}</div>
    </div>
  )
}

export const PostSeries = ({
  data,
  isInteractive = false,
}: {
  data: NonNullable<FormattedPost["series"]>
  isInteractive?: boolean
}) => {
  const [isOpen, setIsOpen] = React.useState(!isInteractive)
  const currentIndex = data.posts.findIndex((post) => post.isCurrent) + 1

  return (
    <div className="rounded-2xl bg-rose-100/[3%] p-5 shadow-surface-elevation-low lg:px-6">
      {isInteractive ? (
        <button
          className="group flex w-full items-center text-left"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <Title>
            {data.title}
            <span className="font-normal text-rose-200/50">
              {" "}
              &middot; {currentIndex} of {data.posts.length}
            </span>
          </Title>

          <div className="ml-auto pl-4">
            <div className="rounded-full bg-rose-200/10 p-2 text-rose-100 group-hover:bg-rose-200/20">
              {isOpen ? (
                <ChevronUpIcon className="w-5" />
              ) : (
                <ChevronDownIcon className="w-5" />
              )}
            </div>
          </div>
        </button>
      ) : (
        <Title>{data.title}</Title>
      )}

      <div
        className={clsx({
          hidden: !isOpen,
          block: isOpen,
        })}
      >
        <hr className="my-5 border-t-2 border-rose-200/5" />

        <ul className="text-base">
          {data.posts.map((p) => (
            <li
              key={p.slug}
              className={clsx(
                "relative my-3 pl-7 before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full",
                {
                  "before:bg-rose-300/90 before:ring-[3px] before:ring-purple-400/20 before:ring-offset-1 before:ring-offset-black/10":
                    p.isCurrent,
                  "before:bg-rose-200/30":
                    p.status === "published" && !p.isCurrent,
                  "before:bg-rose-200/10": p.status !== "published",
                },
              )}
            >
              {p.status === "published" ? (
                p.isCurrent ? (
                  <span className="text-rose-200/90">{p.title}</span>
                ) : (
                  <Link
                    href={`/blog/${p.slug}`}
                    className={clsx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
                  >
                    {p.title}
                  </Link>
                )
              ) : (
                <span className="text-rose-200/50">{p.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
