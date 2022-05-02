import DocumentTextIcon from "@heroicons/react/outline/DocumentTextIcon"
import FolderIcon from "@heroicons/react/outline/FolderIcon"
import cx from "clsx"
import React from "react"

type Node = {
  name: string
  isHighlighted?: boolean
  children?: Node[]
}

export const Files = (props: { data: Node[]; title?: string }) => {
  return (
    <div className="my-8 overflow-hidden rounded-lg bg-white/[2%]  font-mono text-sm shadow-surface-elevation-low">
      {props.title ? (
        <div className="mb-0.5 rounded-md bg-rose-200/5 px-3 py-1 font-mono text-xs text-rose-100/50 shadow-sm">
          {props.title}
        </div>
      ) : null}
      <div className="py-3">
        <Inner {...props} lvl={0} />
      </div>
    </div>
  )
}

const Inner = ({ data, lvl }: { data: Node[]; lvl: number }) => {
  return (
    <>
      {data.map((node) => {
        return (
          <React.Fragment key={node.name}>
            <div
              className={cx(
                "flex items-center space-x-2 border-l-4 border-l-transparent py-1 pr-4",
                {
                  "border-l-rose-300/60 bg-rose-200/5": node.isHighlighted,
                  "pl-5": lvl === 0,
                  "pl-[40px]": lvl === 1,
                  "pl-[60px]": lvl === 2,
                  "pl-[80px]": lvl === 3,
                  "pl-[100px]": lvl === 4,
                },
              )}
            >
              <div className="w-4 text-rose-100/40">
                {!node.children ? <DocumentTextIcon /> : <FolderIcon />}
              </div>
              <div
                className={cx(
                  node.isHighlighted ? "text-rose-50" : "text-rose-100/90",
                )}
              >
                {node.name}
              </div>
            </div>

            {node.children ? (
              <Inner data={node.children} lvl={lvl + 1} />
            ) : null}
          </React.Fragment>
        )
      })}
    </>
  )
}
