"use client"

import { useEnabledOnFirstIntersection } from "@/lib/useEnabledOnFirstIntersection"
import { useVideoMetrics } from "@/lib/useVideoMetrics"
import { ContentLink } from "@/ui/ContentLink"
import { InlineMetric } from "@/ui/InlineMetric"
import { LoadingDots } from "@/ui/LoadingDots"
import YoutubeIcon from "@/ui/YoutubeIcon"
import { Video } from "contentlayer/generated"
import React from "react"

const Metrics = ({
  id,
  fallbackData,
}: {
  id: string
  fallbackData: { views: number; likes: number }
}) => {
  const { likes, views, isLoading, isError } = useVideoMetrics(id, {
    fallbackData,
  })

  return (
    <>
      <div className="text-rose-100/30">&middot;</div>

      <div>
        {isError || isLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={views} stat={views} />
        )}{" "}
        views
      </div>

      <div className="text-rose-100/30">&middot;</div>

      <div>
        {isError || isLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={likes} stat={likes} />
        )}{" "}
        likes
      </div>
    </>
  )
}

export const VideoPostPreview = (
  post: Pick<Video, "title" | "description" | "youtube" | "tags">,
) => {
  const { enabled, intersectionRef } = useEnabledOnFirstIntersection()

  return (
    <div ref={intersectionRef}>
      <ContentLink href={post.youtube.url}>
        <div className="flex justify-between">
          <ContentLink.Title>{post.title}</ContentLink.Title>
          <ContentLink.Icon icon={YoutubeIcon} />
        </div>

        <ContentLink.Meta>
          <div>{post.youtube.publishedAtFormatted}</div>

          {post.tags && post.tags.length > 0 ? (
            <>
              <div className="text-rose-100/30">&middot;</div>

              <div>{post.tags[0].title}</div>
            </>
          ) : null}

          <div className="text-rose-100/30">&middot;</div>

          <div>{post.youtube.duration}</div>

          {/* {enabled ? (
            <Metrics
              id={post.youtube.id}
              fallbackData={{
                views: post.youtube.views,
                likes: post.youtube.likes,
              }}
            />
          ) : null} */}
        </ContentLink.Meta>

        <ContentLink.Text>{post.description}</ContentLink.Text>
      </ContentLink>
    </div>
  )
}
