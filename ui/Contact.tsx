import { GRADIENT_LINK } from "@/lib/constants"
import { RoughNotation } from "react-rough-notation"

export const Contact = () => {
  return (
    <div className="container px-4 mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Get in touch</h2>
      <p className="mt-6 text-gray-800">
        Do you have an idea you'd like to discuss? Feel free to reach me at{" "}
        <a
          href="mailto:hello@delbaoliveira.com"
          className="font-medium transition-colors hover:text-sky-500"
        >
          hello@delbaoliveira.com
        </a>
        .
      </p>
    </div>
  )
}
