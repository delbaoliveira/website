import { LIGHT_COLORS } from "@/lib/constants"
import { shuffleArray } from "@/lib/shuffleArray"
import { useIsFontReady } from "@/lib/useIsFontReady"
import delbaImg from "@/public/delba.jpg"
import { RainbowHighlight } from "@/ui/RainbowHighlight"
import Image from "next/image"
import React from "react"
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
    <div className="container px-4 mx-auto">
      <div className="space-x-5 lg:flex item-center lg:-mx-4">
        <div className="lg:px-4 ">
          <RoughNotationGroup show={isFontReady}>
            <h1 className="text-lg font-bold text-gray-900 lg:text-4xl">
              Hello! I'm Delba.
            </h1>

            <div className="mt-6 text-gray-800">
              <p>
                I love building tools that are user-friendly, simple and
                delightful. I work as a 🤫
                {/* <RainbowHighlight color={colors[1]}>🤫</RainbowHighlight> */}{" "}
                at{" "}
                <a
                  href="https://company.com/"
                  className="font-semibold transition-colors hover:text-sky-500"
                  target="_blank"
                >
                  {" "}
                  🤫
                </a>
                .
              </p>
              <p className="mt-2">
                Welcome to my digital garden where I share notes on what I'm
                learning about{" "}
                <RainbowHighlight color={colors[2]}>
                  becoming a better developer
                </RainbowHighlight>{" "}
                and{" "}
                <RainbowHighlight color={colors[3]}>
                  growing a career in tech.
                </RainbowHighlight>{" "}
              </p>
              <p className="mt-2">
                You can find me hanging out on{" "}
                <RoughNotation
                  type="underline"
                  multiline={true}
                  iterations={2}
                  strokeWidth={2}
                  color={colors[0]}
                >
                  <a
                    href="https://twitter.com/delba_oliveira"
                    className="font-semibold transition-colors hover:text-sky-500"
                    target="_blank"
                  >
                    Twitter
                  </a>
                  .
                </RoughNotation>
              </p>
            </div>
          </RoughNotationGroup>
        </div>

        <div className="flex-shrink-0 mt-12 lg:px-4 lg:mt-0">
          <Image
            src={delbaImg}
            alt="Profile"
            placeholder="blur"
            priority={true}
            className="rounded-full"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  )
}

About
