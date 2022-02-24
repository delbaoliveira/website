import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files"
import { format, parseISO } from "date-fns"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { HEADING_LINK_ANCHOR } from "./lib/constants"

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
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
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
