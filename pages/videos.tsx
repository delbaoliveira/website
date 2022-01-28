import { videos } from "@/lib/videos"
import { ContentLink } from "@/ui/ContentLink"
import { Layout } from "@/ui/Layout"
import YoutubeIcon from "@/ui/YoutubeIcon"
import VideoCameraIcon from "@heroicons/react/solid/VideoCameraIcon"
import React from "react"

export default function BlogPage() {
  return (
    <Layout>
      <div>
        <div className="flex items-center justify-between space-x-4">
          <a
            href="https://youtube.com/playlist?list=PLo9a4XFa98CBynQ0HE_UstByk_-KXg6eU"
            className="group flex items-center space-x-4"
            title="Youtube playlist"
          >
            <div className="rounded-2xl bg-white/[5%] p-2 shadow-surface-elevation-low transition duration-300 group-hover:bg-white/[7%] group-hover:shadow-surface-elevation-medium">
              <VideoCameraIcon className="w-6 text-rose-100/20 transition-colors group-hover:text-rose-100/40" />
            </div>

            <div>
              <h2 className="text-2xl text-rose-100/40 transition-colors group-hover:text-rose-100/80">
                Videos
              </h2>
            </div>
          </a>

          <a
            href="https://youtube.com/playlist?list=PLo9a4XFa98CBynQ0HE_UstByk_-KXg6eU"
            className="group flex items-center space-x-2"
          >
            <h2 className="text-lg text-rose-100/40 transition-colors group-hover:text-rose-100/80">
              Playlist
            </h2>

            <YoutubeIcon className="w-5 text-rose-100/20 shadow-md transition-colors group-hover:text-red-500/70" />
          </a>
        </div>
        <div className="mt-12 space-y-10">
          {videos.map((post) => (
            <ContentLink
              key={post.url}
              title={post.title}
              text={post.description}
              href={post.url}
              meta={[post.category, post.date]}
              Icon={YoutubeIcon}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}
