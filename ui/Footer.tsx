import { FOCUS_VISIBLE_OUTLINE, LINK_SUBTLE_STYLES } from "@/lib/constants"
import cx from "clsx"

export const Footer = () => {
  return (
    <div className="mt-36 pb-36">
      <div className="text-gray-500">
        <div className="flex flex-col justify-between lg:flex-row">
          <p>
            Built with{" "}
            <a
              href="https://twitter.com/delba_oliveira"
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
          <div className="pt-2 space-x-6 font-medium lg:pt-0">
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
    </div>
  )
}
