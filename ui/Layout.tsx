import { Footer } from "@/ui/Footer"
import { Navigation } from "@/ui/Navigation"
import React from "react"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-5xl mx-auto antialiased">
      <Navigation />

      <main>{children}</main>

      <Footer />
    </div>
  )
}
