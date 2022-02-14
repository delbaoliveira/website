import prisma from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const slug = z.string().parse(req.query.slug)

    switch (req.method) {
      case "GET": {
        const post = await prisma.post.findUnique({
          where: { slug },
        })

        res.json(post?.views || 1)
        break
      }

      case "POST": {
        const post = await prisma.post.upsert({
          where: { slug },
          create: { slug, views: 1 },
          update: { views: { increment: 1 } },
        })

        res.json(post?.views || 1)
        break
      }

      default: {
        res.setHeader("Allow", ["GET", "POST"])
        res.status(405).send("Method Not Allowed")
      }
    }
  } catch (err: any) {
    console.error(err.message)

    res.status(500).json({
      statusCode: 500,
      message: err.message,
    })
  }
}
