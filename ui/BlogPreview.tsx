import { format, parseISO } from "date-fns"
import Link from "next/link"
import React from "react"
import type { PostMeta } from "types/post"

export const BlogPreview = ({ post }: { post: PostMeta }) => {
  return (
    <div key={post.slug}>
      <h2 className="text-xl font-bold">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-gray-800 transition-colors hover:text-gray-600">
            {post.title}
          </a>
        </Link>
      </h2>

      <div className="text-sm text-gray-500">
        {format(parseISO(post.publishedAt), "MMMM dd, yyyy")}
      </div>

      <div className="mt-3 text-gray-700">{post.description}</div>
    </div>
  )
}
