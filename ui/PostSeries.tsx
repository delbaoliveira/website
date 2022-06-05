import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "@/lib/constants"
import { getPartialPost } from "@/lib/contentlayer"
import cx from "clsx"
import Link from "next/link"
import React from "react"

export const PostSeries = ({
  data,
}: {
  data: NonNullable<ReturnType<typeof getPartialPost>["series"]>
}) => {
  return (
    <div className="my-8 rounded-2xl bg-white/5 p-6 shadow-surface-elevation-low lg:-mx-8 lg:px-8 lg:py-7">
      <div className="text-sm uppercase text-rose-100/50">Series</div>
      <div className="text-xl font-medium text-rose-100/90">{data.title}</div>

      <hr className="my-5 border-t-2 border-rose-300/5" />

      <ul>
        {data.posts.map((p) => (
          <li
            key={p.slug}
            className={cx(
              "relative my-3 pl-7 before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full",
              {
                "before:bg-rose-300/90 before:ring-[3px] before:ring-purple-400/20 before:ring-offset-1 before:ring-offset-black/10":
                  p.isCurrent,
                "before:bg-rose-100/30":
                  p.status === "published" && !p.isCurrent,
                "before:bg-rose-100/10": p.status !== "published",
              },
            )}
          >
            {p.status === "published" ? (
              p.isCurrent ? (
                <span className="text-rose-50/90">{p.title}</span>
              ) : (
                <Link href={`/blog/${p.slug}`}>
                  <a className={cx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}>
                    {p.title}
                  </a>
                </Link>
              )
            ) : (
              <span className="text-rose-100/50">{p.title}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
