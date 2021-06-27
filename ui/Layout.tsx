import { Footer } from "@/ui/Footer"
import { Navigation } from "@/ui/Navigation"
import React from "react"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />
      <main className="max-w-4xl mx-auto mt-16 antialiased">{children}</main>
      <Footer />
    </div>
  )
}
