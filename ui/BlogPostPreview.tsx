"use client"

import { formatPostPreview } from "@/lib/contentlayer"
import { useEnabledOnFirstIntersection } from "@/lib/useEnabledOnFirstIntersection"
import { usePostLikes } from "@/lib/usePostLikes"
import { usePostViews } from "@/lib/usePostViews"
import { ContentLink } from "@/ui/ContentLink"
import { InlineMetric } from "@/ui/InlineMetric"
import { LoadingDots } from "@/ui/LoadingDots"

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
    <>
      <div className="text-rose-100/30">&middot;</div>

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
    </>
  )
}

export const BlogPostPreview = (post: ReturnType<typeof formatPostPreview>) => {
  const { enabled, intersectionRef } = useEnabledOnFirstIntersection()

  return (
    <div ref={intersectionRef}>
      <ContentLink key={post.slug} href={`/blog/${post.slug}`}>
        <ContentLink.Title>{post.title}</ContentLink.Title>

        <ContentLink.Meta>
          <div>{post.publishedAtFormatted}</div>
          {/* {enabled ? <Metrics slug={post.slug} /> : null} */}
        </ContentLink.Meta>

        {post.description ? (
          <ContentLink.Text>{post.description}</ContentLink.Text>
        ) : null}
      </ContentLink>
    </div>
  )
}
