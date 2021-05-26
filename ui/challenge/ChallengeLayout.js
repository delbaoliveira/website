import Footer from "@/ui/Footer"
import Nav from "@/ui/Navigation"
import Hero from "@/ui/challenge/Hero"
import React from "react"

const Layout = ({ children }) => {
  return (
    <div className="max-w-5xl mx-auto antialiased">
      <Nav />
      <Hero />

      <main>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
