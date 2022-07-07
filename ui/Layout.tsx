import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { CurrentFilters } from "@/lib/types"
import { Footer } from "@/ui/Footer"
import { GradientBackground } from "@/ui/GradientBackground"
import { Navigation } from "@/ui/Navigation"
import { ProfileImage } from "@/ui/ProfileImage"
import { Transition } from "@headlessui/react"
import cx from "clsx"
import Link from "next/link"
import React from "react"

export const Layout = ({
  children,
  showNav = true,
  currentFilters,
}: {
  children: React.ReactNode
  showNav?: boolean
  currentFilters?: CurrentFilters
}) => {
  return (
    <div className="min-h-screen antialiased selection:bg-purple-500/90 selection:text-white">
      <Transition
        as={React.Fragment}
        show={showNav}
        enter="transition duration-100 ease-in-out"
        enterFrom="opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in-out"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="fixed top-6 z-30 w-full">
          <div className="mx-auto w-full px-[15px] sm:max-w-screen-sm">
            <div className="flex items-center justify-between rounded-2xl bg-gray-900/90 px-4 py-2.5 shadow-surface-glass backdrop-blur [@supports(backdrop-filter:blur(0px))]:bg-white/[3%]">
              <div className="flex items-center space-x-6">
                <Link href="/">
                  <a
                    title="🏠"
                    className={cx("rounded-full", FOCUS_VISIBLE_OUTLINE)}
                  >
                    <ProfileImage size="small" isInteractive />
                  </a>
                </Link>
              </div>
              <Navigation currentFilters={currentFilters} />
            </div>
          </div>
        </div>
      </Transition>

      <main className="relative z-10 mx-auto w-full px-4 pt-48 sm:max-w-screen-sm">
        {children}

        <Footer />
      </main>
    </div>
  )
}
