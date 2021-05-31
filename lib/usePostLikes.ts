import useSWR from "swr"

const API_URL = `/api/likes/`

type LikesPayload = {
  totalPostLikes: number
  currentUserLikes: number
}

export async function getPostLikes(url: string): Promise<LikesPayload> {
  const res = await fetch(url)
  return res.json()
}

export async function updatePostLikes(
  id: string,
  count: number,
): Promise<LikesPayload> {
  const res = await fetch(API_URL + id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count }),
  })
  return res.json()
}

export const usePostLikes = (id: string) => {
  const { data, error, mutate } = useSWR(API_URL + id, getPostLikes)

  const increment = async () => {
    if (!data || data.currentUserLikes >= 3) {
      return
    }

    // optimistic ui
    mutate(
      {
        totalPostLikes: data.totalPostLikes + 1,
        currentUserLikes: data.currentUserLikes + 1,
      },
      false,
    )

    // update db
    // TODO: debounce
    await updatePostLikes(id, 1)

    // trigger refetch
    mutate()
  }

  return {
    currentUserLikes: data?.currentUserLikes || 0,
    totalPostLikes: data?.totalPostLikes || 0,
    isLoading: !error && !data,
    isError: error,
    increment,
  }
}
