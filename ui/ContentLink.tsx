import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import clsx from "clsx"
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
    <Link
      href={href}
      className={clsx(
        "block overflow-hidden rounded-2xl bg-white/5 p-7 shadow-surface-elevation-low transition duration-300 hover:bg-white/10 hover:shadow-surface-elevation-medium",
        FOCUS_VISIBLE_OUTLINE,
      )}
    >
      {children}
    </Link>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl text-rose-100/90 transition duration-300 line-clamp-2 hover:text-rose-100/90">
      {children}
    </h3>
  )
}

function Icon(props: { icon: ElementType }) {
  return (
    <div className="mt-1 ml-2 shrink-0">
      <props.icon className="w-5 text-rose-100/30 transition-colors hover:text-rose-100/50" />
    </div>
  )
}

function Text({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-lg text-rose-100/70 line-clamp-3">{children}</p>
  )
}

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap space-x-2 text-base text-rose-100/50">
      {children}
    </div>
  )
}

ContentLink.Title = Title
ContentLink.Icon = Icon
ContentLink.Text = Text
ContentLink.Meta = Meta
