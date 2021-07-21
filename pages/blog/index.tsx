import { getAllPostsMeta } from "@/lib/mdx"
import { Layout } from "@/ui/Layout"
import { PostPreview } from "@/ui/PostPreview"
import React from "react"
import type { PostMeta } from "types/post"

export function getStaticProps() {
  const posts = getAllPostsMeta("post")
  return { props: { posts } }
}

export default function BlogPage({ posts }: { posts: PostMeta[] }) {
  return (
    <Layout>
      <div className="container px-4 mx-auto mt-24">
        <h1 className="text-4xl font-extrabold text-gray-800">Blog</h1>
        <h4 className="mt-2 text-gray-500">
          Thoughts on what I'm building and learning.
        </h4>
        <div className="mt-8 space-y-8">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="mt-6 sm:grid sm:grid-cols-2 sm:gap-10"
            >
              <PostPreview post={post} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
