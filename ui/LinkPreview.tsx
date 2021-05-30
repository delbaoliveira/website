import { FOCUS_VISIBLE_OUTLINE, GRADIENT_LINK } from "@/lib/constants"
import { Transition } from "@headlessui/react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import cx from "clsx"
import Image from "next/image"
import React from "react"

// Stretch:
// - Add exit animation
// - Add CSS perspective to imitate Apple (perspective is not supported by Tailwind)

export const LinkPreview = ({
  children,
  url,
}: {
  children: React.ReactNode
  url: string
}) => {
  const [isOpen, setOpen] = React.useState(false)

  const _url = `https://api.microlink.io/?url=${url}&screenshot&meta=false&embed=screenshot.url`

  return (
    <>
      <div className="hidden">
        <Image src={_url} width={240} height={150} priority={true} />
      </div>
      <HoverCardPrimitive.Root
        openDelay={300}
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

        <HoverCardPrimitive.Content
          side="top"
          align="center"
          sideOffset={8}
          forceMount={true}
        >
          <Transition
            show={isOpen}
            appear={true}
            enter="transform transition duration-300 origin-bottom ease-out"
            enterFrom="opacity-0 translate-y-4 scale-0"
            enterTo="opacity-100 translate-y-0 scale-100"
            // Stretch: Add exit animation
            // leave="transition-opacity duration-1000"
            // leaveFrom="opacity-100"
            // leaveTo="opacity-0"
            className="shadow-2xl rounded-xl"
          >
            <a
              href={url}
              className="block p-1.5 bg-white shadow rounded-xl"
              // Unfortunate hack to remove the weird whitespace left by
              // next/image wrapper div
              // https://github.com/vercel/next.js/issues/18915
              style={{ fontSize: 0 }}
            >
              <Image
                src={_url}
                width={240}
                height={150}
                className="rounded-lg"
                priority={true}
              />
            </a>
          </Transition>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  )
}
