import { FOCUS_VISIBLE_OUTLINE, LIGHT_COLORS } from "@/lib/constants"
import { shuffleArray } from "@/lib/shuffleArray"
import { Button } from "@/ui/Button"
import { RainbowHighlight } from "@/ui/RainbowHighlight"
import { PlayIcon } from "@heroicons/react/solid"
import cx from "clsx"
import React from "react"
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"

export const HeroDemo = () => {
  const [colors, setColors] = React.useState<string[]>([])
  const [isPlayed, setIsPlayed] = React.useState<boolean>(false)

  React.useEffect(() => {
    setColors(shuffleArray(LIGHT_COLORS))
  }, [])

  return (
    <div className="relative flex items-center justify-center p-6 my-6 border border-gray-100 rounded-md md:px-8 md:py-12 polka-bg-gray">
      {!isPlayed ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <button
            onClick={() => setIsPlayed(true)}
            className={cx(
              "p-24 transition-colors text-black hover:text-red-500",
              FOCUS_VISIBLE_OUTLINE,
            )}
          >
            <PlayIcon className="w-20" />
          </button>
        </div>
      ) : null}
      <div className={cx("px-4 mx-auto", { "opacity-40": !isPlayed })}>
        <RoughNotationGroup show={isPlayed}>
          <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
            Hello! I'm Delba, a{" "}
            <RainbowHighlight color={colors[0]}>developer</RainbowHighlight>{" "}
            based in England.
          </h1>

          <div className="mt-4 text-gray-700">
            <p className="my-2">
              I love building tools that are{" "}
              <RainbowHighlight color={colors[1]}>
                user-friendly, simple
              </RainbowHighlight>{" "}
              and{" "}
              <RainbowHighlight color={colors[2]}>delightful</RainbowHighlight>.
            </p>

            <p className="my-2">
              I was a student at Lambda School where I spent 8 months learning
              the fundamentals of{" "}
              <RainbowHighlight color={colors[3]}>front-end</RainbowHighlight>{" "}
              and{" "}
              <RainbowHighlight color={colors[0]}>
                back-end web development
              </RainbowHighlight>
              . I also worked at Lambda where my role was split between helping
              scale processes through automations and overseeing student teams.
            </p>

            <p className="my-2">
              Through these experiences, I had the opportunity to work with both
              small and large, specialised and cross-functional teams across
              different time zones and developed a working style that leans
              towards{" "}
              <RainbowHighlight color={colors[1]}>
                flexibility,
              </RainbowHighlight>
              <RainbowHighlight color={colors[2]}>clarity,</RainbowHighlight>{" "}
              and{" "}
              <RainbowHighlight color={colors[3]}>
                collaboration
              </RainbowHighlight>
              .
            </p>

            <p className="my-2">
              I'm currently looking for a new role as a developer.{" "}
              <RoughNotation
                type="circle"
                multiline={true}
                animationDuration={1500}
                animationDelay={1700}
                strokeWidth={2}
                iterations={3}
                padding={5}
                color={colors[1]}
              >
                <a className="font-medium text-gray-700 transition-colors hover:text-gray-900 focus:text-gray-900 focus:outline-none">
                  Hire me?
                </a>
              </RoughNotation>
            </p>
          </div>
        </RoughNotationGroup>

        <div className="mt-6 space-y-3 md:space-y-0 md:space-x-4 md:flex">
          <Button
            href="https://www.linkedin.com/in/delbaoliveira/"
            target="_blank"
          >
            View Linkedin
          </Button>
          <Button
            color="secondary"
            href="https://github.com/delbaoliveira/website"
            target="_blank"
          >
            View Github
          </Button>
        </div>
      </div>
    </div>
  )
}
