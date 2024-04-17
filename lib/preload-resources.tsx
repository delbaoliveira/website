"use client"

import ReactDOM from "react-dom"

export function PreloadResources() {
  ReactDOM.preload(
    "https://res.cloudinary.com/delba/image/upload/h_500/bg_gradient_pfosr9",
    { as: "image" },
  )

  return null
}
