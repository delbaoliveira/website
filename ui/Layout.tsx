import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
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
}: {
  children: React.ReactNode
  showNav?: boolean
}) => {
  return (
    <div className="bg-[#0e0c0b] min-h-screen selection:text-white selection:bg-purple-600/90 antialiased">
      <div className="relative z-10 w-full mx-auto sm:max-w-screen-sm">
        {/* TODO: Subtly animate based on mouse position */}
        <GradientBackground />
      </div>

      <div className="sticky z-30 w-full h-[72px] px-4 mx-auto sm:h-16 top-6 sm:max-w-screen-sm">
        <Transition
          show={showNav}
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-90"
          enterTo="opacity-100 scale-100"
          leave="ease-out"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="transform scale-100 transition px-4 h-full sm:px-6 bg-white/[3%] shadow-surface-glass backdrop-filter backdrop-blur rounded-2xl flex items-center justify-between firefox:bg-gray-900 firefox:bg-opacity-90"
        >
          <div className="flex items-center space-x-6">
            <Link href="/">
              <a
                title="/"
                className={cx("rounded-full", FOCUS_VISIBLE_OUTLINE)}
              >
                <ProfileImage size="small" isInteractive />
              </a>
            </Link>
          </div>

          <Navigation />
        </Transition>
      </div>

      <main className="relative z-10 w-full px-4 mx-auto sm:max-w-screen-sm">
        {children}

        <Footer />
      </main>
    </div>
  )
}
