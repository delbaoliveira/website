import Link from "next/link"
import React from "react"
import ExternalLinkIcon from "@heroicons/react/solid/ExternalLinkIcon"
import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import clsx from "clsx"

export function ContentLink({
  href,
  title,
  text,
  meta,
}: {
  href: string
  title: string
  text: string
  meta?: string[]
}) {
  const isExternal = href.startsWith("http")
  return (
    <Link href={href}>
      <a
        className={clsx(
          "block p-7 rounded-2xl transition duration-300 bg-white/[2%] hover:bg-white/[3%] shadow-surface-elevation-low hover:shadow-surface-elevation-medium",
          FOCUS_VISIBLE_OUTLINE,
        )}
      >
        <h3 className="text-xl transition duration-300 line-clamp-2 text-rose-100/80 hover:text-rose-200/90">
          {title}

          {isExternal ? (
            <>
              {" "}
              <ExternalLinkIcon className="inline w-5 mb-0.5 align-middle opacity-50" />
            </>
          ) : null}
        </h3>

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
