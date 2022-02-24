import { allBlogs } from "contentlayer/generated"
import { BlogPostPreview } from "@/ui/BlogPostPreview"
import { Layout } from "@/ui/Layout"
import AnnotationIcon from "@heroicons/react/solid/AnnotationIcon"
import { pick } from "contentlayer/client"
import type { InferGetStaticPropsType } from "next"
import React from "react"

export const getStaticProps = async () => {
  const posts = allBlogs
    .map((post) =>
      pick(post, [
        "slug",
        "title",
        "description",
        "publishedAt",
        "publishedAtFormatted",
      ]),
    )
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    )
  return { props: { posts } }
}

export default function BlogPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div>
        <div className="flex items-center space-x-4">
          <div className="rounded-2xl bg-gray-900 p-2 shadow-surface-elevation-low">
            <AnnotationIcon className="w-6 text-gray-600/90" />
          </div>

          <div>
            <h1 className="text-2xl text-gray-500/90">Posts</h1>
          </div>
        </div>
        <div className="mt-12 space-y-10">
          {posts.map((post) => (
            <BlogPostPreview key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
