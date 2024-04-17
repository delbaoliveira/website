import { FOCUS_VISIBLE_OUTLINE, LINK_SUBTLE_STYLES } from "@/lib/constants"
import clsx from "clsx"
import Link from "next/link"

export const SiteFooter = () => {
  return (
    <div className="mt-36 pb-36 text-base">
      <div className="text-rose-100/50">
        <div className="flex flex-col justify-between font-medium lg:flex-row">
          <div className="flex space-x-5">
            <div>
              <Link
                href="/videos"
                className={clsx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
              >
                Videos
              </Link>
            </div>

            <div>
              <Link
                href="/blog"
                className={clsx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
              >
                Posts
              </Link>
            </div>

            <a
              href="https://twitter.com/delba_oliveira"
              className={clsx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
            >
              Twitter
            </a>
            <a
              href="https://www.youtube.com/delba"
              className={clsx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
            >
              YouTube
            </a>
            <a
              href="https://github.com/delbaoliveira"
              className={clsx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <p className="mt-8 text-rose-200/30">
        Built with{" "}
        <a
          href="https://nextjs.org"
          className={clsx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          Next.js
        </a>
        ,{" "}
        <a
          href="https://mdxjs.com"
          className={clsx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          MDX
        </a>
        ,{" "}
        <a
          href="https://tailwindcss.com"
          className={clsx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          Tailwind
        </a>{" "}
        and{" "}
        <a
          href="https://vercel.com"
          className={clsx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          Vercel
        </a>
      </p>
    </div>
  )
}
