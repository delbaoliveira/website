import React from "react"
import About from "../components/About"
import Contact from "../components/Contact"
import Layout from "../components/Layout"
import Projects from "../components/Projects"
import Skills from "../components/Skills"
import { useColorSeed } from "../components/useColorSeed"
import Words from "../components/Words"

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
