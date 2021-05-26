import { ArrowRightIcon } from "@heroicons/react/solid"
import Link from "next/link"

const Screen = ({ day, description, link, children }) => {
  return (
    <Link href={link ? `${link}` : "/"}>
      <a>
        <div className="shadow-xl rounded-lg w-full mx-auto transition hover:shadow-2xl transform hover:scale-[1.02]">
          {/* Browser UI*/}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg">
            <div className="hidden w-12 space-x-1 md:flex">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full "></div>
            </div>
            <div className="min-w-0 mx-2 bg-white rounded-md md:flex-grow md:mx-4">
              <p className="px-4 py-1 text-gray-500 truncate leading-2">
                <span className="text-gray-700 ">Day {day}:</span> {description}
              </p>
            </div>
            <div className="mr-2">
              <ArrowRightIcon className="w-4 h-4 text-gray-500 transition transform hover:text-gray-700 hover:translate-x-2" />
            </div>
          </div>
          {/* Browser Screen*/}
          <div className="w-full h-56 mx-auto my-auto bg-white rounded-lg md:h-72 ">
            <div className="flex items-center justify-center h-full">
              {children}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Screen
