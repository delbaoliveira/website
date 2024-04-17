// show customised outline when an element has focus (but only if the user is
// using the keyboard)
// TODO: move this to a global css rule
export const FOCUS_VISIBLE_OUTLINE = `focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70`

export const LINK_STYLES = `text-rose-200 underline decoration-rose-200/20 underline-offset-2 transition-all hover:text-rose-100 hover:decoration-rose-100/40`

export const LINK_SUBTLE_STYLES = `hover:underline hover:decoration-rose-300/30 hover:underline-offset-2 hover:text-rose-200/90`

export const HEADING_LINK_ANCHOR = `before:content-['#'] before:absolute before:-ml-[1em] before:text-rose-100/0 hover:before:text-rose-200/50 pl-[1em] -ml-[1em]`

export const OOF_GRAD = `bg-gradient-to-br from-rose-200 to-rose-200/30 bg-clip-text text-transparent`

export const meta = {
  name: "Delba",
  twitterHandle: "@delba_oliveira",
  domain: "delba.dev",
  tagline: "Developer Experience at ▲ Vercel and Next.js",
  description:
    "What I'm learning about shipping great products, becoming a better developer, and growing a career in tech.",
}
