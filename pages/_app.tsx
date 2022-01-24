import { seo } from "@/lib/seo"
import { useAnalytics } from "@/lib/useAnalytics"
import { DefaultSeo } from "next-seo"
import type { AppProps } from "next/app"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  useAnalytics()

  return (
    <>
      <DefaultSeo {...seo} />
      <Component {...pageProps} />
    </>
  )
}
