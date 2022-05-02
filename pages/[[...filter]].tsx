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
import { allBlogs, allVideos, Tag } from "contentlayer/generated"
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
    ...allBlogs.filter((p) => p.status === "published").map(formatPostPreview),
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
      posts = posts.filter((p) => p.type === "Blog")

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
  })

  let showNav = false
  if ((intersection && !intersection.isIntersecting) || currentFilters) {
    showNav = true
  }

  return (
    <>
      {currentFilters ? <NextSeo noindex={true} /> : null}
      <Layout showNav={showNav} currentFilters={currentFilters}>
        <div className="-mt-12 sm:mt-0">
          <div ref={intersectionRef}>
            {!currentFilters ? (
              <div className="space-y-8 sm:space-y-12">
                <div className="flex items-center space-x-6">
                  <ProfileImage size="large" />

                  <div>
                    <h1 className="text-4xl font-medium text-rose-50/80">
                      Delba
                    </h1>
                    <h2 className="text-lg text-rose-100/60">
                      Developer Advocate at Vercel
                    </h2>
                  </div>
                </div>

                <p className="text-xl text-rose-50/80">{seo.description}</p>

                <Navigation />
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
                    <div className="rounded-lg bg-white/5 py-0.5 px-2 text-rose-100/90">
                      {currentFilters.tag}
                    </div>
                  ) : null}
                </div>

                {currentFilters.type === "videos" ? (
                  <a
                    href="https://youtube.com/playlist?list=PLo9a4XFa98CBynQ0HE_UstByk_-KXg6eU"
                    className="group flex items-center space-x-2"
                  >
                    <h2 className="text-lg text-rose-100/40 transition-colors group-hover:text-rose-100/80">
                      YouTube Playlist
                    </h2>

                    <YoutubeIcon className="w-5 text-rose-100/20 shadow-md transition-colors group-hover:text-red-500/70" />
                  </a>
                ) : null}
              </>
            ) : null}

            {posts.map((post) => {
              if (post.type === "Video") {
                return <VideoPostPreview key={post.youtube.id} {...post} />
              }

              if (post.type === "Blog") {
                return <BlogPostPreview key={post.slug} {...post} />
              }
            })}
          </div>
        </div>
      </Layout>
    </>
  )
}
