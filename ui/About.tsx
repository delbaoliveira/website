import { LIGHT_COLORS } from "@/lib/constants"
import { shuffleArray } from "@/lib/shuffleArray"
import { useIsFontReady } from "@/lib/useIsFontReady"
import { Button } from "@/ui/Button"
import { RainbowHighlight } from "@/ui/RainbowHighlight"
import Image from "next/image"
import React from "react"
import Tilt from "react-parallax-tilt"
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"

export const About = () => {
  // Before animation, detect if custom fonts are loaded, so <RoughNotation />
  // SVG's are correctly positioned over the elements
  const isFontReady = useIsFontReady()

  const [colors, setColors] = React.useState<string[]>([])

  // Shuffle our colors and store them in state so the order is persisted during
  // React re-renders
  React.useEffect(() => {
    setColors(shuffleArray(LIGHT_COLORS))
  }, [])

  return (
    <div className="container px-4 mx-auto text-amber-200">
      <div className="lg:flex lg:flex-wrap lg:-mx-4">
        <div className="lg:w-2/3 lg:px-4">
          <RoughNotationGroup show={isFontReady}>
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
                <RainbowHighlight color={colors[2]}>
                  delightful
                </RainbowHighlight>
                .
              </p>

              <p className="my-2">
                I was a student at Lambda School where I spent 8 months learning
                the fundamentals of{" "}
                <RainbowHighlight color={colors[3]}>front-end</RainbowHighlight>{" "}
                and{" "}
                <RainbowHighlight color={colors[0]}>
                  back-end web development
                </RainbowHighlight>
                . I also worked at Lambda where my role was split between
                helping scale processes through automations and overseeing
                student teams.
              </p>

              <p className="my-2">
                Through these experiences, I had the opportunity to work with
                both small and large, specialised and cross-functional teams
                across different time zones and developed a working style that
                leans towards{" "}
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
                  <a
                    href="#contact"
                    className="font-medium text-gray-700 transition-colors hover:text-gray-900 focus:text-gray-900 focus:outline-none"
                  >
                    Hire me?
                  </a>
                </RoughNotation>
              </p>
            </div>
          </RoughNotationGroup>

          <div className="mt-4 space-y-3 md:space-y-0 md:space-x-3 md:flex">
            <Button
              href="https://www.linkedin.com/in/delbaoliveira/"
              target="_blank"
            >
              View Linkedin
            </Button>
            <Button
              kind="secondary"
              href="https://github.com/delbaoliveira/website"
            >
              View Github
            </Button>
          </div>
        </div>
        <div className="max-w-sm mt-12 lg:w-1/3 lg:px-4 lg:mt-0">
          <Tilt
            transitionSpeed={15000}
            tiltMaxAngleY={7}
            tiltMaxAngleX={7}
            glareEnable={true}
            glareMaxOpacity={0.3}
            glareBorderRadius="11px"
            tiltReverse={true}
            trackOnWindow={true}
          >
            <div className="shadow-2xl rounded-xl">
              <div
                className="shadow-xl rounded-xl"
                // unfortunate hack to remove the weird whitespace left by
                // next/image wrapper div
                style={{ fontSize: "0" }}
              >
                <Image
                  src="/delba.jpg"
                  alt="Profile"
                  width={752}
                  height={1001}
                  priority={true}
                  className="rounded-xl"
                />
              </div>
            </div>
          </Tilt>
        </div>
      </div>
    </div>
  )
}

About
