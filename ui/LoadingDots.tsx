// Based on the fantastic https://vercel.com/design/loading-dots
export const LoadingDots = () => {
  return (
    <span className="space-x-1">
      <span className="inline-flex animate-[loading_1.4s_ease-in-out_infinite] rounded-full">
        &bull;
      </span>
      <span className="inline-flex animate-[loading_1.4s_ease-in-out_0.2s_infinite] rounded-full">
        &bull;
      </span>
      <span className="inline-flex animate-[loading_1.4s_ease-in-out_0.4s_infinite] rounded-full">
        &bull;
      </span>
    </span>
  )
}
