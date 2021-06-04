import useSWR from "swr"

const API_URL = `/api/likes/`

type LikesPayload = {
  totalPostLikes: number
  currentUserLikes: number
}

async function getPostLikes(id: string): Promise<LikesPayload> {
  const res = await fetch(API_URL + id)
  return res.json()
}

async function updatePostLikes(
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

// A custom hook to abstract away fetching and updating a user's likes
export const usePostLikes = (id: string) => {
  const { data, error, mutate } = useSWR(id, getPostLikes)

  const increment = async () => {
    // Prevent the user from liking more than 3 times
    if (!data || data.currentUserLikes >= 3) {
      return
    }

    // Optimistic ui pattern
    // update the swr cache so like count updates immediately for the user while
    // we update the database
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
