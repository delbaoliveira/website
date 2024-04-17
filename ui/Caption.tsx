import { OOF_GRAD } from "@/lib/constants"
import clsx from "clsx"
import React from "react"

export const Caption = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={clsx(
        "mt-2 border-l-2 border-rose-200/5 pl-3 text-sm",
        OOF_GRAD,
      )}
    >
      {children}
    </div>
  )
}
