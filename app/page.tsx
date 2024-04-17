import { meta } from "@/lib/constants"
import { getPosts } from "@/lib/posts"
import { BlogPostPreview } from "@/ui/BlogPostPreview"
import { IntersectionSwap } from "@/ui/IntersectionSwap"
import { Nav } from "@/ui/Nav"
import { NextMark } from "@/ui/NextMark"
import { ProfileImageLarge } from "@/ui/ProfileImage"
import { SiteHeader } from "@/ui/SiteHeader"
import { VercelMark } from "@/ui/VercelMark"
import { VideoPostPreview } from "@/ui/VideoPostPreview"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: meta.tagline,
  description: meta.description,
}

export default async function Page() {
  const { posts } = getPosts()

  return (
    <>
      <IntersectionSwap nav={<SiteHeader />}>
        <div className="space-y-8">
          <div className="flex items-center space-x-6">
            <ProfileImageLarge />

            <div className="mt-2">
              <h1 className="text-3xl font-semibold leading-none text-rose-100/90">
                Delba
              </h1>
              <h2 className="mt-2 items-center space-y-2 text-lg font-medium leading-none text-rose-100/50 lg:mt-0 lg:flex lg:space-y-0 lg:space-x-2">
                <div className="whitespace-nowrap">Developer Experience at</div>
                <div className="flex space-x-2">
                  <a
                    className="group flex items-center space-x-1.5"
                    href="https://vercel.com"
                  >
                    <div className="mb-1 h-6 w-6 rounded-md bg-black p-[7px] text-white shadow-lg shadow-rose-900/60 ring-2 ring-rose-400/20 group-hover:shadow-xl group-hover:shadow-rose-700 group-hover:ring-rose-400/30">
                      <VercelMark />
                    </div>
                    <div className=" group-hover:text-rose-100/90">Vercel</div>
                  </a>

                  <div className="text-2xl font-thin leading-none text-rose-100/10">
                    /
                  </div>

                  <a
                    className="group flex items-center space-x-1.5"
                    href="https://nextjs.org"
                  >
                    <div className="mb-1 h-6 w-6 rounded-md bg-black text-white shadow-lg shadow-blue-900/60 ring-2 ring-blue-400/20 group-hover:shadow-xl group-hover:shadow-blue-700 group-hover:ring-blue-400/30">
                      <NextMark />
                    </div>
                    <div className="group-hover:text-rose-100/90">Next</div>
                  </a>
                </div>
              </h2>
            </div>
          </div>

          <div className="text-xl text-rose-100/90">{meta.description}</div>

          <Nav />
        </div>
      </IntersectionSwap>

      <div className="mt-24 space-y-10">
        {posts.map((post) => {
          if (post.type === "Video") {
            return <VideoPostPreview key={post.youtube.id} {...post} />
          }

          if (post.type === "Post") {
            return <BlogPostPreview key={post.slug} {...post} />
          }
        })}
      </div>
    </>
  )
}
