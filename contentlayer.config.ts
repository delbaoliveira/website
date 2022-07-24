import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode, { Options } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"
import { HEADING_LINK_ANCHOR } from "./lib/constants"
import { allTagNames, allTagSlugs, getVideoDetails } from "./lib/contentlayer"
import { formatShortDate } from "./lib/formatShortDate"

const Tag = defineNestedType(() => ({
  name: "Tag",
  fields: {
    title: {
      type: "enum",
      required: true,
      options: allTagNames,
    },
    slug: {
      type: "enum",
      required: true,
      options: allTagSlugs,
    },
  },
}))

// eventually we will use contentlayer's remote content feature to generate
// this from Youtube's API
const Video = defineDocumentType(() => ({
  name: "Video",
  filePathPattern: "video/*.mdx",
  contentType: "mdx",
  fields: {
    tags: {
      type: "list",
      of: Tag,
    },
    title: {
      type: "string",
      description: "Override the default Youtube title",
    },
    description: { type: "string", required: true },
  },
  computedFields: {
    youtube: {
      type: "nested",
      // doesn't generate types yet https://github.com/contentlayerdev/contentlayer/issues/149
      of: defineNestedType(() => ({
        name: "YoutubeVideo",
        fields: {
          id: {
            type: "string",
            required: true,
          },
          title: {
            type: "string",
            required: true,
          },
          views: {
            type: "string",
            required: true,
          },
          thumbnail: {
            type: "string",
            required: true,
          },
          url: {
            type: "string",
            required: true,
          },
          duration: {
            type: "string",
            required: true,
          },
          publishedAt: {
            type: "string",
            required: true,
          },
        },
      })),
      resolve: async (doc) => {
        const id = doc._raw.sourceFileName.replace(/\.mdx$/, "")

        const data = await getVideoDetails(id)

        return {
          id,
          url: `https://www.youtube.com/watch?v=${id}`,
          publishedAtFormatted: formatShortDate(data.publishedAt),
          ...data,
        }
      },
    },
  },
}))

const Series = defineNestedType(() => ({
  name: "Series",
  fields: {
    title: {
      type: "string",
      required: true,
    },
  },
}))

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "posts/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    description: { type: "string" },
    status: { type: "enum", options: ["draft", "published"], required: true },
    series: {
      type: "nested",
      of: Series,
    },
    tags: {
      type: "list",
      of: Tag,
    },
  },
  computedFields: {
    tweetIds: {
      type: "json",
      resolve: (doc) => {
        const tweetMatches = doc.body.raw.match(
          /<StaticTweet\sid="[0-9]+"[\s\S]*?\/>/g,
        )
        const tweetIDs = tweetMatches?.map(
          (tweet: any) => tweet.match(/[0-9]+/g)[0],
        )
        return tweetIDs ?? []
      },
    },
    publishedAtFormatted: {
      type: "string",
      resolve: (doc) => {
        return formatShortDate(doc.publishedAt)
      },
    },
    slug: {
      type: "string",
      resolve: (doc) =>
        doc._raw.sourceFileName
          // hello-world.mdx => hello-world
          .replace(/\.mdx$/, ""),
    },
  },
}))

// div.BLOCK > pre.PRE > code.CODE
const BLOCK =
  "overflow-hidden rounded-lg bg-white/5 leading-6 shadow-surface-elevation-low"
const TITLE =
  "mb-0.5 rounded-md bg-rose-100/10 px-3 py-1 font-mono text-xs text-rose-100/70 shadow-sm"
const PRE = "overflow-x-auto py-2 text-[13px] [color-scheme:dark]"
const CODE =
  "grid [&>span]:border-l-4 [&>span]:border-l-transparent [&>span]:pl-2 [&>span]:pr-3"
const INLINE_BLOCK =
  "whitespace-nowrap border border-rose-200/10 px-1.5 py-px text-[12px] rounded-full bg-white/5 whitespace-nowrap text-rose-300/90"
const INLINE_CODE = ""
const NUMBERED_LINES =
  "[counter-reset:line] before:[&>span]:mr-3 before:[&>span]:inline-block before:[&>span]:w-4 before:[&>span]:text-right before:[&>span]:text-white/20 before:[&>span]:![content:counter(line)] before:[&>span]:[counter-increment:line]"

const HIGHLIGHTED_LINE =
  "!border-l-rose-300/70 bg-rose-200/10 before:!text-white/70"

function transformer(tree: any) {
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

function rehypePrettyCodeClasses() {
  return transformer
}

const rehypePrettyCodeOptions: Partial<Options> = {
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

const contentLayerConfig = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog, Video],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    remarkPlugins: [[remarkGfm]],
    rehypePlugins: [
      [rehypeSlug],
      [rehypePrettyCode, rehypePrettyCodeOptions],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: [HEADING_LINK_ANCHOR],
          },
        },
      ],
      [rehypePrettyCodeClasses],
    ],
  },
})

export default contentLayerConfig
