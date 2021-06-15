import { FOCUS_VISIBLE_OUTLINE, GRADIENT_LINK } from "@/lib/constants"
import { Transition } from "@headlessui/react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import cx from "clsx"
import Image from "next/image"
import React from "react"

export function Memetip({
  src,
  children,
}: {
  src: any
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <HoverCardPrimitive.Root
      openDelay={50}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <HoverCardPrimitive.Trigger
        as="span"
        className={cx("cursor-pointer", GRADIENT_LINK, FOCUS_VISIBLE_OUTLINE)}
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
          style={{ fontSize: 0 }}
        >
          <Image
            src={src}
            layout="intrinsic"
            className="rounded-xl"
            quality={60}
            placeholder="blur"
          />
        </Transition>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  )
}
