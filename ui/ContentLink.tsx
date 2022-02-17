import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import cx from "clsx"
import Link from "next/link"
import React, { ElementType } from "react"

export function ContentLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href}>
      <a
        className={cx(
          "block rounded-2xl bg-white/[2%] p-7 shadow-surface-elevation-low transition duration-300 hover:bg-white/[3%] hover:shadow-surface-elevation-medium",
          FOCUS_VISIBLE_OUTLINE,
        )}
      >
        {children}
      </a>
    </Link>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl transition duration-300 text-rose-100/80 line-clamp-2 hover:text-rose-100/90">
      {children}
    </h3>
  )
}

function Icon(props: { icon: ElementType }) {
  return (
    <div className="mt-1 ml-2 shrink-0">
      <props.icon className="w-5 transition-colors text-rose-100/30 hover:text-rose-100/50" />
    </div>
  )
}

function Text({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-lg text-gray-400/90 line-clamp-3">{children}</p>
  )
}

function Meta({ items }: { items: string[] }) {
  return (
    <div className="text-gray-500/90">
      {items.map((x, i) => {
        return (
          <React.Fragment key={i}>
            {x}
            {i + 1 < items.length ? (
              <>
                {" "}
                <span className="text-gray-500/30">&middot;</span>{" "}
              </>
            ) : null}
          </React.Fragment>
        )
      })}
    </div>
  )
}

ContentLink.Title = Title
ContentLink.Icon = Icon
ContentLink.Text = Text
ContentLink.Meta = Meta
