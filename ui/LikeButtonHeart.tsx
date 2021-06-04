import { motion } from "framer-motion"

export const HEART_PATH =
  "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"

const emojis = ["👍", "🙏", "🥰"]

// A visual component that...
// 1. Fills a heart s≈ape with a gradient depending on the number of likes passed
// 2. Animates a thank you emoji as the number of likes increase
export const LikeButtonHeart = ({
  likes,
  enableEmojis = true,
  isLarge = false,
}: {
  likes: number
  enableEmojis?: boolean
  isLarge?: boolean
}) => {
  return (
    <div className="relative">
      {/* Thank you emojis */}
      {enableEmojis ? (
        <div className="absolute w-full text-2xl text-center">
          {emojis.map((item, index) => {
            return (
              <motion.div
                key={index}
                className="absolute w-full"
                // Animate each emoji when `likes` equals their index
                animate={likes === index + 1 ? "show" : "hide"}
                variants={{
                  hide: { translateY: -80, opacity: 0 },
                  show: {
                    translateY: [0, -50, -80],
                    opacity: [0, 1, 0],
                  },
                }}
                initial="hide"
              >
                {item}
              </motion.div>
            )
          })}
        </div>
      ) : null}

      {/* Heart SVG */}
      <motion.svg
        viewBox="0 0 20 20"
        className={isLarge ? "w-20" : "w-12"}
        // Grow heart from center
        style={{ originX: "50%", originY: "50%" }}
        // Animated onHover and onClick
        whileHover="hover"
        whileTap="active"
        variants={{
          hover: {
            scale: 1.15,
          },
          active: {
            scale: 1.3,
          },
        }}
      >
        <defs>
          {/* Gradient definition */}
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#FACC15", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#EF4444", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#EC4899", stopOpacity: 1 }}
            />
          </linearGradient>

          {/* Heart shape mask definition */}
          <mask id="mask" mask-type="alpha" maskUnits="userSpaceOnUse">
            <path d={HEART_PATH} />
          </mask>
        </defs>

        {/* Wrap children in the mask */}
        <g mask="url(#mask)">
          {/* Heart background */}
          <rect width={20} height={20} fill="#E5E7EB" />

          {/* Heart gradient fill */}
          <motion.rect
            fill="url(#gradient)"
            width={16}
            height={16}
            x={2}
            y={2}
            // `animate` passes a stringified `like` to the variants map below
            animate={String(likes)}
            // Move gradient up or down depending on number of likes
            variants={{
              // 0 likes
              "0": { translateY: 17 },
              // 1 like etc
              "1": { translateY: 12 },
              "2": { translateY: 8 },
              "3": { translateY: 1 },
            }}
            initial="0"
          />
        </g>
      </motion.svg>
    </div>
  )
}
