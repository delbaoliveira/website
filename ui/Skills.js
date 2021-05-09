import { Memetip } from "@/ui/Memetip"
import { IdProvider } from "@radix-ui/react-id"
import React from "react"
import cx from "clsx"

const data = [
  {
    title: "Design",
    items: [
      {
        text: "Figma",
        // src: "/figma.jpg"
      },
      {
        text: "Tailwind",
        // src: "/tailwind.jpg"
      },
      { text: "Design systems" },
      { text: "User research" },
    ],
  },
  {
    title: "Front-end",
    items: [
      { text: "Accessible HTML & CSS" },
      { text: "JavaScript & TypeScript" },
      {
        group: [
          {
            text: "React",
            // src: "/react.jpg"
          },
          {
            text: "Next.js",
            // src: "/next.jpg"
          },
          {
            text: "CRA",
            // src: "/cra.jpg"
          },
        ],
      },
      { text: "CSS-in-JS" },
    ],
  },
  {
    title: "Back-end",
    items: [
      { text: "Node.js" },
      { text: "REST & GraphQL APIs" },
      { text: "MySQL & PostgreSQL" },
      {
        text: "Prisma",
        // src: "/prisma.jpg"
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        group: [
          {
            text: "Vercel",
            // src: "/vercel.jpg"
          },
          {
            text: "AWS",
            // src: "/aws.gif",
          },
          { text: "Heroku" },
        ],
      },
      { text: "Testing (Jest)" },
      {
        text: "Zapier & Airtable",
        // src: "/nocode.jpg",
      },
      { text: "Scrum & Kanban" },
    ],
  },
]

const Skills = () => {
  return (
    <div className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Skills and tools</h2>
      <h4 className="text-gray-700 lg:text-lg">
        Some of the languages, tools and concepts I have experience with.
      </h4>

      <IdProvider>
        <div className="flex flex-wrap mt-5 -mx-4">
          {data.map((field, fieldIndex) => {
            return (
              <div key={fieldIndex} className="w-1/2 px-4 mt-4 lg:w-1/4">
                <div className="text-lg font-bold text-gray-800">
                  {field.title}
                </div>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  {field.items.map((item, itemIndex) => {
                    return (
                      <li
                        key={itemIndex}
                        className={cx({
                          "py-1": Boolean(!item.src && !item.group),
                        })}
                      >
                        {item.group ? (
                          item.group.map((child, childIndex) => {
                            const isSecondLast =
                              item.group.length - 1 === childIndex

                            return (
                              <React.Fragment key={childIndex}>
                                {isSecondLast
                                  ? " & "
                                  : childIndex !== 0 && ", "}

                                {child.src ? (
                                  <Memetip src={child.src}>
                                    {child.text}
                                  </Memetip>
                                ) : (
                                  <>{child.text}</>
                                )}
                              </React.Fragment>
                            )
                          })
                        ) : item.src ? (
                          <Memetip src={item.src}>{item.text}</Memetip>
                        ) : (
                          item.text
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </IdProvider>
    </div>
  )
}

export default Skills
