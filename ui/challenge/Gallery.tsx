import { Screen } from "@/ui/challenge/Screen"
import { Timer } from "@/ui/challenge/Timer"
import { LikeButton } from "@/ui/LikeButton"

export const Gallery = () => {
  return (
    <div className="container px-4">
      <div className="grid grid-cols-1 gap-10 mx-auto md:grid-cols-2">
        <Screen
          day={0}
          description="About the challenge"
          link="/challenge/about"
        >
          <Timer />
        </Screen>
        <Screen
          day={1}
          description="A delightful like button"
          link="/challenge/day-01"
        >
          <LikeButton id="day-01" />
        </Screen>
      </div>
    </div>
  )
}
