import { MediaPreview } from "@/ui/MediaPreview"
import React from "react"
import type { PostMeta } from "types/post"

export const PostPreview = ({ post }: { post: PostMeta }) => {
  return (
    <MediaPreview
      title={post.title}
      text={post.description}
      url={`/blog/${post.slug}`}
      image={`/${post.image}`}
    />
  )
}
