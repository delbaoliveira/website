import { Screen } from "@/ui/challenge/Screen"
import { AiOutlineInstagram } from "react-icons/ai"

export const AnimatedBackground = () => {
  return (
    <Screen>
      <div className="relative w-full h-80">
        <div className="w-full h-full origin-center animate-background-spin">
          <div className="w-full h-full transform scale-x-150 scale-y-300 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"></div>
        </div>
        <div className="absolute flex top-2/4 right-2/4">
          <AiOutlineInstagram className="w-20 h-20 -mt-10 -mr-10 text-white"></AiOutlineInstagram>
        </div>
      </div>
    </Screen>
  )
}
