import { allBlogs } from ".contentlayer/data"
import { ContentLink } from "@/ui/ContentLink"
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
