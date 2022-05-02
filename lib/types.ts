import { Tag } from "contentlayer/generated"

export type CurrentFilters = {
  type?: "videos" | "blog"
  tag?: Tag["slug"]
} | null
