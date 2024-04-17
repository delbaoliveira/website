import Image from "next/image"

const Delba = () => (
  <Image
    src="https://res.cloudinary.com/delba/image/twitter_name/c_thumb,g_face,h_380,w_380,q_100/delba_oliveira.jpg"
    quality={95}
    width={64}
    height={64}
    priority={true}
    className="rounded-full"
    alt="A photo of Delba"
  />
)

export const ProfileImage = () => {
  return (
    <div className="group transform rounded-full bg-gradient-to-tl from-purple-700/60 to-rose-400/60 p-0.5 shadow-lg transition ease-out hover:scale-105 hover:from-purple-700 hover:to-rose-400 hover:shadow-rose-500/25 active:translate-y-px">
      <div className="h-[36px] w-[36px] rounded-full p-px transition duration-300 group-hover:scale-105">
        <Delba />
      </div>
    </div>
  )
}

export const ProfileImageLarge = () => {
  return (
    <div className="rounded-full bg-gradient-to-tl from-purple-700/60 to-rose-400/60 p-1 shadow-lg ring-[5px] ring-purple-500/10">
      <Delba />
    </div>
  )
}
