import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files"
import { format, parseISO } from "date-fns"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode, { Options } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { HEADING_LINK_ANCHOR } from "./lib/constants"

const rehypePrettyCodeOptions: Partial<Options> = {
  theme: "one-dark-pro",
  tokensMap: {
    fn: "entity.name.function",
  },
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
    node.properties.className.push("syntax-line")
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("syntax-line--highlighted")
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["syntax-word--highlighted"]
  },
}

const computedFields: ComputedFields = {
  tweetIds: {
    type: "json",
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(/<StaticTweet\sid="[0-9]+"\s\/>/g)
      const tweetIDs = tweetMatches?.map(
        (tweet: any) => tweet.match(/[0-9]+/g)[0],
      )
      return tweetIDs ?? []
    },
  },
  publishedAtFormatted: {
    type: "string",
    resolve: (doc) => {
      return format(parseISO(doc.publishedAt), "MMMM, yyyy")
    },
  },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
}

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "posts/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    description: { type: "string", required: true },
    // image: { type: "string", required: true },
  },
  computedFields,
}))

const contentLayerConfig = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
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
    ],
  },
})

export default contentLayerConfig
