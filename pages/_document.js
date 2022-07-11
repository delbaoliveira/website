import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en" className="scroll-p-24">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/assets/favicon.png?v=1" />
        <meta name="theme-color" content="#1c1917" />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/delba/image/upload/h_500/bg_gradient_pfosr9"
        />
      </Head>

      <body className="bg-gray-900 antialiased selection:bg-purple-500/90 selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
