import { getAllPostsMeta } from "@/lib/mdx"
import { About } from "@/ui/About"
import { BlogPreview } from "@/ui/BlogPreview"
import { Contact } from "@/ui/Contact"
import { Layout } from "@/ui/Layout"
import { Projects } from "@/ui/Projects"
import { InferGetStaticPropsType } from "next"
import React from "react"

export const getStaticProps = async () => {
  const posts = getAllPostsMeta("post")
  const projects = getAllPostsMeta("project")
  return { props: { posts, projects } }
}

export default function Home({
  posts,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className="space-y-14 lg:space-y-24">
        <div id="about">
          <About />
        </div>

        <div id="blog">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl font-bold text-gray-800">Recent Posts</h2>
            <h4 className="mt-2 text-gray-500">
              Thoughts on what I'm building and learning.
            </h4>
            <div className="mt-6 space-y-8">
              {posts.map((post) => (
                <BlogPreview key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>

        <div id="projects">
          <Projects projects={projects} />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </div>
    </Layout>
  )
}
