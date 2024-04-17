import { type Options } from "rehype-pretty-code"
import { visit } from "unist-util-visit"

// div.BLOCK > pre.PRE > code.CODE
// TODO, move this to vanilla css, its too much to send for every code block.
const BLOCK = "valkyrie rounded-lg overflow-hidden"
const TITLE =
  "rounded-t-md border-b border-rose-100/[3%] bg-rose-100/[2%] px-2.5 py-1 font-mono text-xs text-rose-100/60"
const PRE =
  "overflow-x-auto py-2 text-[13px] leading-6 [color-scheme:dark] [&::-webkit-scrollbar]:h-[12px] [&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-gray-700/30 hover:[&::-webkit-scrollbar-thumb]:transition hover:[&::-webkit-scrollbar-thumb]:bg-gray-700/80 [&::-webkit-scrollbar-thumb]:bg-clip-padding selection:bg-blue-700/70 selection:text-inherit"
const CODE =
  "grid [&>span]:border-l-[3px] [&>span]:border-l-transparent [&>span]:pl-2 [&>span]:pr-3"
const INLINE_BLOCK =
  "whitespace-nowrap border border-rose-200/10 px-1.5 py-px text-[12px] rounded-full bg-white/5 whitespace-nowrap text-rose-300/90"
const INLINE_CODE = ""
const NUMBERED_LINES =
  "[counter-reset:line] [&>span]:before:mr-3 [&>span]:before:inline-block [&>span]:before:w-4 [&>span]:before:text-right [&>span]:before:text-white/20 [&>span]:before:![content:counter(line)] [&>span]:before:[counter-increment:line]"
const HIGHLIGHTED_LINE =
  "!border-l-blue-700/80 bg-blue-800/[15%] before:!text-blue-200/80"

export function rehypePrettyCodeClasses() {
  return (tree: any) => {
    visit(
      tree,
      (node: any) =>
        Boolean(
          node.tagName === "code" &&
            Object.keys(node.properties).length === 0 &&
            node.children.some((n: any) => n.type === "text"),
        ),
      (node: any) => {
        const textNode = node.children.find((n: any) => n.type === "text")
        textNode.type = "element"
        textNode.tagName = "code"
        textNode.properties = { className: [INLINE_CODE] }
        textNode.children = [{ type: "text", value: textNode.value }]
        node.properties.className = [INLINE_BLOCK]
        node.tagName = "span"
      },
    )

    visit(
      tree,
      (node: any) =>
        Boolean(
          typeof node?.properties?.["data-rehype-pretty-code-fragment"] !==
            "undefined",
        ),
      (node: any) => {
        if (node.tagName === "span") {
          node.properties.className = [
            ...(node.properties.className || []),
            INLINE_BLOCK,
          ]
          node.children[0].properties.className = [
            ...(node.children[0].properties.className || []),
            INLINE_CODE,
          ]

          return node
        }

        if (node.tagName === "div") {
          node.properties.className = [
            ...(node.properties.className || []),
            BLOCK,
          ]
          node.children = node.children.map((node: any) => {
            if (
              node.tagName === "div" &&
              typeof node.properties?.["data-rehype-pretty-code-title"] !==
                "undefined"
            ) {
              node.properties.className = [
                ...(node.properties.className || []),
                TITLE,
              ]
            }
            if (node.tagName === "pre") {
              node.properties.className = [PRE]
              if (node.children[0].tagName === "code") {
                node.children[0].properties.className = [
                  ...(node.children[0].properties.className || []),
                  CODE,
                ]
                if (
                  typeof node.children[0].properties["data-line-numbers"] !==
                  "undefined"
                ) {
                  node.children[0].properties.className.push(NUMBERED_LINES)
                }
              }
            }

            return node
          })

          return node
        }
      },
    )
  }
}

export const rehypePrettyCodeOptions: Partial<Options> = {
  theme: "one-dark-pro",
  tokensMap: {
    // VScode command palette: Inspect Editor Tokens and Scopes
    // https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
    fn: "entity.name.function",
    objKey: "meta.object-literal.key",
  },
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
    node.properties.className = [""]
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push(HIGHLIGHTED_LINE)
  },
}
