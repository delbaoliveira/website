import { Transition } from "@headlessui/react"
import { Slot } from "@radix-ui/react-slot"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import cx from "clsx"
import Image from "next/image"
import React from "react"
import { FOCUS_VISIBLE_OUTLINE } from "@/ui/constants"

export function Memetip({
  src,
  children,
}: {
  src: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <TooltipPrimitive.Root
      delayDuration={300}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen)
      }}
    >
      <TooltipPrimitive.Trigger as={Slot}>
        <button
          className={cx(
            "group-hover:text-lightBlue-400 transition-colors rounded-md hover:!text-lightBlue-600 focus:!text-lightBlue-600",
            FOCUS_VISIBLE_OUTLINE,
          )}
        >
          {children}
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content side="top" align="center" sideOffset={8}>
        <Transition
          show={isOpen}
          appear={true}
          enter="transform transition ease-in-out duration-200"
          enterFrom="opacity-0 translate-y-1 scale-95"
          enterTo="opacity-100 translate-y-0 scale-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="bg-gray-100 shadow-2xl rounded-xl"
          style={{ fontSize: 0 }}
        >
          <Image
            src={src}
            width={320}
            height={200}
            layout="intrinsic"
            className="rounded-xl"
            quality={60}
          />
        </Transition>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  )
}
