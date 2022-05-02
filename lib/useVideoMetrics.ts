import useSWR, { SWRConfiguration } from "swr"

const API_URL = `/api/youtube`

type MetricsPayload = {
  views: number
  likes: number
}

export async function getVideoStats(id: string): Promise<MetricsPayload> {
  const res = await fetch(API_URL + `/${id}`)
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.")
  }
  return res.json()
}

export const useVideoMetrics = (id: string, config?: SWRConfiguration) => {
  const { data, error } = useSWR<MetricsPayload>(
    [API_URL, id],
    () => getVideoStats(id),
    {
      dedupingInterval: 60000,
      ...config,
    },
  )

  return {
    views: data?.views,
    likes: data?.likes,
    isLoading: !error && !data,
    isError: !!error,
  }
}
