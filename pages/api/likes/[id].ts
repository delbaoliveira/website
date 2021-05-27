import prisma from "@/ui/prisma"
import { createHash } from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const ipAddress = req.headers["x-forwarded-for"] || "0.0.0.0"
    const id = req.query.id as string

    const hashedIpAddress =
      // hash users ip address to protect their privacy
      createHash("md5")
        .update(ipAddress + process.env.IP_ADDRESS_SALT!, "utf8")
        .digest("hex")

    const sep = "___"

    const interactionId = id + sep + hashedIpAddress

    switch (req.method) {
      case "GET": {
        const [
          // the number of likes this post has
          post,
          // the number of times this user has liked this post
          user,
        ] = await Promise.all([
          prisma.postMeta.findUnique({
            where: { slug: id },
            select: {
              likes: true,
            },
          }),

          prisma.likesByUser.findUnique({
            where: { id: interactionId },
            select: {
              likes: true,
            },
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

        const [post, user] = await Promise.all([
          prisma.postMeta.upsert({
            where: { slug: id },
            create: {
              slug: id,
              likes: count,
            },
            update: {
              likes: {
                increment: count,
              },
            },
            select: {
              likes: true,
            },
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
            select: {
              likes: true,
            },
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
