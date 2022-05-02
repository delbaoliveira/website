import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const id = z.string().parse(req.query.id)

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}&key=${process.env.YOUTUBE_DATA_API_KEY}`,
    ).then((x) => x.json())

    if (!response.items?.[0]) {
      throw new Error("Video not found")
    }

    const video = response.items[0]

    const duration = video.contentDetails?.duration
    const views = video.statistics?.viewCount
    const likes = video.statistics?.likeCount
    const thumbnail = video.snippet?.thumbnails?.maxres?.url
    const title = video.snippet?.title
    const publishedAt = video.snippet?.publishedAt

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=1800",
    )

    return res.status(200).json({
      views: views ? Number(views) : 0,
      likes: likes ? Number(likes) : 0,
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
      thumbnail,
      title,
      publishedAt,
    })
  } catch (err: any) {
    console.error(err.message)

    res.status(500).json({
      statusCode: 500,
      message: err.message,
    })
  }
}
