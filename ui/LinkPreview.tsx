import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "@/lib/constants"
import { Transition } from "@headlessui/react"
import DotsCircleHorizontalIcon from "@heroicons/react/solid/DotsCircleHorizontalIcon"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import cx from "clsx"
import { useTheme } from "next-themes"
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
  const { resolvedTheme } = useTheme()

  const width = 200
  const height = 125
  const layout = "fixed"
  const q = 90

  // Simplifies things by encoding our microlink params into a query string.
  const params = encode({
    url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",

    // Capture the external site in dark mode if the current user prefers dark
    // mode and the external site uses a `prefers-color-scheme` based solution.
    colorScheme: resolvedTheme,
    "viewport.isMobile": true,

    // To capture useful content, the screenshot viewport needs to be bigger
    // than our images but maintain the same ratio
    "viewport.width": width * 3,
    "viewport.height": height * 3,
  })

  const src = `https://api.microlink.io/?${params}`

  const [isOpen, setIsOpen] = React.useState(false)

  // Microlink.io can take a few seconds to fetch and generate a screenshot.
  // Fetch the image url when the component mounts to ensure the image is ready
  // (screenshot taken, next/image generated and cached) by the time a user
  // triggers the <LinkPreview>.
  React.useEffect(() => {
    fetch(`/_next/image?url=${encodeURIComponent(src)}&w=256&q=${q}`)
  }, [])

  return (
    <>
      <HoverCardPrimitive.Root
        openDelay={50}
        onOpenChange={(open) => {
          setIsOpen(open)
        }}
      >
        <HoverCardPrimitive.Trigger
          href={url}
          className={cx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          {children}

          <DotsCircleHorizontalIcon className="mb-0.5 ml-1 inline w-4" />
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content side="top" align="center" sideOffset={10}>
          <Transition
            show={isOpen}
            appear={true}
            enter="transform transition duration-300 origin-bottom ease-out"
            enterFrom="opacity-0 translate-y-2 scale-0"
            enterTo="opacity-100 translate-y-0 scale-100"
            className="rounded-xl shadow-xl"
          >
            <a
              href={url}
              className="block rounded-xl border-2 border-transparent bg-white p-1 shadow hover:border-rose-500"
              style={{ fontSize: 0 }}
            >
              <Image
                src={src}
                width={width}
                height={height}
                layout={layout}
                quality={q}
                className="rounded-lg"
              />
            </a>
          </Transition>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  )
}
