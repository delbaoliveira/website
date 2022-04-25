import { createOgImage } from "@/lib/og"
import { FormattedTweet, getTweets } from "@/lib/twitter"
import { usePollIfInView } from "@/lib/usePollIfInView"
import { usePostLikes } from "@/lib/usePostLikes"
import { usePostViews } from "@/lib/usePostViews"
import { InlineMetric } from "@/ui/InlineMetric"
import { Layout } from "@/ui/Layout"
import { LikeButton2 } from "@/ui/LikeButton2"
import { LoadingDots } from "@/ui/LoadingDots"
import { components } from "@/ui/MdxComponents"
import { Tweet } from "@/ui/Tweet"
import { allBlogs, Blog } from "contentlayer/generated"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useMDXComponent } from "next-contentlayer/hooks"
import { NextSeo } from "next-seo"
import React from "react"

export const getStaticPaths = () => {
  return {
    paths: allBlogs.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  post: Blog
  tweets: FormattedTweet[]
}> = async ({ params }) => {
  const post = allBlogs.find((post) => post.slug === params?.slug)!
  const tweets = await getTweets(post.tweetIds)

  return {
    props: {
      post,
      tweets,
    },
  }
}

const Metrics = ({ slug }: { slug: string }) => {
  const interval = 5000
  const { shouldPoll, intersectionRef } = usePollIfInView(interval)

  const {
    views,
    isLoading: viewsIsLoading,
    isError: viewsIsError,
    increment: incrementViews,
  } = usePostViews(slug, {
    // Avoid fetching view count we *know* is stale since increment() mutation
    // returns view count
    revalidateOnMount: false,
    // Only poll when in view
    refreshInterval: shouldPoll ? interval : 0,
    // Override `usePostViews` default dedupingInterval for the polling usecase
    // (refresh interval can never be faster than deduping interval)
    dedupingInterval: interval,
  })

  const {
    likes,
    isLoading: likesIsLoading,
    isError: likesIsError,
  } = usePostLikes(slug, {
    // only poll when in view
    refreshInterval: shouldPoll ? interval : 0,
  })

  React.useEffect(() => {
    incrementViews()
  }, [])

  return (
    <div ref={intersectionRef} className="flex space-x-2 text-gray-500/90">
      <div>
        {viewsIsError || viewsIsLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={views} stat={views} />
        )}{" "}
        views
      </div>

      <div className="text-rose-100/30">&middot;</div>

      <div>
        {likesIsError || likesIsLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={likes} stat={likes} />
        )}{" "}
        likes
      </div>
    </div>
  )
}

export default function PostPage({
  post,
  tweets,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXContent = useMDXComponent(post.body.code)

  const StaticTweet = ({
    id,
    showAttachments,
  }: {
    id: string
    showAttachments?: boolean
  }) => {
    const tweet = tweets.find((tweet) => tweet.id === id)
    if (!tweet) {
      return null
    }
    return (
      <div className="my-6">
        <Tweet showAttachments={showAttachments} {...tweet} />
      </div>
    )
  }

  const url = `https://delba.dev/blog/${post.slug}`
  const title = `${post.title} — Delba de Oliveira`
  const ogImage = createOgImage({
    title: post.title,
    meta: "delba.dev · " + post.publishedAtFormatted,
  })

  return (
    <>
      <NextSeo
        title={title}
        description={post.description}
        canonical={url}
        openGraph={{
          url,
          title,
          description: post.description,
          images: [
            {
              url: ogImage,
              width: 1600,
              height: 836,
              alt: post.title,
            },
          ],
        }}
      />

      <Layout>
        <div>
          <h1 className="text-2xl font-medium text-rose-100/80 sm:text-4xl">
            {post.title}
          </h1>

          <div className="flex mt-2 space-x-2 text-lg text-rose-100/40">
            <div>{post.publishedAtFormatted}</div>
            <div className="text-rose-100/30">&middot;</div>
            <Metrics slug={post.slug} />
          </div>

          <div className="mt-10 text-lg text-rose-100/70">
            <MDXContent
              components={{
                ...components,
                StaticTweet,
              }}
            />
          </div>

          <div className="mt-16">
            <LikeButton2 slug={post.slug} />
          </div>
        </div>
      </Layout>
    </>
  )
}
