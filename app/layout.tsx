import localFont from "next/font/local"
import cx from "clsx"
import "@/styles/globals.css"
import type { Metadata, Viewport } from "next"
import { createOgImage } from "@/lib/createOgImage"
import { PreloadResources } from "@/lib/preload"

const title = `Delba`
const description = `Welcome to my digital garden where I share what I'm learning about shipping great products, becoming a better developer and growing a career in tech.`
const domain = `delba.dev`
const twitterHandle = `@delba_oliveira`
const meta = `Developer Experience at ▲ Vercel and Next.js`

export const viewport: Viewport = {
  themeColor: "#1c1917",
}

export const metadata: Metadata = {
  title: { template: `%s | ${title}`, default: title },
  description: description,
  twitter: {
    creator: twitterHandle,
  },
  openGraph: {
    title: "Delba",
    url: `https://${domain}/`,
    siteName: "Delba",
    // TODO: Migrate OG image to use ImageResponse
    images: [
      {
        url: createOgImage({ title, meta }),
        width: 1600,
        height: 836,
        alt: "Delba",
      },
    ],
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
    <html lang="en" className="scroll-p-24">
      <body
        className={cx(
          "antialiased font-sans bg-gray-900 selection:bg-purple-500/90 selection:text-white",
          hubot.variable,
        )}
      >
        <PreloadResources />
        {children}
      </body>
    </html>
  )
}
