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
            <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
              Hi there, I'm Delba.
            </h1>

            <div className="mt-4 text-gray-800">
              <p>
                I love making tools that are user-friendly, simple and
                delightful. I work as a{" "}
                <RainbowHighlight color={colors[1]}>
                  Developer Advocate
                </RainbowHighlight>{" "}
                at{" "}
                <a href="https://vercel.com/" className="font-bold">
                  ▲ Vercel
                </a>{" "}
                &mdash; focusing on DX and helping the community create
                wonderful things.
              </p>
              <p className="mt-2">
                Welcome to my digital garden where I share what I'm learning
                about shipping{" "}
                <RainbowHighlight color={colors[2]}>
                  great products
                </RainbowHighlight>
                , becoming a{" "}
                <RainbowHighlight color={colors[3]}>
                  better developer
                </RainbowHighlight>{" "}
                and growing a{" "}
                <RainbowHighlight color={colors[0]}>
                  career in tech
                </RainbowHighlight>
                .
              </p>

              <p className="mt-2">
                Let's hang out on{" "}
                <a
                  href="https://twitter.com/delba_oliveira"
                  className="font-semibold transition-colors hover:text-sky-500"
                  target="_blank"
                >
                  Twitter
                </a>
                .
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
