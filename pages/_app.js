import Head from "next/head"
import "tailwindcss/tailwind.css"
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Delba de Oliveira</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
