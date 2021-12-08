import { Layout } from "@/ui/Layout"
import React from "react"

/**
 * TODO
 * Match sorter
 * click to copy
 *  tab: select => enter: copy
 *  border for selected, solid color for currently copied (confirm copy)
 *
 */
export default function Page() {
  return (
    <Layout>
      <div className="container px-4 mx-auto space-y-14 pt-36 lg:space-y-32">
        <h1 className="text-3xl font-extrabold text-gray-400 lg:text-4xl">
          Unicode characters I'm always Googling
        </h1>

        <div className="grid grid-cols-6 gap-4 mt-20">
          {items.map((x) => (
            <div
              key={x.char}
              className="flex items-center justify-center h-24 rounded-2xl transition duration-300 bg-white/[2%] hover:bg-white/[3%] shadow-surface-elevation-low hover:shadow-surface-elevation-medium"
            >
              <div className="text-6xl font-bold text-white">{x.char}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

const items = [
  {
    char: "▲",
    keywords: ["vercel", "black", "up", "triangle", "logo"],
  },
  {
    char: "◆",
    keywords: ["black", "diamond", "bullet", "twitter"],
  },
  {
    char: "¹",
    keywords: ["1", "one", "superscript", "number"],
  },
  {
    char: "²",
    keywords: ["2", "two", "superscript", "number"],
  },
  {
    char: "³",
    keywords: ["3", "three", "superscript", "number"],
  },
]
