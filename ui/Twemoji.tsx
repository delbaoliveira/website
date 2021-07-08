import Image from "next/image"
import emojiToUnicode from "emoji-unicode"
import React from "react"

export const Twemoji = React.memo(({ emoji }: { emoji: string }) => {
  const id = emojiToUnicode(emoji)
    // Remove "fe0f" if it's the last occurence in the string.
    // This ensures that it works with emojis that have a text variation i.e. ❤️
    // but does not remove the occurence for emojis that need it i.e. 🏳️‍🌈
    .replace(/ fe0f$/, "")
    // Replace spaces with a dash to match maxcdn's file naming convention.
    .replace(/\s+/g, "-")
  return (
    <>
      <Image
        src={`https://twemoji.maxcdn.com/v/latest/svg/${id}.svg`}
        width={48}
        height={48}
      ></Image>
    </>
  )
})
