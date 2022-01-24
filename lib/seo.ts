import { createOgImage } from "@/lib/og"
import type { DefaultSeoProps } from "next-seo"

const title = `Delba de Oliveira`
const description = `Welcome to my digital garden where I share what I'm learning about
shipping great products, becoming a better developer and growing a
career in tech.`
const domain = `delba.dev`
const twitter = `@delba_oliveira`

export const seo: DefaultSeoProps = {
  title,
  description,
  openGraph: {
    title,
    type: "website",
    url: `https://${domain}`,
    site_name: title,
    images: [
      {
        url: createOgImage({ title: title, meta: domain }),
        width: 1600,
        height: 836,
        alt: title,
      },
    ],
  },
  twitter: {
    handle: twitter,
    cardType: "summary_large_image",
  },
}
