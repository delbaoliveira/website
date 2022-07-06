import React from "react"

export const FauxTweet = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-2xl bg-white/5 px-6 py-8 shadow-surface-elevation-low">
      <div className="flex">
        <div className="mr-4 h-14 w-14 shrink-0 rounded-full bg-rose-100/10"></div>
        <div>
          <div className="flex items-center space-x-3">
            <div className="h-3 w-32 rounded-lg bg-rose-100/40"></div>
            <div className="h-3 w-20 rounded-lg bg-rose-100/10"></div>
          </div>

          <div className="mt-6 space-y-2.5">
            <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
            <div className="h-3 w-11/12 rounded-lg bg-rose-100/20"></div>
            <div className="h-3 w-1/2 rounded-lg bg-rose-100/20"></div>
          </div>

          <div className="my-6 rounded-xl bg-white/5 px-3 pt-3 pb-5">
            <div className="-mb-4 -mt-8 lg:mx-12">{children}</div>

            <div>
              <div className="h-3 w-24 rounded-lg bg-rose-100/10"></div>
              <div className="mt-4 space-y-2.5">
                <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
                <div className="h-3 w-1/2 rounded-lg bg-rose-100/20"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="h-3 w-3 rounded-full bg-rose-100/10"></div>
              <div className="h-3 w-10 rounded-lg bg-rose-100/20"></div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="h-3 w-3 rounded-full bg-rose-100/10"></div>
              <div className="h-3 w-9 rounded-lg bg-rose-100/20"></div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="h-3 w-3 rounded-full bg-rose-100/10"></div>
              <div className="h-3 w-12 rounded-lg bg-rose-100/20"></div>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="h-3 w-3 rounded-full bg-rose-100/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
