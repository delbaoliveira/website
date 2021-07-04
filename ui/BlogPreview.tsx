import { format, parseISO } from "date-fns"
import Link from "next/link"
import React from "react"
import type { PostMeta } from "types/post"

export const BlogPreview = ({ post }: { post: PostMeta }) => {
  return (
    <div key={post.slug}>
      <Link href={`/blog/${post.slug}`}>
        <a className="text-gray-800 group">
          <h2 className="text-lg font-bold group-hover:text-sky-500">
            {post.title}
          </h2>
          <p className="text-gray-800 line-clamp-2">{post.description}</p>
        </a>
      </Link>
    </div>
  )
}
