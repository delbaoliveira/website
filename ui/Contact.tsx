import { RoughNotation } from "react-rough-notation"

export const Contact = () => {
  return (
    <div className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Get in touch</h2>
      <p className="mt-2 text-gray-700 lg:text-lg">
        Do you have an idea you'd like to discuss? Feel free to reach me at{" "}
        <RoughNotation
          show={true}
          type="underline"
          multiline={true}
          animationDuration={1500}
          strokeWidth={2}
          iterations={2}
          padding={5}
          color="#BFDBFE"
        >
          <a
            href="mailto:hello@delbaoliveira.com"
            className="transition-colors hover:text-gray-900 focus:text-gray-600 focus:outline-none"
          >
            hello@delbaoliveira.com.
          </a>
        </RoughNotation>
      </p>
    </div>
  )
}
