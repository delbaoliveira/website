import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import cx from "clsx"

export const Footer = () => {
  return (
    <div className="mt-36 pb-36">
      <div className="text-gray-500">
        <div className="flex flex-col justify-between lg:flex-row">
          <p>Built with Next.js, MDX, Tailwind and Vercel</p>
          <div className="pt-2 space-x-6 font-medium lg:pt-0">
            <a
              href="https://twitter.com/delba_oliveira"
              className={cx(
                "transition-colors hover:text-rose-200/90",
                FOCUS_VISIBLE_OUTLINE,
              )}
            >
              Twitter
            </a>
            <a
              href="https://www.youtube.com/delba"
              className={cx(
                "transition-colors hover:text-rose-200/90",
                FOCUS_VISIBLE_OUTLINE,
              )}
            >
              YouTube
            </a>
            <a
              href="https://github.com/delbaoliveira"
              className={cx(
                "transition-colors hover:text-rose-200/90",
                FOCUS_VISIBLE_OUTLINE,
              )}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
