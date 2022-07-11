import clsx from "clsx"
import React from "react"

export const Aside = ({
  children,
  emoji,
  side = "left",
}: {
  children: React.ReactNode
  emoji?: string
  side?: "left" | "right"
}) => {
  return (
    <div
      className={clsx("relative", {
        "xl:!col-start-2": side === "left",
        "xl:!col-start-4": side === "right",
      })}
    >
      <div className="mt-3 w-full border-l border-rose-100/10 pl-3 xl:absolute xl:top-0 xl:left-0 xl:!col-start-4 xl:mt-0 xl:border-t xl:border-l-0 xl:pl-0 xl:pt-3">
        {emoji ? <div className="mb-2 text-opacity-100">{emoji}</div> : null}
        <div className="text-sm italic text-rose-100/50 [&>span[data-rehype-pretty-code-fragment]]:!text-[11px]">
          {children}
        </div>
      </div>
    </div>
  )
}
