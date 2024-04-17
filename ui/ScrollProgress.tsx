"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handler = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scroll = totalScroll / windowHeight

      setScroll(scroll)
    }

    window.addEventListener("scroll", handler)

    return () => window.removeEventListener("scroll", handler)
  }, [])

  console.log(scroll)

  return null
}
