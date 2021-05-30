import { FOCUS_VISIBLE_OUTLINE, GRADIENT_LINK } from "@/lib/constants"
import { Transition } from "@headlessui/react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import cx from "clsx"
import Head from "next/head"
import Image from "next/image"
import React from "react"

export const LinkPreview = ({
  children,
  url,
}: {
  children: React.ReactNode
  url: string
}) => {
  const src = `https://api.microlink.io/?url=${url}&screenshot&meta=false&embed=screenshot.url`
  const quality = 50
  const width = 256
  // Prefetch link preview image because microlink + next/image can take a few
  // seconds to return and generate screenshot.
  const nextSrc = `/_next/image?url=${encodeURIComponent(
    src,
  )}&w=${width}&q=${quality}`

  const [isOpen, setOpen] = React.useState(false)

  return (
    <>
      <Head>
        <link rel="prefetch" href={nextSrc} as="image" />
      </Head>
      <HoverCardPrimitive.Root
        openDelay={50}
        onOpenChange={(open) => {
          setOpen(open)
        }}
      >
        <HoverCardPrimitive.Trigger
          href={url}
          className={cx(GRADIENT_LINK, FOCUS_VISIBLE_OUTLINE)}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content side="top" align="center" sideOffset={10}>
          <Transition
            show={isOpen}
            appear={true}
            enter="transform transition duration-300 origin-bottom ease-out"
            enterFrom="opacity-0 translate-y-2 scale-0"
            enterTo="opacity-100 translate-y-0 scale-100"
            className="shadow-xl rounded-xl"
          >
            <a
              href={url}
              className="block p-1 bg-white border border-transparent shadow rounded-xl hover:border-pink-500"
              // Unfortunate hack to remove the weird whitespace left by
              // next/image wrapper div
              // https://github.com/vercel/next.js/issues/18915
              style={{ fontSize: 0 }}
            >
              <Image
                src={src}
                width={200}
                height={125}
                className="rounded-lg"
                priority={true}
                quality={quality}
                layout="fixed"
              />
            </a>
          </Transition>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  )
}
