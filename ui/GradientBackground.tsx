export const GradientBackground = ({
  children,
}: {
  children?: React.ReactNode
}) => {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-[-60vw] left-0 right-0 bottom-[-6vw] z-[-1] bg-gradient-to-r from-rose-400/20 via-fuchsia-500/20 to-indigo-500/20 blur-3xl sm:top-[-6vw] sm:right-[-7vw] sm:left-[-7vw]"></span>

      {children}
    </div>
  )
}
