import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { Nav } from "@/ui/Nav"
import { ProfileImage } from "@/ui/ProfileImage"
import clsx from "clsx"
import Link from "next/link"

export function SiteHeader() {
  return (
    <div className="rounded-2xl bg-gray-800/95 py-2 pl-2.5 pr-6 shadow-surface-glass backdrop-blur [@supports(backdrop-filter:blur(0px))]:bg-white/[3%]">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          title="Navigate home"
          className={clsx("rounded-full", FOCUS_VISIBLE_OUTLINE)}
        >
          <ProfileImage />
        </Link>

        <Nav />
      </div>
    </div>
  )
}
