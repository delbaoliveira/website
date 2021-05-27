import React from "react"
import { useTimer } from "react-timer-hook"

export const Timer = () => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: 1624575599000,
    // @ts-ignore it DOES exist and IS required
    autoStart: true,
  })

  return (
    <div className="flex flex-col justify-center w-full h-full py-10 font-mono text-center bg-black rounded-lg polka-bg-white">
      <div className="text-4xl font-bold text-white md:text-5xl">
        <span>
          {days < 10 ? `0` : ""}
          {days}
        </span>
        :
        <span>
          {hours < 10 ? `0` : ""}
          {hours}
        </span>
        :
        <span>
          {minutes < 10 ? `0` : ""}
          {minutes}
        </span>
        :
        <span>
          {seconds < 10 ? `0` : ""}
          {seconds}
        </span>
      </div>
      <p className="mt-2 text-gray-400">Until the challenge ends</p>
    </div>
  )
}
