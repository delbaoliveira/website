import { useAnalytics } from "@/lib/useAnalytics"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Head from "next/head"
import Script from "next/script"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  useAnalytics()

  return (
    <>
      <Script
        src="/iguana/js/script.js"
        data-domain="delbaoliveira.com"
        data-api="/iguana/api/event"
      />
      <Head>
        <title>Delba de Oliveira</title>
      </Head>
      <ThemeProvider attribute="class" enableColorScheme={false}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
