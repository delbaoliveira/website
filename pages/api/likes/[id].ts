import prisma from "@/lib/prisma"
import { createHash } from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const ipAddress = req.headers["x-forwarded-for"] || "0.0.0.0"
    const postId = req.query.id as string

    const hashedIpAddress =
      // hash users ip address to protect their privacy
      createHash("md5")
        .update(ipAddress + process.env.IP_ADDRESS_SALT!, "utf8")
        .digest("hex")

    const sep = "___"

    const currentUserId = postId + sep + hashedIpAddress

    switch (req.method) {
      case "GET": {
        const [
          // the number of likes this post has
          post,
          // the number of times this user has liked this post
          user,
        ] = await Promise.all([
          prisma.postMeta.findUnique({
            where: { slug: postId },
            select: {
              likes: true,
            },
          }),

          prisma.likesByUser.findUnique({
            where: { id: currentUserId },
            select: {
              likes: true,
            },
          }),
        ])

        res.json({
          totalPostLikes: post?.likes || 0,
          currentUserLikes: user?.likes || 0,
        })
        return
      }

      case "POST": {
        if (typeof req.body?.count === "undefined") {
          throw new Error("Please pass a count")
        }

        const count = Number(req.body.count)

        const [post, user] = await Promise.all([
          prisma.postMeta.upsert({
            where: { slug: postId },
            create: {
              slug: postId,
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
            where: { id: currentUserId },
            create: {
              id: currentUserId,
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

        res.json({
          totalPostLikes: post?.likes || 0,
          currentUserLikes: user?.likes || 0,
        })

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
