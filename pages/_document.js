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

      <body className="bg-gray-900">
        <div className="pointer-events-none absolute inset-0 top-[-400pxx] bg-[url('https://res.cloudinary.com/delba/image/upload/h_500/bg_gradient_pfosr9')] bg-top bg-no-repeat opacity-[0.3]"></div>
        <svg
          className="pointer-events-none fixed isolate z-50 opacity-40 mix-blend-soft-light"
          width="100%"
          height="100%"
        >
          <filter id="pedroduarteisalegend">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.80"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#pedroduarteisalegend)"
          ></rect>
        </svg>

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
