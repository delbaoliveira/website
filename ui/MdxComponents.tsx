import { LINE_BREAK, FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "@/lib/constants"
import { Aside } from "@/ui/Aside"
import { BlurImage } from "@/ui/BlurImage"
import { LinkPreview } from "@/ui/LinkPreview"
import { Playground } from "@/ui/Playground"
import cx from "clsx"
import type { ImageProps } from "next/image"
import NextLink from "next/link"
import React from "react"

export const components = {
  Playground,
  LinkPreview,
  Aside,
  h1: (props: any) => (
    <h2
      className={cx(
        "relative mt-3 pt-9 text-xl font-medium text-rose-100/90 sm:text-3xl",
        LINE_BREAK,
      )}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h3
      className={cx(
        "relative mt-3 pt-9 text-xl font-medium text-rose-100/90 sm:text-2xl",
        LINE_BREAK,
      )}
      {...props}
    />
  ),
  h3: (props: any) => (
    <h4 className="text-xl font-medium text-rose-100/90" {...props} />
  ),
  h4: (props: any) => (
    <h5 className="text-lg font-medium text-rose-100/90" {...props} />
  ),
  hr: (props: any) => (
    <hr
      className={cx("relative border-0 pt-9 sm:pt-10", LINE_BREAK)}
      {...props}
    />
  ),
  p: (props: any) => <p className="text-lg text-rose-100/90" {...props} />,
  a: ({ href = "", ...props }) => {
    if (href.startsWith("http")) {
      return (
        <a
          className={cx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
          href={href}
          target="_blank"
          rel="noopener"
          {...props}
        />
      )
    }

    return (
      <NextLink href={href} passHref>
        <a className={cx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)} {...props} />
      </NextLink>
    )
  },
  ul: (props: any) => (
    <ul
      className="space-y-3 text-lg text-rose-100/90 [&>li]:relative [&>li]:pl-7 before:[&>li]:absolute before:[&>li]:left-1 before:[&>li]:top-3 before:[&>li]:h-1.5 before:[&>li]:w-1.5 before:[&>li]:rounded-full before:[&>li]:bg-rose-100/20"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="list-decimal space-y-3 pl-10 text-lg leading-7 text-rose-100/90"
      {...props}
    />
  ),
  strong: (props: any) => <strong className="font-semibold" {...props} />,
  Img: ({
    children,
    bleed = true,
    caption,
    ...props
  }: {
    children: React.ReactNode
    bleed?: boolean
    caption?: string
  } & ImageProps) => {
    return (
      <>
        <div
          className={cx({
            "xl:!col-start-2 xl:!col-end-4": bleed === true,
          })}
        >
          <BlurImage {...props} />
        </div>
        {caption ? <Aside side="right">{caption}</Aside> : null}
      </>
    )
  },
  blockquote: (props: any) => (
    <blockquote
      className="border-l-2 border-rose-200/10 pl-4 text-xl italic xl:!col-end-5"
      {...props}
    />
  ),
  del: (props: any) => <del className="line-through" {...props} />,
}
