import { videos } from "@/lib/videos"
import { ContentLink } from "@/ui/ContentLink"
import { Layout } from "@/ui/Layout"
import AnnotationIcon from "@heroicons/react/solid/AnnotationIcon"
import React from "react"

export default function BlogPage() {
  return (
    <Layout>
      <div>
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gray-900 rounded-2xl shadow-surface-elevation-low">
            <AnnotationIcon className="w-6 text-gray-600/90" />
          </div>

          <div>
            <h1 className="text-2xl text-gray-500/90">Videos</h1>
          </div>
        </div>
        <div className="mt-12 space-y-10">
          {videos.map((post) => (
            <ContentLink
              key={post.url}
              title={post.title}
              text={post.description}
              href={post.url}
              meta={[post.category, post.date]}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}
