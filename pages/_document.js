import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html className="scroll-p-24">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Karla:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" href="/assets/favicon.png?v=1" />
          <meta name="theme-color" content="#0e0c0b" />
        </Head>

        <body className="bg-[#0e0c0b]">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
