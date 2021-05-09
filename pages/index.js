import React from "react"
import About from "@/ui/About"
import Contact from "@/ui/Contact"
import Layout from "@/ui/Layout"
import Projects from "@/ui/Projects"
import Skills from "@/ui/Skills"
import { useColorSeed } from "@/ui/useColorSeed"
import Words from "@/ui/Words"

export default function Home() {
  const seed = useColorSeed()

  return (
    <Layout>
      <div className="space-y-14 lg:space-y-24">
        <div id="about">
          <About seed={seed} />
        </div>

        <div id="skills">
          <Skills />
        </div>

        <div id="projects">
          <Projects seed={seed} />
        </div>

        <div id="words">
          <Words />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </div>
    </Layout>
  )
}
