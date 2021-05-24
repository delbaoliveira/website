export type PostMeta = {
  title: string
  publishedAt: string
  description: string
  slug?: any
}

export type Post = {
  meta: PostMeta
  code?: any
}
