import React from "react"
import { useIntersection } from "react-use"

export const useEnabledOnFirstIntersection = () => {
  const [enabled, setEnabled] = React.useState(false)
  const intersectionRef = React.useRef<HTMLDivElement | null>(null)
  const intersection = useIntersection(intersectionRef, {})

  React.useEffect(() => {
    if (!enabled && intersection?.isIntersecting) {
      setEnabled(true)
      intersectionRef.current = null
    }
  }, [intersection?.isIntersecting])

  return { enabled, intersectionRef }
}
