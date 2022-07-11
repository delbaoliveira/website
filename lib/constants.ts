// show customised outline when an element has focus (but only if the user is
// using the keyboard)
// TODO: move this to a global css rule
export const FOCUS_VISIBLE_OUTLINE = `focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70`

export const LINK_STYLES = `text-rose-100/90 underline decoration-rose-200/30 underline-offset-2 transition-all hover:text-rose-100 hover:decoration-rose-200/50`

export const LINK_SUBTLE_STYLES = `hover:underline hover:decoration-rose-300/30 hover:underline-offset-2 hover:text-rose-200/90`

export const HEADING_LINK_ANCHOR = `before:content-['#'] before:absolute before:-ml-[1em] before:text-rose-100/0 hover:before:text-rose-100/50 pl-[1em] -ml-[1em]`

export const LINE_BREAK = `before:pointer-events-none before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px] before:rounded-sm before:bg-rose-200/5`

export const GRID_COLS_BLEED = ``
export const GRID_ASIDE_LEFT = `xl:!col-start-2`
export const GRID_ASIDE_RIGHT = `xl:!col-start-4`
export const GRID_ASIDE_CHILD = `xl:absolute xl:top-0 xl:left-0`
