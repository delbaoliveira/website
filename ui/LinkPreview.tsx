import { FOCUS_VISIBLE_OUTLINE, GRADIENT_LINK } from "@/lib/constants"
import { Portal, Transition } from "@headlessui/react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import cx from "clsx"
import Image from "next/image"
import { encode } from "qss"
import React from "react"

export const LinkPreview = ({
  children,
  url,
}: {
  children: React.ReactNode
  url: string
}) => {
  const [isOpen, setOpen] = React.useState(false)

  const width = 200
  const height = 125
  const quality = 50
  const layout = "fixed"

  const params = encode({
    url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": true,
    "viewport.deviceScaleFactor": 1,

    // To capture useful content, the screenshot viewport needs to be bigger
    // than our images but maintain the same ratio
    "viewport.width": width * 3,
    "viewport.height": height * 3,
  })

  const src = `https://api.microlink.io/?${params}`

  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      {/**
       * Microlink.io + next/image can take a few seconds to fetch and generate
       * a screenshot. The delay makes <LinkPreview> pointless. As a hacky
       * solution we create a second <Image> in a Portal after the component has
       * mounted. This <Image> triggers microlink.io + next/image so that the
       * image itself is ready by the time the user hovers on a <LinkPreview>.
       * Not concerned about the performance impact because <Image>'s are cached
       * after they are generated and the images themselves are tiny (< 10kb).
       */}
      {isMounted ? (
        <Portal>
          <div className="hidden">
            <Image
              src={src}
              width={width}
              height={height}
              quality={quality}
              layout={layout}
              priority={true}
            />
          </div>
        </Portal>
      ) : null}

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
                width={width}
                height={height}
                quality={quality}
                layout={layout}
                priority={true}
                className="rounded-lg"
              />
            </a>
          </Transition>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  )
}
