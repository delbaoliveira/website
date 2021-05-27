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

export const getAllPostsMeta = (filters?: {
  category?: PostMeta["category"]
  status?: PostMeta["status"]
}) => {
  const PATH = path.join(POSTS_PATH)
  const paths = glob.sync(`${PATH}/**/*.mdx`)

  return paths
    .map((filePath): PostMeta => {
      const source = fs.readFileSync(path.join(filePath), "utf8")
      const slug = path.basename(filePath).replace(".mdx", "")
      const data = matter(source).data as PostMeta

      return {
        ...data,
        slug,
      }
    })
    .filter((post) => {
      if (!filters) return true

      let include = true

      if (filters.category) {
        include = post.category === filters.category
      }

      if (filters.status) {
        include = post.status === filters.status
      }

      return include
    })
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    )
}

export const getPostBySlug = async (slug: string) => {
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
