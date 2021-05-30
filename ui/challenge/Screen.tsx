import { ArrowRightIcon } from "@heroicons/react/solid"
import Link from "next/link"

export const Screen = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full transition rounded-lg shadow-xl hover:shadow-2xl">
      {/* Browser UI */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg">
        {/* Dots */}
        <div className="flex w-12 space-x-1 ">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full "></div>
        </div>
        {/* Address bar */}
        <div className="flex-grow min-w-0 mx-2 bg-white rounded-md md:mx-4">
          <div className="h-6"></div>
        </div>
        {/* Arrow */}
        <div className="mr-2">
          <span>
            <ArrowRightIcon className="w-4 h-4 text-gray-500" />
          </span>
        </div>
      </div>
      {/* Browser Screen */}
      <div className="relative overflow-hidden bg-white rounded-b-lg">
        {children}
      </div>
    </div>
  )
}
