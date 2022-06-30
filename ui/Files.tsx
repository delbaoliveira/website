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
    <div className="my-8 overflow-hidden rounded-lg bg-white/5 font-mono text-sm shadow-surface-elevation-low lg:-mx-8">
      {props.title ? (
        <div className="mb-0.5 rounded-md bg-rose-100/10 px-3 py-1 text-xs text-rose-100/70 shadow-sm">
          {props.title}
        </div>
      ) : null}
      <div className="py-3 [counter-reset:line]">
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
                "flex items-center space-x-2 border-l-4 border-l-transparent py-1 pr-4 before:mr-4 before:ml-2 before:inline-block before:w-4 before:text-right before:[counter-increment:line] before:[content:counter(line)]",
                {
                  "border-l-rose-300/70 bg-rose-200/10 before:text-white/70":
                    node.isHighlighted,
                  "before:text-white/20": !node.isHighlighted,
                },
              )}
            >
              <div
                className={cx("text-rose-100/40", {
                  "pl-[20px]": lvl === 1,
                  "pl-[40px]": lvl === 2,
                  "pl-[60px]": lvl === 3,
                  "pl-[80px]": lvl === 4,
                })}
              >
                {!node.children ? (
                  <DocumentTextIcon className="w-4" />
                ) : (
                  <FolderIcon className="w-4" />
                )}
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
