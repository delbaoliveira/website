import { BlogPreview } from "@/ui/BlogPreview"
import { Layout } from "@/ui/Layout"
import { getAllPostsMeta } from "@/ui/mdx"
import React from "react"
import type { PostMeta } from "types/post"

export function getStaticProps() {
  const posts = getAllPostsMeta()
  return { props: { posts } }
}

export default function BlogPage({ posts }: { posts: PostMeta[] }) {
  return (
    <Layout>
      <div className="container max-w-3xl px-4 mx-auto mt-36">
        <h1 className="text-5xl font-extrabold text-gray-800">Blog</h1>
        <h4 className="mt-2 text-gray-700 lg:text-lg">
          Thoughts on what I'm building and learning
        </h4>
        <div className="mt-12 space-y-12">
          {posts.map((post) => (
            <BlogPreview key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
