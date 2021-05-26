import { Timer } from "@/ui/challenge/Timer"
import { ArrowLeftIcon } from "@heroicons/react/solid"
import Link from "next/link"

const About = () => {
  return (
    <div className="h-screen font-mono bg-black polka-bg-white">
      <div className="max-w-3xl pt-10 mx-auto text-gray-100">
        <h1 className="py-4 text-3xl">Day 0: About this challenge</h1>
        <p className="my-4">
          The 30 day front-end challenge is inspired by{" "}
          <a
            href="https://www.hackerrank.com/domains/tutorials/30-days-of-code"
            className="text-gray-500"
          >
            HackerRank's 30 days of Code
          </a>{" "}
          and{" "}
          <a href="https://100dayscss.com/" className="text-gray-500">
            100 days of CSS.
          </a>{" "}
          I decided to put a twist on both these challenges by recreating real
          UI elements from around the web for the next 30 days.
        </p>
        <p className="my-4">
          For day 0, I drew inspiration from{" "}
          <a href="http://vercel.com/" className="text-gray-500">
            Vercel's website
          </a>{" "}
          to create the landing and about pages. Some components that might look
          familiar are the gradient transitions of the hero text, the minimalist
          black & white buttons and the black dotted grid background used in the{" "}
          <a href="https://nextjs.org/conf" className="text-gray-500">
            Next.js Conf Website
          </a>
          .
        </p>
        <p className="my-4">
          I also created a countdown timer for accountability. 👇
        </p>
        <div>
          <Timer></Timer>
        </div>
        <div className="flex justify-between">
          <Link href="/challenge">
            <a className="text-gray-500 group">
              <ArrowLeftIcon className="inline w-4 h-4 text-gray-500 transition transform cursor-pointer hover:text-gray-700 group-hover:-translate-x-1" />{" "}
              Go Back
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About
