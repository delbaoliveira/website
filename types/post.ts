export type PostMeta = {
  title: string
  publishedAt: string
  description: string
  slug?: any
  status?: "draft"
  category?: "challenge"
  image?: string
}

export type Post = {
  meta: PostMeta
  code?: any
}
