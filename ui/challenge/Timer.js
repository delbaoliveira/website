import React from "react"
import { useTimer } from "react-timer-hook"

const Timer = () => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: 1624575599000,
    onExpire: () => console.warn("onExpire called"),
    autoStart: true,
  })

  return (
    <div className="flex flex-col justify-center h-full py-10 font-mono text-center bg-black rounded-b-lg polka-bg">
      <div className="text-4xl font-medium text-white md:text-5xl">
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

export default Timer
