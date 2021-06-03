export type PostMeta = {
  title: string
  publishedAt: string
  description: string
  slug?: any
  category?: "draft" | "project" | "post"
  image?: string
}

export type Post = {
  meta: PostMeta
  code?: any
}
