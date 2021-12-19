import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "@/lib/constants"
import { LinkPreview } from "@/ui/LinkPreview"
import { Playground } from "@/ui/Playground"
import cx from "clsx"
import NextImage from "next/image"
import NextLink from "next/link"
import React from "react"

export const components = {
  Playground,
  LinkPreview,
  h1: (props: any) => (
    <h1 className="mt-8 mb-4 text-5xl font-medium" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="mt-8 mb-3 text-3xl font-medium" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mt-8 mb-5 text-xl font-medium" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="mt-6 mb-5 text-lg font-medium" {...props} />
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
  hr: (props: any) => <hr {...props} />,
  ul: (props: any) => <ul className="mb-6" {...props} />,
  ol: (props: any) => (
    <ol className="pl-10 my-12 leading-7 list-decimal" {...props} />
  ),
  li: (props: any) => (
    <li
      className="relative pl-7 my-3 before:absolute before:bg-gray-600 before:rounded-full before:w-1.5 before:h-1.5 before:left-1 before:top-3"
      {...props}
    />
  ),
  strong: (props: any) => <strong className="font-semibold" {...props} />,
  Image: ({ children, ...props }: { children: React.ReactNode }) => (
    <figure className="my-5">
      <NextImage {...(props as any)} />
      {children && (
        <figcaption className="mt-2 text-sm text-gray-500">
          {children}
        </figcaption>
      )}
    </figure>
  ),
  img: ({ children, ...props }: { children: React.ReactNode }) => (
    <div className="my-5">
      <NextImage {...(props as any)} />
    </div>
  ),
  blockquote: (props: any) => (
    <blockquote
      className="pl-8 my-4 italic font-medium border-l-2 border-gray-200"
      {...props}
    />
  ),
  del: (props: any) => <del className="line-through" {...props} />,

  // TODO:
  pre: ({ children, ...props }: { children: React.ReactNode }) => {
    return (
      <pre className="" {...props}>
        {children}
      </pre>
    )
  },
  code: ({ children }: { children: React.ReactNode }) => {
    return (
      <code className="px-2 py-0.5 text-sm font-mono bg-gray-700/60 text-gray-300/90 rounded-md">
        {children}
      </code>
    )
  },
}
