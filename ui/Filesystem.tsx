import ErrorIcon from "@/ui/ErrorIcon"
import FolderIcon from "@/ui/FolderIcon"
import LayoutIcon from "@/ui/LayoutIcon"
import LoadingIcon from "@/ui/LoadingIcon"
import PageIcon from "@/ui/PageIcon"
import TemplateIcon from "@/ui/TemplateIcon"
import clsx from "clsx"
import React from "react"

export type Item = {
  name: string
  status?: "highlighted" | "faded"
  items?: Item[]
}

type Props = {
  items: Item[]
  size?: "small" | "medium"
  withCounters?: boolean
}

export const Filesystem = ({ items, size = "medium", withCounters }: Props) => {
  return (
    <div
      className={clsx(
        "valkyrie backdrop-blur-mdx divide-y divide-rose-100/5 rounded-lg font-medium shadow-xl shadow-black/5",
        {
          "[counter-reset:highlight]": withCounters,
        },
      )}
    >
      <Node items={items} lvl={0} size={size} withCounters={withCounters} />
    </div>
  )
}

const Node = ({ items, lvl, size, withCounters }: Props & { lvl: number }) => {
  return (
    <>
      {items.map(({ name, status, items }) => {
        return (
          <React.Fragment key={name}>
            <div
              className={clsx("flex items-center space-x-2 leading-none", {
                "py-3 px-4": size === "medium",
                "py-2 px-3": size === "small",
                "rounded-lg border-none bg-blue-700/[15%] ring-2 ring-blue-700/80":
                  status === "highlighted",
                "relative before:absolute before:-top-0.5 before:-left-6 before:flex before:h-4 before:w-4 before:items-center before:justify-center before:rounded-full  before:bg-blue-700 before:text-xs before:font-semibold before:text-blue-100/90 before:![content:counter(highlight)] before:[counter-increment:highlight]":
                  status === "highlighted" && withCounters === true,
              })}
            >
              <div
                className={clsx({
                  "text-rose-100/30": !status,
                  "text-blue-100/30": status === "highlighted",
                  "text-rose-100/10": status === "faded",
                  "pl-[12px]": lvl === 1,
                  "pl-[24px]": lvl === 2,
                  "pl-[36px]": lvl === 3,
                  "pl-[48px]": lvl === 4,
                })}
              >
                <Icon
                  name={name}
                  className="h-4 w-4"
                  isFolder={Boolean(items)}
                />
              </div>
              <div
                className={clsx("truncate", {
                  "text-sm": size === "small",
                  "text-rose-100/70": !status,
                  "text-blue-100/70": status === "highlighted",
                  "text-rose-100/30": status === "faded",
                })}
              >
                {name}
              </div>
            </div>

            {items ? (
              <Node
                items={items}
                lvl={lvl + 1}
                size={size}
                withCounters={withCounters}
              />
            ) : null}
          </React.Fragment>
        )
      })}
    </>
  )
}

const Icon = ({
  name,
  className,
  isFolder,
}: {
  name: string
  className: string
  isFolder?: boolean
}) => {
  if (isFolder) {
    return <FolderIcon className={className} />
  }

  switch (name) {
    case "layout.tsx":
      return <LayoutIcon className={className} />
    case "loading.tsx":
      return <LoadingIcon className={className} />
    case "error.tsx":
      return <ErrorIcon className={className} />
    case "head.tsx":
    case "template.tsx":
      return <TemplateIcon className={className} />
    case "page.tsx":
    default:
      return <PageIcon className={className} />
  }
}
