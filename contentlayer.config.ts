import { allTagNames, allTagSlugs, getVideoDetails } from "@/lib/contentlayer"
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files"
import { format, parseISO } from "date-fns"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode, { Options } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { HEADING_LINK_ANCHOR } from "./lib/constants"

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
          publishedAtFormatted: format(parseISO(data.publishedAt), "MMM, yy"),
          ...data,
        }
      },
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
    description: { type: "string", required: true },
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
        return format(parseISO(doc.publishedAt), "MMM, yy")
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
    node.properties.className.push("syntax-line")
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("syntax-line--highlighted")
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["syntax-word--highlighted"]
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
