import { defineNestedType } from "contentlayer/source-files"
// esbuild doesn't support module aliases 😤🤌
// https://github.com/evanw/esbuild/issues/394
// https://github.com/contentlayerdev/contentlayer/issues/238
import { allTagNames, allTagSlugs } from "../../lib/contentlayer"

export const Tag = defineNestedType(() => ({
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
