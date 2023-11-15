import { seo } from "@/lib/seo"
import localFont from "next/font/local"
import cx from "clsx"
import { DefaultSeo } from "next-seo"
import type { AppProps } from "next/app"
import "../styles/globals.css"

const hubot = localFont({
  src: "../public/assets/HubotSans.woff2",
  variable: "--font-hubot",
  weight: "400 900",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seo} />
      <main className={cx("font-sans", hubot.variable)}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
