import Footer from "@/ui/Footer"
import Nav from "@/ui/Navigation"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-5xl mx-auto antialiased">
      <Nav />

      <main>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
