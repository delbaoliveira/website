export type PostMeta = {
  title: string
  publishedAt: string
  description: string
  slug?: any
  status?: "draft"
}

export type Post = {
  meta: PostMeta
  code?: any
}
