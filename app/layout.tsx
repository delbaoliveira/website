import { meta } from "@/lib/constants"
import { createOgImage } from "@/lib/createOgImage"
import "@/styles/globals.css"
import { SiteFooter } from "@/ui/SiteFooter"
import localFont from "next/font/local"
import clsx from "clsx"
import { Metadata, Viewport } from "next"
import { PreloadResources } from "@/lib/preload-resources"
import { Analytics } from '@vercel/analytics/react';


export const viewport: Viewport = {
  themeColor: "#1c1917",
}
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { template: "Delba | %s", default: "Delba" },
    metadataBase: new URL(`https://${meta.domain}`),
    openGraph: {
      title: meta.name,
      siteName: meta.name,
      type: "website",
      url: `https://${meta.domain}`,
      images: [
        {
          url: createOgImage({ title: meta.name, meta: meta.tagline }),
          width: 1600,
          height: 836,
          alt: meta.name,
        },
      ],
    },
    twitter: {
      creator: meta.twitterHandle,
      card: "summary_large_image",
    },
  }
}

const hubot = localFont({
  src: "../public/assets/HubotSans.woff2",
  variable: "--font-hubot",
  weight: "400 900",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="[color-scheme:dark]">
      <body
        className={clsx(
          "font-sans overscroll-y-none bg-gray-900 antialiased selection:bg-violet-600/90 selection:text-white",
          hubot.variable,
        )}
      >
        <PreloadResources />
        <svg
          className="pointer-events-none fixed isolate z-50 opacity-70 mix-blend-soft-light"
          width="100%"
          height="100%"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.80"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        <div className="layout-sm relative z-10 grid gap-y-8 px-4 pt-12 text-rose-200/90 xl:layout-xl xl:gap-x-9 xl:px-0 [&>*]:col-start-2 xl:[&>*]:col-start-3">
          {children}

          <SiteFooter />
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="h-full bg-[url('https://res.cloudinary.com/delba/image/upload/h_500/bg_gradient_pfosr9')] bg-top bg-no-repeat opacity-[0.3]" />
        </div>

        <Analytics />
      </body>
    </html>
  )
}
