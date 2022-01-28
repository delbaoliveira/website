import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import clsx from "clsx"
import Link from "next/link"
import React from "react"

export function ContentLink({
  href,
  title,
  text,
  meta,
  Icon,
}: {
  href: string
  title: string
  text: string
  meta?: string[]
  Icon?: React.FunctionComponent<any>
}) {
  return (
    <Link href={href}>
      <a
        className={clsx(
          "block rounded-2xl bg-white/[2%] p-7 shadow-surface-elevation-low transition duration-300 hover:bg-white/[3%] hover:shadow-surface-elevation-medium",
          FOCUS_VISIBLE_OUTLINE,
        )}
      >
        <div className="flex items-start justify-between">
          <h3 className="text-xl text-rose-100/80 transition duration-300 line-clamp-2 hover:text-rose-100/90">
            {title}
          </h3>

          {Icon ? (
            <div className="mt-1 ml-2 shrink-0">
              <Icon className="w-5 text-rose-100/30 transition-colors hover:text-rose-100/50" />
            </div>
          ) : null}
        </div>

        {meta && meta.length > 0 ? (
          <div className="text-gray-500/90">
            {meta.map((x, i) => {
              return (
                <React.Fragment key={i}>
                  {x}
                  {i + 1 < meta.length ? (
                    <>
                      {" "}
                      <span className="text-gray-500/30">&middot;</span>{" "}
                    </>
                  ) : null}
                </React.Fragment>
              )
            })}
          </div>
        ) : null}

        <p className="mt-4 text-lg text-gray-400/90 line-clamp-3">{text}</p>
      </a>
    </Link>
  )
}
