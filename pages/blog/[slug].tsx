import { getAllPostsMeta, getPostBySlug } from "@/lib/mdx"
import { Layout } from "@/ui/Layout"
import { LikeButton2 } from "@/ui/LikeButton2"
import { components } from "@/ui/MdxComponents"
import { format, parseISO } from "date-fns"
import { getMDXComponent } from "mdx-bundler/client"
import { GetStaticProps } from "next"
import { NextSeo } from "next-seo"
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

  return {
    props: {
      ...post,
      publishedAtFormatted: format(
        parseISO(post.meta.publishedAt),
        "dd MMMM, yyyy",
      ),
    },
  }
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
        <div className="mt-36">
          <h1 className="text-2xl font-medium sm:text-4xl text-rose-50/90">
            {meta.title}
          </h1>

          <div className="flex items-center mt-2 space-x-2 text-lg text-rose-100/70">
            <div>Delba</div>

            <div className="text-rose-100/30">&middot;</div>

            <div>{meta.publishedAtFormatted}</div>
          </div>

          <div className="mt-10 text-lg text-gray-300/90">
            <Component components={components as any} />
          </div>

          <div className="mt-16">
            <LikeButton2 id={meta.slug} />
          </div>
        </div>
      </Layout>
    </>
  )
}
