import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "@/lib/constants"
import { BlurImage } from "@/ui/BlurImage"
import { Files } from "@/ui/Files"
import { LinkPreview } from "@/ui/LinkPreview"
import { Playground } from "@/ui/Playground"
import cx from "clsx"
import type { ImageProps } from "next/image"
import NextLink from "next/link"
import React from "react"

export const components = {
  Files,
  Playground,
  LinkPreview,
  h1: (props: any) => (
    <h2
      className="mt-12 mb-8 border-t-2 border-rose-100/[15%] pt-9 text-3xl font-medium text-rose-100/90"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h3
      className="mt-12 mb-8 border-t-2 border-rose-100/[15%] pt-9 text-2xl font-medium text-rose-100/90"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h4
      className="mt-12 mb-8 text-xl font-medium text-rose-100/90"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h5 className="mt-6 mb-5 text-lg font-medium text-rose-100/90" {...props} />
  ),
  p: (props: any) => <p className="mb-5 leading-7" {...props} />,
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
  hr: (props: any) => (
    <hr {...props} className="my-12 border-t-2 border-rose-100/[15%]" />
  ),
  ul: (props: any) => <ul className="mb-6" {...props} />,
  ol: (props: any) => (
    <ol className="my-12 list-decimal pl-10 leading-7" {...props} />
  ),
  li: (props: any) => (
    <li
      className="relative my-3 pl-7 before:absolute before:left-1 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full before:bg-rose-100/20"
      {...props}
    />
  ),
  strong: (props: any) => <strong className="font-semibold" {...props} />,
  Img: ({ children, ...props }: { children: React.ReactNode } & ImageProps) => {
    return (
      <figure className="my-8 lg:-mx-12">
        <BlurImage {...props} />

        {children ? (
          <figcaption className="mt-2 text-sm italic text-gray-500">
            {children}
          </figcaption>
        ) : null}
      </figure>
    )
  },
  img: ({ children, ...props }: { children: React.ReactNode } & ImageProps) => (
    <div className="my-8">
      <BlurImage {...props} />
    </div>
  ),
  blockquote: (props: any) => (
    <blockquote
      className="my-8 border-l-4 border-rose-200/10 pl-4 italic lg:-mx-12"
      {...props}
    />
  ),
  del: (props: any) => <del className="line-through" {...props} />,
}
