import { getAllPostsMeta } from "@/lib/mdx"
import { ContentLink } from "@/ui/ContentLink"
import { Layout } from "@/ui/Layout"
import AnnotationIcon from "@heroicons/react/solid/AnnotationIcon"
import React from "react"
import type { PostMeta } from "types/post"

export function getStaticProps() {
  const posts = getAllPostsMeta("post")
  return { props: { posts } }
}

export default function BlogPage({ posts }: { posts: PostMeta[] }) {
  return (
    <Layout>
      <div>
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gray-900 rounded-2xl shadow-surface-elevation-low">
            <AnnotationIcon className="w-6 text-gray-600/90" />
          </div>

          <div>
            <h1 className="text-2xl text-gray-500/90">Posts</h1>
          </div>
        </div>
        <div className="mt-12 space-y-10">
          {posts.map((post) => (
            <ContentLink
              key={post.slug}
              title={post.title}
              text={post.description}
              href={`/blog/${post.slug}`}
              meta={[post.publishedAtFormatted]}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}
