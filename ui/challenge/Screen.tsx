import { ArrowRightIcon } from "@heroicons/react/solid"
import Link from "next/link"

export const Screen = ({
  day,
  description,
  link,
  children,
}: {
  day: number
  description: string
  link: string
  children: React.ReactNode
}) => {
  return (
    <div className="w-full mx-auto transition rounded-lg shadow-xl hover:shadow-2xl">
      {/* Browser UI */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg">
        <div className="hidden w-12 space-x-1 md:flex">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full "></div>
        </div>
        <div className="min-w-0 mx-2 bg-white rounded-md md:flex-grow md:mx-4">
          <p className="px-4 py-1 text-gray-600 truncate leading-2">
            <span className="text-gray-800 ">Day {day}:</span> {description}
          </p>
        </div>
        <div className="mr-2">
          <Link href={link}>
            <a>
              <ArrowRightIcon className="w-4 h-4 text-gray-500 transition transform hover:text-gray-800 hover:translate-x-2" />
            </a>
          </Link>
        </div>
      </div>
      {/* Browser Screen */}
      <div className="relative w-full h-56 bg-white rounded-lg md:h-72">
        <div className="flex items-center justify-center h-full">
          {children}
        </div>

        <div className="absolute left-0 right-0 flex justify-center bottom-6">
          <Link href={link}>
            <a className="block px-4 py-2 text-center bg-white border border-gray-800 rounded shadow-md group focus:outline-none">
              Case study{" "}
              <ArrowRightIcon className="inline w-4 h-4 transition transform group-hover:translate-x-1" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
