import { getTweets } from "@/lib/twitter"
import { Layout } from "@/ui/Layout"
import { Tweet } from "@/ui/Tweet"
import type { InferGetStaticPropsType } from "next"
import React from "react"

export const getStaticProps = async () => {
  // Get tweet ids from a Github project using Github's GraphQL API
  const response: GithubResponse = await fetch(
    "https://api.github.com/graphql",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `query ($columnId: ID!) {
          node(id: $columnId) {
            ... on ProjectColumn {
              cards {
                nodes {
                  note
                }
              }
            }
          }
        }`,
        variables: {
          columnId: "PC_lATOFczi5s4A18MOzgEPohk",
        },
      }),
    },
  ).then((res) => res.json())

  const tweetIds = response?.data?.node?.cards?.nodes?.map((card) => card.note)

  // Get the actual tweets from Twitter using the Twitter API
  const tweets =
    tweetIds && tweetIds.length > 0 ? await getTweets(tweetIds) : []

  return { props: { tweets } }
}

export default function BlogPage({
  tweets,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-3xl font-medium text-rose-100/90 lg:text-4xl">
            Inspired Tweets
          </h1>
          <div className="mt-2 text-lg text-rose-100/40 lg:text-xl">
            Tweets that capture a sentiment I'd like to remember
          </div>
        </div>

        <div className="mt-16 space-y-14">
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

type GithubResponse = {
  data?: { node: { cards: { nodes: { note: string }[] } } }
}
