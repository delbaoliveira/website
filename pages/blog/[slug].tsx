import { allBlogs } from ".contentlayer/data"
import type { Blog } from ".contentlayer/types"
import { Layout } from "@/ui/Layout"
import { LikeButton2 } from "@/ui/LikeButton2"
import { components } from "@/ui/MdxComponents"
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
}> = async ({ params }) => {
  const post = allBlogs.find((post) => post.slug === params?.slug)!

  return {
    props: {
      post,
    },
  }
}

export default function PostPage({
  post,
  tweets,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <>
      <NextSeo
        title={`${post.title} • Delba de Oliveira`}
        description={post.description}
        canonical={`https://delba.dev/blog/${post.slug}`}
        openGraph={{
          type: "website",
          url: `https://delba.dev/blog/${post.slug}`,
          title: `${post.title} • Delba de Oliveira`,
          description: post.description,
          // images: [
          //   {
          //     url: `https://delba.dev/${post.image}`,
          //     width: 1200,
          //     height: 630,
          //     alt: post.title,
          //   },
          // ],
          site_name: "Delba de Oliveira",
        }}
        twitter={{
          handle: "@delba_oliveira",
          cardType: "summary_large_image",
        }}
      />

      <Layout>
        <div>
          <h1 className="text-2xl font-medium sm:text-4xl text-rose-50/90">
            {post.title}
          </h1>

          <div className="flex items-center mt-2 space-x-2 text-lg text-rose-100/70">
            <div>
              <Link href="/">
                <a className="hover:text-fuchsia-300/90">Delba</a>
              </Link>
            </div>

            <div className="text-rose-100/30">&middot;</div>

            <div>{post.publishedAtFormatted}</div>
          </div>

          <div className="mt-10 text-lg text-gray-300/90">
            <MDXContent
              components={{
                ...components,
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
