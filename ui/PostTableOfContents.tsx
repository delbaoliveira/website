"use client"

import { FormattedPost } from "@/lib/contentlayer"
import clsx from "clsx"

export const PostTableOfContents = ({
  headings,
}: {
  headings: NonNullable<FormattedPost["headings"]>
}) => {
  return (
    <div>
      <div className="mb-2.5 text-xs uppercase text-rose-200/30">
        On this page
      </div>

      <ul className="space-y-2.5 text-sm">
        {headings.map((heading) => {
          return (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                className={clsx(
                  "block text-rose-200/50 underline-offset-2 transition-all hover:text-rose-100 hover:underline hover:decoration-rose-200/50",
                  {
                    "pl-3": heading.heading === 2,
                    "pl-6": heading.heading === 3,
                  },
                )}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
