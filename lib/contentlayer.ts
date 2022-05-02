import { pick } from "contentlayer/client"
import { Blog, Video } from "contentlayer/generated"

export const allTagNames = ["Next.js", "MDX", "Next Conf", "React Conf"]
export const allTagSlugs = ["next", "mdx", "next-conf", "react-conf"]

export const formatVideoPreview = (video: Video) => {
  const partialVideo = pick(video, ["title", "description", "youtube", "tags"])

  return {
    ...partialVideo,
    title: partialVideo.title || partialVideo.youtube.title,
    type: video.type,
    publishedAt: partialVideo.youtube.publishedAt,
    tags: partialVideo.tags || [],
  }
}

export const formatPostPreview = (post: Blog) => {
  const partialPost = pick(post, [
    "tags",
    "slug",
    "title",
    "description",
    "publishedAt",
    "publishedAtFormatted",
  ])

  return {
    ...partialPost,
    type: post.type,
    tags: partialPost.tags || [],
  }
}

export const getVideoDetails = async (id: string) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}&key=${process.env.YOUTUBE_DATA_API_KEY}`,
  ).then((x) => x.json())

  if (!res.items?.[0]) {
    throw new Error("Video not found")
  }

  const video = res.items[0]

  const duration = video.contentDetails?.duration
  const views = video.statistics?.viewCount
  const likes = video.statistics?.likeCount
  const thumbnail = video.snippet?.thumbnails?.maxres?.url
  const title = video.snippet?.title
  const publishedAt = video.snippet?.publishedAt

  return {
    views: views ? Number(views) : 0,
    likes: likes ? Number(likes) : 0,
    thumbnail,
    title,
    publishedAt,
    duration: duration
      ? duration
          // PT1M2S => 01:02
          .replace(/PT/, "")
          .replace(/H/, ":")
          .replace(/M/, ":")
          .replace(/S/, "")
          .split(":")
          .map((digit: string) => {
            if (Number(digit) <= 9) {
              return "0" + digit
            } else {
              return digit
            }
          })
          .join(":")
      : 0,
  }
}