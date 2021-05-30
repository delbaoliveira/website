import { getAllPostsMeta, getPostBySlug } from "@/lib/mdx"
import { Layout } from "@/ui/Layout"
import { LikeButton } from "@/ui/LikeButton"
import { components } from "@/ui/MdxComponents"
import { format, parseISO } from "date-fns"
import { getMDXComponent } from "mdx-bundler/client"
import { GetStaticProps } from "next"
import Image from "next/image"
import React from "react"
import type { Post } from "types/post"

export const getStaticPaths = () => {
  const posts = getAllPostsMeta()
  const paths = posts.map(({ slug }) => ({ params: { slug } }))

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  const slug = context.params?.slug as string
  const post = await getPostBySlug(slug)

  return { props: post }
}

export default function PostPage({ meta, code }: Post) {
  // 'Tis weird, but that's how mdx-bundler recommends it.
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <Layout>
      <div className="container max-w-3xl px-4 mx-auto mt-36">
        {/* {meta.category ? (
          <div className="mb-2 text-gray-400 uppercase">{meta.category}</div>
        ) : null} */}
        <h1 className="text-3xl font-bold md:text-4xl">{meta.title}</h1>

        <div className="flex items-center mt-4 space-x-2 text-gray-600">
          <Image
            src="/avatar.jpg"
            height={24}
            width={24}
            className="rounded-full"
          />

          <div>Delba de Oliveira</div>

          <div className="text-gray-300">&middot;</div>

          <div>{format(parseISO(meta.publishedAt), "MMMM dd, yyyy")}</div>
        </div>

        <div className="mt-12">
          <Component components={components as any} />
        </div>

        <div className="mt-8">
          <LikeButton id={meta.slug} />
        </div>
      </div>
    </Layout>
  )
}
