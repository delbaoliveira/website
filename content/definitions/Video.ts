import { defineDocumentType, defineNestedType } from "contentlayer/source-files"
// esbuild doesn't support module aliases 😤🤌
// https://github.com/evanw/esbuild/issues/394
// https://github.com/contentlayerdev/contentlayer/issues/238
import { getVideoDetails } from "../../lib/contentlayer"
import { formatShortDate } from "../../lib/formatShortDate"
import { Tag } from "./Tag"

// eventually we will use contentlayer's remote content feature to generate
// this from Youtube's API
export const Video = defineDocumentType(() => ({
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
