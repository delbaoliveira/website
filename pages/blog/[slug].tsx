import { getAllPostsMeta, getPostBySlug } from "@/lib/mdx"
import { Button } from "@/ui/Button"
import { Layout } from "@/ui/Layout"
import { LikeButton } from "@/ui/LikeButton"
import { components } from "@/ui/MdxComponents"
import { format, parseISO } from "date-fns"
import { getMDXComponent } from "mdx-bundler/client"
import { GetStaticProps } from "next"
import { NextSeo } from "next-seo"
import Image from "next/image"
import React from "react"
import type { Post } from "types/post"

export const getStaticPaths = () => {
  const posts = getAllPostsMeta()
  const paths = posts.map(({ slug }) => ({ params: { slug } }))

  return {
    paths: paths,
    // Return 404 page if path is not returned by getStaticPaths
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  const slug = context.params?.slug as string
  const post = await getPostBySlug(slug)

  return { props: post }
}

export default function PostPage({ meta, code }: Post) {
  // This is a bit weird, but this is how mdx-bundler recommends it.
  const Component = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <NextSeo
        title={`${meta.title} • Delba de Oliveira`}
        description={meta.description}
        canonical={`https://www.delbaoliveira.com/blog/${meta.slug}`}
        openGraph={{
          type: "website",
          url: `https://www.delbaoliveira.com/blog/${meta.slug}`,
          title: `${meta.title} • Delba de Oliveira`,
          description: meta.description,
          images: [
            {
              url: `https://www.delbaoliveira.com/${meta.image}`,
              width: 1200,
              height: 630,
              alt: meta.title,
            },
          ],
          site_name: "Delba de Oliveira",
        }}
        twitter={{
          handle: "@delba_oliveira",
          cardType: "summary_large_image",
        }}
      />

      <Layout>
        <div className="container max-w-3xl px-4 mx-auto mt-36">
          <h1 className="text-2xl font-bold md:text-4xl">{meta.title}</h1>

          <div className="flex items-center mt-4 space-x-2 text-gray-500">
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

          {meta.image ? (
            <div className="mt-10 overflow-hidden rounded-2xl text-[0px]">
              <Image src={`/${meta.image}`} width={1920} height={960} />
            </div>
          ) : null}

          <div className="mt-10 text-gray-900">
            <Component components={components as any} />
          </div>

          <div className="flex justify-center mt-16 space-x-8">
            {meta.source ? (
              <Button href={meta.source} target="_blank">
                View Source Code
              </Button>
            ) : null}
            <LikeButton id={meta.slug} />
          </div>
        </div>
      </Layout>
    </>
  )
}
