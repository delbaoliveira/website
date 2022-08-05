import { defineNestedType } from "contentlayer/source-files"

export const Series = defineNestedType(() => ({
  name: "Series",
  fields: {
    title: {
      type: "string",
      required: true,
    },
  },
}))
