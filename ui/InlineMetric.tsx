export const InlineMetric = ({
  stat,
  text,
}: {
  stat: number | undefined
  text?: string
}) => {
  return (
    <>
      <span className="-mx-0.5 animate-[mutation_2s_ease-in-out_1] rounded-md px-0.5 slashed-zero tabular-nums tracking-tight">
        {stat?.toLocaleString()}
      </span>

      {text ? (
        <>
          {" "}
          <span>{text}</span>
        </>
      ) : null}
    </>
  )
}
