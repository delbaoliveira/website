import { GRADIENT_LINK } from "@/lib/constants"
import { Button } from "@/ui/Button"
import { LikeButton } from "@/ui/LikeButton"
import { LinkPreview } from "@/ui/LinkPreview"
import { Playground } from "@/ui/Playground"
import NextImage from "next/image"
import NextLink from "next/link"
import React from "react"

export const components = {
  LikeButton,
  Playground,
  LinkPreview,
  Button,
  h1: (props: any) => (
    <h1
      className="mt-8 mb-4 text-4xl font-extrabold text-gray-900"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2 className="mt-8 mb-3 text-3xl font-bold text-gray-900" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mt-8 mb-5 text-2xl font-semibold text-gray-900" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="mt-6 mb-5 text-lg font-semibold text-gray-900" {...props} />
  ),
  p: (props: any) => <p className="mb-5 leading-7 text-gray-700" {...props} />,
  a: ({ href = "", ...props }) => {
    if (href.startsWith("http")) {
      return (
        <a
          className={GRADIENT_LINK}
          href={href}
          target="_blank"
          rel="noopener"
          {...props}
        />
      )
    }

    return (
      <NextLink href={href} passHref>
        <a className={GRADIENT_LINK} {...props} />
      </NextLink>
    )
  },
  hr: (props: any) => <hr {...props} />,
  ul: (props: any) => (
    <ul
      className="mb-4 leading-relaxed text-gray-700 list-disc list-inside"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="pl-10 my-12 leading-7 text-gray-700 list-decimal"
      {...props}
    />
  ),
  li: (props: any) => <li className="mt-2" {...props} />,
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
      <code className="px-1.5 py-0.5 text-sm font-mono font-medium text-gray-700 bg-orange-100 rounded-md">
        {children}
      </code>
    )
  },
}
