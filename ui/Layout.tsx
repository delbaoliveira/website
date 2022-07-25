import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { CurrentFilters } from "@/lib/types"
import { Footer } from "@/ui/Footer"
import { Navigation } from "@/ui/Navigation"
import { ProfileImage } from "@/ui/ProfileImage"
import { Transition } from "@headlessui/react"
import cx from "clsx"
import Link from "next/link"
import React from "react"
import { useWindowScroll } from "react-use"

const GradientBackground = () => {
  const { y } = useWindowScroll()

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="h-full bg-[url('https://res.cloudinary.com/delba/image/upload/h_500/bg_gradient_pfosr9')] bg-top bg-no-repeat opacity-[0.3] will-change-transform"
          style={{
            transform: `translateY(${Math.min(y / 3, 167)}px)`,
          }}
        ></div>
      </div>
    </>
  )
}

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
    <>
      <svg
        className="pointer-events-none fixed isolate z-50 opacity-70 mix-blend-soft-light"
        width="100%"
        height="100%"
      >
        <filter id="pedroduarteisalegend">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#pedroduarteisalegend)"
        ></rect>
      </svg>

      <div className="pointer-events-none fixed top-6 z-30 grid w-full grid-cols-[1fr,min(640px,100%),1fr] px-4">
        <Transition
          className="pointer-events-auto col-start-2 -mx-px rounded-2xl bg-gray-800/95 px-4 py-2.5 shadow-surface-glass backdrop-blur will-change-transform [@supports(backdrop-filter:blur(0px))]:bg-white/[3%]"
          show={showNav}
          enter="transition duration-100 ease-in-out"
          enterFrom="opacity-0 scale-90"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in-out"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/">
                <a
                  title="View home page"
                  className={cx("rounded-full", FOCUS_VISIBLE_OUTLINE)}
                >
                  <ProfileImage size="small" isInteractive />
                </a>
              </Link>
            </div>
            <Navigation currentFilters={currentFilters} />
          </div>
        </Transition>
      </div>

      <main className="relative z-10 grid grid-cols-[1fr,min(640px,100%),1fr] gap-y-8 px-4 pt-48 text-lg text-rose-100/90 xl:grid-cols-[1fr,minmax(auto,280px),min(640px,100%),minmax(auto,280px),1fr] xl:gap-x-8 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3">
        {children}

        <Footer />
      </main>

      <GradientBackground />
    </>
  )
}
