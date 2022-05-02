import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const id = z.string().parse(req.query.id)

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${process.env.YOUTUBE_DATA_API_KEY}`,
    ).then((x) => x.json())

    if (!response.items?.[0]) {
      throw new Error("Video not found")
    }

    const video = response.items[0]

    const views = video.statistics?.viewCount
    const likes = video.statistics?.likeCount

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=1800",
    )

    return res.status(200).json({
      views: views ? Number(views) : 0,
      likes: likes ? Number(likes) : 0,
    })
  } catch (err: any) {
    console.error(err.message)

    res.status(500).json({
      statusCode: 500,
      message: err.message,
    })
  }
}
