import { HighlightOnHover } from "@/ui/HighlightOnHover"

const Contact = () => {
  return (
    <div className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Get in touch</h2>
      <p className="mt-2 text-gray-700 lg:text-lg">
        Do you have a job opportunity or idea you'd like to discuss? Feel free
        to reach me at{" "}
        <HighlightOnHover>
          <a href="mailto:hello@delbaoliveira.com" className="font-medium">
            hello@delbaoliveira.com
          </a>
        </HighlightOnHover>
        . You can also find me on{" "}
        <HighlightOnHover>
          <a
            href="https://twitter.com/delba_oliveira"
            target="_blank"
            className="font-medium"
          >
            Twitter
          </a>
        </HighlightOnHover>
        ,{" "}
        <HighlightOnHover>
          <a
            href="https://github.com/delbaoliveira"
            target="_blank"
            className="font-medium"
          >
            Github
          </a>
        </HighlightOnHover>{" "}
        and{" "}
        <HighlightOnHover>
          <a
            href="https://www.linkedin.com/in/delbaoliveira/"
            target="_blank"
            className="font-medium"
          >
            Linkedin
          </a>
        </HighlightOnHover>
        .
      </p>
    </div>
  )
}

export default Contact
