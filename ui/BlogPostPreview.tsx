import { useEnabledOnFirstIntersection } from "@/lib/useEnabledOnFirstIntersection"
import { usePostLikes } from "@/lib/usePostLikes"
import { usePostViews } from "@/lib/usePostViews"
import { ContentLink } from "@/ui/ContentLink"
import { InlineMetric } from "@/ui/InlineMetric"
import { LoadingDots } from "@/ui/LoadingDots"
import { Blog } from "contentlayer/generated"
import React from "react"

const Metrics = ({ slug }: { slug: string }) => {
  const {
    views,
    isLoading: viewsIsLoading,
    isError: viewsIsError,
  } = usePostViews(slug)
  const {
    likes,
    isLoading: likesIsLoading,
    isError: likesIsError,
  } = usePostLikes(slug)

  return (
    <div className="flex space-x-2 text-gray-500/90">
      <div>
        {viewsIsError || viewsIsLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={views} stat={views} />
        )}{" "}
        views
      </div>

      <div className="text-rose-100/30">&middot;</div>

      <div>
        {likesIsError || likesIsLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={likes} stat={likes} />
        )}{" "}
        likes
      </div>
    </div>
  )
}

export const BlogPostPreview = (
  post: Pick<Blog, "slug" | "title" | "publishedAtFormatted" | "description">,
) => {
  const { enabled, intersectionRef } = useEnabledOnFirstIntersection()

  return (
    <div ref={intersectionRef}>
      <ContentLink key={post.slug} href={`/blog/${post.slug}`}>
        <ContentLink.Title>{post.title}</ContentLink.Title>

        <div className="flex items-start justify-between">
          <ContentLink.Meta items={[post.publishedAtFormatted]} />
          {enabled ? <Metrics slug={post.slug} /> : null}
        </div>

        <ContentLink.Text>{post.description}</ContentLink.Text>
      </ContentLink>
    </div>
  )
}
