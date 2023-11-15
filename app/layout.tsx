import localFont from "next/font/local"
import cx from "clsx"
import "@/styles/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { template: "%s | Delba", default: "Delba" },
  description:
    "Welcome to my digital garden where I share what I'm learning about shipping great products, becoming a better developer and growing a career in tech.",
  twitter: {
    creator: "@delba_oliveira",
  },
  openGraph: {
    title: "Delba",
    url: `https://delba.dev`,
    siteName: "Delba",
    // TODO: Migrate OG image to use ImageResponse
    // images: [
    //   {
    //     url: createOgImage({ title, meta }),
    //     width: 1600,
    //     height: 836,
    //     alt: "Delba",
    //   },
    // ],
  },
}

const hubot = localFont({
  src: "../public/assets/HubotSans.woff2",
  variable: "--font-hubot",
  display: "swap",
  weight: "400 900",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cx("antialiased font-sans", hubot.variable)}>
        {children}
      </body>
    </html>
  )
}
