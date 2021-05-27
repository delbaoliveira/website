import { motion } from "framer-motion"

export const HEART_PATH =
  "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"

const emojiVariants = {
  hidden: { x: 10, y: 0, opacity: 0 },
  show: {
    x: 10,
    y: [-24, -50, -80],
    opacity: [0, 1, 0],
  },
}

const fillVariants = {
  "0": { translateY: 17 },
  "1": { translateY: 12 },
  "2": { translateY: 8 },
  "3": { translateY: 1 },
}

const emojis = ["👍", "🙏", "🥰"]

export const Heart = ({
  bgColor = "#ccc",
  likes,
  enableEmojis = true,
  className = "w-12",
}: {
  bgColor?: string
  likes: number
  enableEmojis?: boolean
  className?: string
}) => {
  return (
    <div className="relative">
      {/* Thank you emojis */}
      {enableEmojis ? (
        <div className="absolute text-2xl">
          {emojis.map((item, i) => {
            return (
              <motion.div
                key={i}
                initial="hidden"
                className="absolute"
                // Animate each emoji after a like action
                animate={likes === i + 1 && "show"}
                variants={emojiVariants}
              >
                {item}
              </motion.div>
            )
          })}
        </div>
      ) : null}

      {/* Heart */}
      <motion.svg
        initial={false}
        animate={String(likes)}
        viewBox="0 0 20 20"
        className={className}
        style={{ originX: "50%", originY: "50%" }}
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
          <linearGradient id="gradelba" x1="0%" y1="0%" x2="0%" y2="100%">
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
        </defs>

        {/* Heart shape mask */}
        <mask id="mask" mask-type="alpha" maskUnits="userSpaceOnUse">
          <path d={HEART_PATH} />
        </mask>

        <g mask="url(#mask)">
          {/* Background */}
          <rect width="20" height="20" fill={bgColor} />

          {/* Fill */}
          <motion.rect
            width="16"
            height="16"
            x="2"
            y="2"
            fill="url(#gradelba)"
            variants={fillVariants}
          />
        </g>
      </motion.svg>
    </div>
  )
}
