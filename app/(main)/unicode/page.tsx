export default function Page() {
  const items = [
    {
      char: "▲",
      keywords: ["vercel", "black", "up", "triangle", "logo"],
    },
    {
      char: "◆",
      keywords: ["black", "diamond", "bullet", "twitter"],
      offset: -10,
    },
    {
      char: "¹",
      keywords: ["1", "one", "superscript", "number"],
    },
    {
      char: "²",
      keywords: ["2", "two", "superscript", "number"],
    },
    {
      char: "³",
      keywords: ["3", "three", "superscript", "number"],
    },
  ]

  return (
    <div className="space-y-14 lg:space-y-32">
      <div>
        <h1 className="text-3xl font-extrabold text-rose-100/90 lg:text-4xl">
          Unicode characters
        </h1>
        <div className="text-xl text-rose-100/40 lg:text-2xl">
          I'm always Googling
        </div>
      </div>

      <div className="mt-20 grid grid-cols-6 gap-4">
        {items.map((x) => (
          <div
            key={x.char}
            className="flex h-24 items-center justify-center rounded-2xl bg-white/[2%] shadow-surface-elevation-low transition duration-300 hover:bg-white/[3%] hover:shadow-surface-elevation-medium"
          >
            <div
              className="text-6xl font-bold text-rose-100/90 selection:bg-transparent selection:text-rose-300"
              style={{ marginTop: `${x.offset}px` }}
            >
              {x.char}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
