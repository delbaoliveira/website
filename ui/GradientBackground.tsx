export const GradientBackground = ({
  children,
}: {
  children?: React.ReactNode
}) => {
  return (
    <div className="relative">
      <span className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 absolute z-[-1] opacity-50 sm:opacity-20 pointer-events-none filter blur-3xl top-[-60vw] sm:top-[-6vw] left-0 right-0 bottom-[-6vw] sm:right-[-7vw] sm:left-[-7vw]"></span>

      {children}
    </div>
  )
}
