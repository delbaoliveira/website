import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "@/lib/constants"
import { getPartialPost } from "@/lib/contentlayer"
import { createOgImage } from "@/lib/createOgImage"
import { FormattedTweet, getTweets } from "@/lib/twitter"
import { Aside } from "@/ui/Aside"
import { Layout } from "@/ui/Layout"
import { LikeButton2 } from "@/ui/LikeButton2"
import { components } from "@/ui/MdxComponents"
import { PostMetrics } from "@/ui/PostMetrics"
import { PostSeries } from "@/ui/PostSeries"
import { Tweet } from "@/ui/Tweet"
import clsx from "clsx"
import { allPosts } from "contentlayer/generated"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useMDXComponent } from "next-contentlayer/hooks"
import { NextSeo } from "next-seo"

export const getStaticPaths = () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  post: ReturnType<typeof getPartialPost>
  tweets: FormattedTweet[]
}> = async ({ params }) => {
  const post = allPosts.find((post) => post.slug === params?.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post: getPartialPost(post, allPosts),
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
    return <Tweet showAttachments={showAttachments} {...tweet} />
  }

  const url = `https://delba.dev/blog/${post.slug}`
  const title = `${post.title} | delba.dev`
  const ogImage = createOgImage({
    title: post.title,
    meta: "delba.dev · " + post.publishedAtFormatted,
  })

  return (
    <>
      <NextSeo
        title={title}
        description={post.description ?? undefined}
        canonical={url}
        openGraph={{
          url,
          title,
          description: post.description ?? undefined,
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
          <h1 className="text-2xl font-medium text-rose-100/90 sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-2 flex space-x-2 text-lg text-rose-100/50">
            <div>{post.publishedAtFormatted}</div>
            <div className="text-rose-100/30">&middot;</div>
            <PostMetrics slug={post.slug} />
          </div>
        </div>

        <div className="sticky top-6 !col-start-4 row-span-6 mt-1.5 hidden xl:block">
          <div className="space-y-10">
            {post.headings ? (
              <div className="space-y-2 text-sm">
                <div className="uppercase text-rose-100/30">On this page</div>

                {post.headings.map((heading) => {
                  return (
                    <div key={heading.slug}>
                      <a
                        href={`#${heading.slug}`}
                        className={clsx(
                          "block text-rose-100/50 underline-offset-2 transition-all hover:text-rose-100 hover:underline hover:decoration-rose-200/50",
                          {
                            "pl-2": heading.heading === 2,
                            "pl-4": heading.heading === 3,
                          },
                        )}
                      >
                        {heading.text}
                      </a>
                    </div>
                  )
                })}
              </div>
            ) : null}
            <LikeButton2 slug={post.slug} />
          </div>
        </div>

        {post.series && post.series.posts.length > 1 ? (
          <PostSeries data={post.series} isInteractive={true} />
        ) : null}

        <MDXContent
          components={{
            ...components,
            StaticTweet,
          }}
        />

        <div className="mt-16">
          <LikeButton2 slug={post.slug} />
        </div>
        {post.series && post.series.posts.length > 1 ? (
          <div className="mt-16">
            <PostSeries data={post.series} />
          </div>
        ) : null}
      </Layout>
    </>
  )
}
