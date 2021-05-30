import { GRADIENT_LINK } from "@/lib/constants"

export const Contact = () => {
  return (
    <div className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Get in touch</h2>
      <p className="mt-2 text-gray-700 lg:text-lg">
        Do you have a job opportunity or idea you'd like to discuss? Feel free
        to reach me at{" "}
        <a href="mailto:hello@delbaoliveira.com" className={GRADIENT_LINK}>
          hello@delbaoliveira.com
        </a>
        . You can also find me on{" "}
        <a
          href="https://twitter.com/delba_oliveira"
          target="_blank"
          className={GRADIENT_LINK}
        >
          Twitter
        </a>
        ,{" "}
        <a
          href="https://github.com/delbaoliveira"
          target="_blank"
          className={GRADIENT_LINK}
        >
          Github
        </a>{" "}
        and{" "}
        <a
          href="https://www.linkedin.com/in/delbaoliveira/"
          target="_blank"
          className={GRADIENT_LINK}
        >
          Linkedin
        </a>
        .
      </p>
    </div>
  )
}
