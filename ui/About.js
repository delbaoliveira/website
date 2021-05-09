import cx from "clsx"
import Image from "next/image"
import React from "react"
import Tilt from "react-parallax-tilt"
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import { useTimeout } from "react-use"
import { FOCUS_VISIBLE_OUTLINE } from "@/ui/constants"
import { RainbowHighlight } from "@/ui/RainbowHighlight"
import { getDarkColor } from "@/ui/useColorSeed"
import { useIsFontReady } from "@/ui/useIsFontReady"

const About = ({ seed }) => {
  const isFontReady = useIsFontReady

  const [fn, , reset] = useTimeout(
    // 🤮 magic number: roughly how long it takes for RoughNotationGroup to
    // finish animating
    4500,
  )

  React.useEffect(() => {
    // RoughNotationGroup starts animating *after* fonts are loaded, so reset
    // the timer to ensure we're starting from the same point
    reset()
  }, [isFontReady])

  const isNotationDone = fn()

  const notationSettings = {
    type: "highlight",
    padding: 0,
    multiline: true,
    padding: [0, 2],
    iterations: 1,
  }

  return (
    <div className="container px-4 mx-auto text-amber-200">
      <div className="lg:flex lg:flex-wrap lg:-mx-4">
        <div className="lg:w-2/3 lg:px-4">
          <RoughNotationGroup show={isFontReady}>
            <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
              Hello! I'm Delba, a{" "}
              <RainbowHighlight className="text-gray-900" colorIndex={seed[0]}>
                developer
              </RainbowHighlight>{" "}
              based in England.
            </h1>

            <div className="mt-4 text-gray-700">
              <p>
                I love building tools that are{" "}
                <RainbowHighlight
                  className="text-gray-700"
                  colorIndex={seed[1]}
                >
                  user-friendly, simple{" "}
                </RainbowHighlight>{" "}
                and{" "}
                <RainbowHighlight
                  className="text-gray-700"
                  colorIndex={seed[2]}
                >
                  delightful
                </RainbowHighlight>
                .
              </p>

              <p>
                I was a student at Lambda School where I spent 8 months learning
                the fundamentals of{" "}
                <RainbowHighlight
                  className="text-gray-700"
                  colorIndex={seed[3]}
                >
                  front-end
                </RainbowHighlight>{" "}
                and{" "}
                <RainbowHighlight
                  className="text-gray-700"
                  colorIndex={seed[4]}
                >
                  back-end web development
                </RainbowHighlight>
                .
              </p>

              <p>
                <RoughNotation
                  {...notationSettings}
                  type="strike-through"
                  color="#374151"
                  animationDuration={1200}
                  strokeWidth={1.2}
                >
                  I currently work at Lambda where my role is split between
                  helping scale processes through automations and overseeing
                  student teams.
                </RoughNotation>
              </p>

              <p>
                Through these experiences, I had the opportunity to work with
                both small and large, specialised and cross-functional teams
                across different time zones and developed a working style that
                leans towards{" "}
                <RainbowHighlight
                  className="text-gray-700"
                  colorIndex={seed[5]}
                >
                  flexibility,{" "}
                </RainbowHighlight>{" "}
                <RainbowHighlight
                  className="text-gray-700"
                  colorIndex={seed[6]}
                >
                  clarity
                </RainbowHighlight>{" "}
                and{" "}
                <RainbowHighlight
                  className="text-gray-700"
                  colorIndex={seed[0]}
                >
                  collaboration
                </RainbowHighlight>
                .
              </p>
            </div>
          </RoughNotationGroup>

          <div>
            <div className="text-gray-700">
              <span
                className={cx("transition duration-1000 ease-in-out", {
                  "opacity-0": !isNotationDone,
                  "opacity-100": isNotationDone,
                })}
              >
                I'm currently looking for
              </span>{" "}
              <span
                className={cx(
                  "transition duration-1000 ease-in-out delay-300",
                  {
                    "opacity-0": !isNotationDone,
                    "opacity-100": isNotationDone,
                  },
                )}
              >
                a new role as a developer.{" "}
              </span>
              <span
                className={cx(
                  "transition duration-1000 ease-in-out delay-500",
                  {
                    "opacity-0": !isNotationDone,
                    "opacity-100": isNotationDone,
                  },
                  getDarkColor(seed[1]),
                )}
              >
                <RoughNotation
                  {...notationSettings}
                  show={isNotationDone}
                  type="circle"
                  animationDuration={1500}
                  animationDelay={1700}
                  strokeWidth={1.5}
                  iterations={3}
                  padding={5}
                >
                  <a
                    href="#contact"
                    className="font-medium text-gray-700 transition-colors hover:text-gray-900 focus:text-gray-900 focus:outline-none"
                  >
                    Hire me?
                  </a>
                </RoughNotation>
              </span>
            </div>

            <div className="flex flex-wrap mt-6 space-x-4">
              <a
                href="/delba-resume.pdf"
                target="_blank"
                className={cx(
                  "inline-flex items-center lg:px-8 px-4 py-2 font-medium text-white bg-gray-700 border border-transparent rounded-full shadow-sm hover:bg-gray-800",
                  FOCUS_VISIBLE_OUTLINE,
                )}
              >
                View Resume
              </a>
              <a
                href="https://www.linkedin.com/in/delbaoliveira/"
                target="_blank"
                className={cx(
                  "inline-flex items-center lg:px-8 px-4 py-2 font-medium text-white bg-gray-700 border border-transparent rounded-full shadow-sm hover:bg-gray-800",
                  FOCUS_VISIBLE_OUTLINE,
                )}
              >
                View LinkedIn
              </a>
            </div>
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

export default About
