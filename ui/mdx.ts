import fs from "fs"
import glob from "glob"
import matter from "gray-matter"
import { bundleMDX } from "mdx-bundler"
import path from "path"
import remarkSlug from "remark-slug"
import type { PostMeta } from "types/post"

const ROOT_PATH = process.cwd()
export const POSTS_PATH = path.join(ROOT_PATH, "posts")

export const getAllPostsMeta = () => {
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
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    )
}

export const getPostBySlug = async (slug: string) => {
  const source = fs.readFileSync(path.join(POSTS_PATH, `${slug}.mdx`), "utf8")

  const { code, frontmatter } = await bundleMDX(source, {
    xdmOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkSlug]

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
