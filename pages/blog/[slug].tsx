import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "@/lib/constants"
import { createOgImage } from "@/lib/og"
import { FormattedTweet, getTweets } from "@/lib/twitter"
import { Layout } from "@/ui/Layout"
import { LikeButton2 } from "@/ui/LikeButton2"
import { components } from "@/ui/MdxComponents"
import { PostMetrics } from "@/ui/PostMetrics"
import { Tweet } from "@/ui/Tweet"
import cx from "clsx"
import { allBlogs, Blog } from "contentlayer/generated"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useMDXComponent } from "next-contentlayer/hooks"
import { NextSeo } from "next-seo"
import Link from "next/link"
import React from "react"

export const getStaticPaths = () => {
  return {
    paths: allBlogs.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

// don't send fields we don't use to the client
// the biggest culprit is post.body.raw (the raw MDX source)
const getPartialPost = ({
  title,
  slug,
  publishedAtFormatted,
  description,
  body,
  series,
}: Blog) => ({
  title,
  slug,
  publishedAtFormatted,
  description,
  body: {
    code: body.code,
  },
  series: series
    ? {
        title: series.title,
        posts: allBlogs
          .filter((p) => p.series?.title === series.title)
          .sort(
            (a, b) =>
              Number(new Date(a.publishedAt)) - Number(new Date(b.publishedAt)),
          )
          .map((p) => {
            return {
              title: p.title,
              slug: p.slug,
              status: p.status,
              isCurrent: p.slug === slug,
            }
          }),
      }
    : null,
})

export const getStaticProps: GetStaticProps<{
  post: ReturnType<typeof getPartialPost>
  tweets: FormattedTweet[]
}> = async ({ params }) => {
  const post = allBlogs.find((post) => post.slug === params?.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post: getPartialPost(post),
      tweets: await getTweets(post.tweetIds),
    },
  }
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
      <div className="my-8 ">
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
            <PostMetrics slug={post.slug} />
          </div>

          <div className="mt-10 text-lg text-rose-100/70">
            <MDXContent
              components={{
                ...components,
                StaticTweet,
                Series,
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
