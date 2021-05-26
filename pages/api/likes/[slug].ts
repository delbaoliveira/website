import prisma from "@/ui/prisma"
import { Prisma } from "@prisma/client"
import { createHash } from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"

const likesByUserSelect = Prisma.validator<Prisma.LikesByUserSelect>()({
  likes: true,
})

const postMetaSelect = Prisma.validator<Prisma.PostMetaSelect>()({
  likes: true,
})

export type LikesPayload = {
  post: number
  user: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const ipAddress = req.headers["x-forwarded-for"] || "0.0.0.0"
    const slug = req.query.slug as string

    const hashedIpAddress =
      // hash users ip address to protect their privacy
      createHash("md5")
        .update(ipAddress + process.env.IP_ADDRESS_SALT!, "utf8")
        .digest("hex")

    const sep = "___"

    const interactionId = slug + sep + hashedIpAddress

    switch (req.method) {
      case "GET": {
        const [
          // the number of likes this post has
          post,
          // the number of times this user has liked this post
          user,
        ] = await Promise.all([
          prisma.postMeta.findUnique({
            where: { slug },
            select: postMetaSelect,
          }),

          prisma.likesByUser.findUnique({
            where: { id: interactionId },
            select: likesByUserSelect,
          }),
        ])

        res.json({ post: post?.likes || 0, user: user?.likes || 0 })
        return
      }

      case "POST": {
        if (typeof req.body?.count === "undefined") {
          throw new Error("Please pass a count")
        }

        const count = Number(req.body.count)

        console.log(
          JSON.stringify(
            {
              method: req.method,

              interactionId,
              count,
            },
            null,
            2,
          ),
        )

        const [post, user] = await Promise.all([
          prisma.postMeta.upsert({
            where: { slug },
            create: {
              slug,
              likes: count,
            },
            update: {
              likes: {
                increment: count,
              },
            },
            select: postMetaSelect,
          }),

          prisma.likesByUser.upsert({
            where: { id: interactionId },
            create: {
              id: interactionId,
              likes: count,
            },
            update: {
              likes: {
                increment: count,
              },
            },
            select: likesByUserSelect,
          }),
        ])

        res.json({ post: post?.likes || 0, user: user?.likes || 0 })

        return
      }
    }
  } catch (err) {
    console.error(err.message)

    res.status(500).json({
      statusCode: 500,
      message: err.message,
    })
  }
}
