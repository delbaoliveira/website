import { FOCUS_VISIBLE_OUTLINE, LINK_SUBTLE_STYLES } from "@/lib/constants"
import cx from "clsx"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="mt-36 pb-36 text-base">
      <div className="text-gray-500">
        <div className="flex flex-col justify-between font-medium lg:flex-row">
          <div className="flex space-x-5">
            <div>
              <Link href="/videos">
                <a className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}>
                  Videos
                </a>
              </Link>
            </div>

            <div>
              <Link href="/blog">
                <a className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}>
                  Posts
                </a>
              </Link>
            </div>

            <div>
              <Link href="/tweets">
                <a className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}>
                  Inspired Tweets
                </a>
              </Link>
            </div>

            <div>
              <Link href="/unicode">
                <a className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}>
                  Unicode
                </a>
              </Link>
            </div>
          </div>

          <div className="space-x-5 pt-2 lg:pt-0">
            <a
              href="https://twitter.com/delba_oliveira"
              className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
            >
              Twitter
            </a>
            <a
              href="https://www.youtube.com/delba"
              className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
            >
              YouTube
            </a>
            <a
              href="https://github.com/delbaoliveira"
              className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <p className="mt-8 text-gray-600">
        Built with{" "}
        <a
          href="https://nextjs.org"
          className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          Next.js
        </a>
        ,{" "}
        <a
          href="https://mdxjs.com"
          className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          MDX
        </a>
        ,{" "}
        <a
          href="https://tailwindcss.com"
          className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          Tailwind
        </a>{" "}
        and{" "}
        <a
          href="https://vercel.com"
          className={cx(LINK_SUBTLE_STYLES, FOCUS_VISIBLE_OUTLINE)}
        >
          Vercel
        </a>
      </p>
    </div>
  )
}
