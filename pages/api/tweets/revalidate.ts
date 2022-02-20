import type { NextApiRequest, NextApiResponse } from "next"

// API route that revalidates the `/tweets` static page

// Github is configured to send a webhook to this API route when an update to
// a project is made: https://github.com/delbaoliveira/website/projects/1
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Ensure this webhook is from Github
  // Basic: In the webhook settings on Github, we've added a query string with
  // a secret to the payload URL e.g. delba.dev/api/tweets/revalidate?secret=abc

  // Todo: Properly secure the webhook by setting up payload hashing. See:
  // https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    //🙅‍♀️ No mask, no entry
    return res.status(401).json({ message: "Invalid token" })
  }

  try {
    // ♻️ Regenerate the `/tweets` page and push the resulting static files to
    // the edge
    await res.unstable_revalidate("/tweets")

    // ✅ Inform Github that we've successfully revalidated the page
    return res.json({ revalidated: true })
  } catch (err) {
    // ❌ Inform Github that we've failed to revalidate the page
    // Note: Next.js will continue showing the last successfully generated page
    return res.status(500).json({ message: "Error revalidating" })
  }
}
