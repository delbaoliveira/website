import Link from "next/link"
import React from "react"
import type { PostMeta } from "types/post"
import cx from "clsx"
import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import Image from "next/image"

export const BlogPreview = ({ post }: { post: PostMeta }) => {
  return (
    <div key={post.slug}>
      <Link href={`/blog/${post.slug}`}>
        <a className={cx("text-gray-800 group block", FOCUS_VISIBLE_OUTLINE)}>
          <div className="relative mb-4 overflow-hidden rounded-lg text-[0px]">
            <Image
              src={`/${post.image}`}
              width={1920}
              height={960}
              className="align-top"
            />
          </div>
          <h2 className="text-lg font-bold group-hover:text-sky-500">
            {post.title}
          </h2>
          <p className="text-gray-800 line-clamp-2">{post.description}</p>
        </a>
      </Link>
    </div>
  )
}
