import { FOCUS_VISIBLE_OUTLINE, LIGHT_COLORS } from "@/lib/constants"
import { Screen } from "@/ui/challenge/Screen"
import { useHover } from "@react-aria/interactions"
import cx from "clsx"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import Tilt from "react-parallax-tilt"
import { RoughNotation } from "react-rough-notation"
import { PostMeta } from "types/post"

type Project = {
  name: string
  description: string
  image?: string
  url?: string
}

const Project = ({ project, color }: { project: Project; color: string }) => {
  let { hoverProps, isHovered } = useHover({})

  return (
    <Link href={project.url ? project.url : "/"}>
      <a className={cx("block", FOCUS_VISIBLE_OUTLINE)}>
        <div {...hoverProps}>
          {project.image ? (
            <Tilt
              transitionSpeed={10000}
              tiltMaxAngleY={8}
              tiltMaxAngleX={8}
              scale={1.01}
              glareEnable={true}
              glareMaxOpacity={0.3}
              glareBorderRadius="11px"
            >
              <Screen>
                <div style={{ fontSize: 0 }}>
                  <Image
                    src={project.image}
                    alt="Project Preview"
                    width={500}
                    height={300}
                    priority={true}
                  />
                </div>
              </Screen>
            </Tilt>
          ) : null}
          <p className="mt-6 text-xl font-bold text-gray-800">{project.name}</p>
          <p className="mt-2 text-gray-700 line-clamp-2">
            {project.description}
          </p>
          {project.url ? (
            <div className="mt-3">
              <RoughNotation
                type="underline"
                show={isHovered}
                strokeWidth={2}
                iterations={2}
                padding={2}
                animationDuration={300}
                color={color}
              >
                <span className="font-medium text-gray-800">View Project</span>
              </RoughNotation>
            </div>
          ) : null}
        </div>
      </a>
    </Link>
  )
}

export const Projects = ({ projects }: { projects: PostMeta[] }) => {
  return (
    <div className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
      <h4 className="mt-2 text-gray-500 lg:text-lg">
        Some of the side projects I'm currently working on:
      </h4>

      <div className="-mt-2 lg:flex lg:flex-wrap lg:-mx-6">
        {projects.map((project, index) => {
          return (
            <div key={index} className="mt-12 lg:w-1/2 lg:px-6">
              <Project
                project={{
                  name: project.title,
                  description: project.description,
                  image: `/${project.image}`,
                  url: `/blog/${project.slug}`,
                }}
                color={LIGHT_COLORS[index]}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
