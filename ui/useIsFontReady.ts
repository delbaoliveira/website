import React from "react"

export function useIsFontReady() {
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts
    document.fonts.ready.then(() => {
      setIsReady(true)
    })
  }, [])

  return isReady
}
