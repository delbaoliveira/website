import type { LikesPayload } from "pages/api/likes/[slug]"
import useSWR from "swr"

const API_URL = `/api/likes/`

export async function getPostLikes(url: string): Promise<LikesPayload> {
  const res = await fetch(url)
  return res.json()
}

export async function updatePostLikes(
  slug: string,
  count: number,
): Promise<LikesPayload> {
  const res = await fetch(API_URL + slug, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count }),
  })
  return res.json()
}

export const usePostLikes = (slug: string) => {
  const { data, error, mutate } = useSWR(API_URL + slug, getPostLikes)

  const increment = async () => {
    if (!data || data.user >= 3) {
      return
    }

    // optimistic ui
    mutate(
      {
        post: data.post + 1,
        user: data.user + 1,
      },
      false,
    )

    // update db
    await updatePostLikes(slug, 1)

    // trigger refetch
    mutate()
  }

  return {
    currentUserLikes: data?.user || 0,
    totalPostLikes: data?.post || 0,
    isLoading: !error && !data,
    isError: error,
    increment,
  }
}
