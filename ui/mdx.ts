import fs from "fs"
import glob from "glob"
import matter from "gray-matter"
import { bundleMDX } from "mdx-bundler"
import path from "path"
import gfmPlugin from "remark-gfm"
import slugPlugin from "remark-slug"
import type { PostMeta } from "types/post"

const ROOT_PATH = process.cwd()
export const POSTS_PATH = path.join(ROOT_PATH, "posts")

export const getAllPostsMeta = () => {
  const PATH = path.join(POSTS_PATH)

  // Get all file paths in the posts folder (that end with .mdx)
  const paths = glob.sync(`${PATH}/**/*.mdx`)

  return (
    paths
      .map((filePath): PostMeta => {
        // Get the content of the file
        const source = fs.readFileSync(path.join(filePath), "utf8")

        // Get the file name without .mdx
        const slug = path.basename(filePath).replace(".mdx", "")
        // Use gray-matter to extract the post meta from post content
        const data = matter(source).data as PostMeta

        return {
          ...data,
          slug,
        }
      })
      // Sort posts by published date
      .sort(
        (a, b) =>
          Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
      )
  )
}

// Get content of specific post
export const getPostBySlug = async (slug: string) => {
  // Get the content of the file
  const source = fs.readFileSync(path.join(POSTS_PATH, `${slug}.mdx`), "utf8")

  const { code, frontmatter } = await bundleMDX(source, {
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        slugPlugin,
        gfmPlugin,
      ]

      return options
    },
  })

  const meta = {
    ...frontmatter,
    slug,
  } as PostMeta

  return {
    meta,
    code,
  }
}
