import {
  allTagSlugs,
  formatPostPreview,
  formatVideoPreview,
} from "@/lib/contentlayer"
import { seo } from "@/lib/seo"
import { CurrentFilters } from "@/lib/types"
import { BlogPostPreview } from "@/ui/BlogPostPreview"
import { Layout } from "@/ui/Layout"
import { Navigation } from "@/ui/Navigation"
import { ProfileImage } from "@/ui/ProfileImage"
import { VideoPostPreview } from "@/ui/VideoPostPreview"
import YoutubeIcon from "@/ui/YoutubeIcon"
import cx from "clsx"
import { allPosts, allVideos, Tag } from "contentlayer/generated"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { NextSeo } from "next-seo"
import React from "react"
import { useIntersection } from "react-use"

export const getStaticPaths = () => {
  const paths = [
    // /
    { params: { filter: [] } },
    // /videos
    { params: { filter: ["videos"] } },
    // /blog
    { params: { filter: ["blog"] } },
    // /tag/:tag
    ...allTagSlugs.map((tag) => ({ params: { filter: ["tag", tag] } })),
    // /videos/tag/:tag
    ...allTagSlugs.map((tag) => ({
      params: { filter: ["videos", "tag", tag] },
    })),
    // /blog/tag/:tag
    ...allTagSlugs.map((tag) => ({ params: { filter: ["blog", "tag", tag] } })),
  ]

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  currentFilters: CurrentFilters
  posts: (
    | ReturnType<typeof formatVideoPreview>
    | ReturnType<typeof formatPostPreview>
  )[]
}> = async ({ params }) => {
  let posts = [
    ...allVideos.map(formatVideoPreview),
    ...allPosts.filter((p) => p.status === "published").map(formatPostPreview),
  ].sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
  )

  let currentFilters: CurrentFilters = null

  if (params?.filter && Array.isArray(params.filter)) {
    currentFilters = {}

    let tag: Tag["slug"] | undefined

    if (params.filter[0] === "videos") {
      posts = posts.filter((p) => p.type === "Video")

      currentFilters.type = "videos"

      if (params.filter[1] === "tag" && params.filter[2]) {
        tag = params.filter[2] as Tag["slug"]
      }
    } else if (params.filter[0] === "blog") {
      posts = posts.filter((p) => p.type === "Post")

      currentFilters.type = "blog"
      if (params.filter[1] === "tag" && params.filter[2]) {
        tag = params.filter[2] as Tag["slug"]
      }
    } else if (params.filter[0] === "tag" && params.filter[1]) {
      tag = params.filter[1] as Tag["slug"]
    }

    if (tag) {
      currentFilters.tag = tag
      posts = posts.filter((p) => p.tags.find((x) => x.slug === tag))
    }
  }

  return { props: { posts, currentFilters } }
}

export default function Home({
  posts,
  currentFilters,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "-100px",
  })

  let showNav = false
  if (currentFilters || (intersection && !intersection.isIntersecting)) {
    showNav = true
  }

  return (
    <>
      {currentFilters ? <NextSeo noindex={true} /> : null}
      <Layout showNav={showNav} currentFilters={currentFilters}>
        <div className="-mt-12 sm:mt-0">
          <div ref={intersectionRef}>
            {!currentFilters ? (
              <div
                className={cx("transition duration-300", {
                  "opacity-0": showNav,
                  "opacity-100": !showNav,
                })}
              >
                <div className="flex items-center space-x-6">
                  <ProfileImage size="large" />

                  <div>
                    <h1 className="text-3xl font-medium text-rose-100/80 sm:text-4xl">
                      Delba
                    </h1>
                    <h2 className="align-middle text-lg leading-6 text-rose-100/50">
                      <span className="hidden sm:inline">
                        Developer Experience
                      </span>
                      <span
                        className="inline sm:hidden"
                        title="Developer Experience"
                      >
                        DX
                      </span>{" "}
                      at{" "}
                      <span className="font-medium text-rose-100/70">
                        <span className="mr-px align-middle">
                          <span className="-my-2 inline-block text-[24px]">
                            ▲
                          </span>
                        </span>
                        Vercel
                      </span>
                    </h2>
                  </div>
                </div>

                <p className="mt-7 text-xl text-rose-100/90 sm:mt-9">
                  {seo.description}
                </p>

                <div className="mt-8 sm:mt-12">
                  <Navigation />
                </div>
              </div>
            ) : null}
          </div>

          <div
            className={cx(
              "space-y-10",
              currentFilters ? "mt-8" : "mt-20 sm:mt-32",
            )}
          >
            {currentFilters ? (
              <>
                <div className="flex space-x-2">
                  {currentFilters.tag ? (
                    <div className="rounded-full border border-rose-100/5 py-0.5 px-2 text-rose-100/90">
                      {currentFilters.tag}
                    </div>
                  ) : null}
                </div>

                {currentFilters.type === "videos" ? (
                  <div className="flex">
                    <a
                      href="https://youtube.com/playlist?list=PLo9a4XFa98CBynQ0HE_UstByk_-KXg6eU"
                      className="group flex items-center space-x-2"
                    >
                      <span className="text-lg text-rose-100/40 transition-colors group-hover:text-rose-100/80">
                        YouTube Playlist
                      </span>

                      <YoutubeIcon className="w-5 text-rose-100/20 shadow-md transition-colors group-hover:text-red-500/70" />
                    </a>
                  </div>
                ) : null}
              </>
            ) : null}

            {posts.map((post) => {
              if (post.type === "Video") {
                return <VideoPostPreview key={post.youtube.id} {...post} />
              }

              if (post.type === "Post") {
                return <BlogPostPreview key={post.slug} {...post} />
              }
            })}
          </div>
        </div>
      </Layout>
    </>
  )
}
