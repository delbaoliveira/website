import { allBlogs } from ".contentlayer/data"
import type { Blog } from ".contentlayer/types"
import { createOgImage } from "@/lib/og"
import { FormattedTweet, getTweets } from "@/lib/twitter"
import { Layout } from "@/ui/Layout"
import { LikeButton2 } from "@/ui/LikeButton2"
import { components } from "@/ui/MdxComponents"
import { Tweet } from "@/ui/Tweet"
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

export default function PostPage({
  post,
  tweets,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXContent = useMDXComponent(post.body.code)

  const StaticTweet = ({ id }: { id: string }) => {
    const tweet = tweets.find((tweet) => tweet.id === id)!
    return (
      <div className="my-6">
        <Tweet {...tweet} />
      </div>
    )
  }

  const url = `https://delba.dev/blog/${post.slug}`
  const title = `${post.title} — delba.dev`
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
          <h1 className="text-2xl font-medium sm:text-4xl text-rose-100/80">
            {post.title}
          </h1>

          <div className="flex items-center mt-2 space-x-2 text-lg text-rose-100/40">
            <div>
              <Link href="/">
                <a className="hover:text-rose-200/90">Delba</a>
              </Link>
            </div>

            <div className="text-rose-100/30">&middot;</div>

            <div>{post.publishedAtFormatted}</div>
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
            <LikeButton2 id={post.slug} />
          </div>
        </div>
      </Layout>
    </>
  )
}
