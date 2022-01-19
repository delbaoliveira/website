import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import type { FormattedTweet } from "@/lib/twitter"
import { BadgeCheckIcon } from "@heroicons/react/solid"
import cx from "clsx"
import Image from "next/image"

/**
 * Supports plain text, quote tweets.
 *
 * Needs support for images, GIFs, and replies.
 */
export const Tweet = ({
  text,
  author,
  // media,
  createdAt,
  metrics,
  linkedTweets,
  type,
  likeUrl,
  replyUrl,
  retweetUrl,
  tweetUrl,
}: FormattedTweet) => {
  const quoteTweet =
    type !== "quoted" &&
    linkedTweets &&
    linkedTweets?.find((t) => t.type === "quoted")

  return (
    <div
      className={cx(
        "p-6 rounded-2xl bg-white/[2%] shadow-surface-elevation-low",
        FOCUS_VISIBLE_OUTLINE,
      )}
    >
      <div className="flex">
        {/* Author Image */}
        {type === "quoted" ? null : (
          <div className="flex-shrink-0 mr-3">
            <a
              className="w-12 h-12"
              href={author.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt={author.username}
                height={48}
                width={48}
                src={author.imageUrl}
                className="rounded-full"
              />
            </a>
          </div>
        )}

        <div className="flex-1 -mt-1">
          {/* Author meta */}
          <div className="flex flex-wrap items-center">
            <a
              href={author.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center group"
            >
              {type === "quoted" ? (
                <span className="w-5 h-5 mr-2">
                  <Image
                    alt={author.username}
                    height={48}
                    width={48}
                    src={author.imageUrl}
                    className="rounded-full"
                  />
                </span>
              ) : null}

              <span
                className="text-lg font-bold text-gray-100/90 group-hover:underline group-hover:text-gray-200/90 group-hover:decoration-gray-300/50 group-hover:underline-offset-2"
                title={author.name}
              >
                {author.name}
              </span>

              {author.verified ? (
                <BadgeCheckIcon className="w-5 h-5 ml-0.5 text-blue-500" />
              ) : null}

              <span
                className="ml-1.5 text-gray-400"
                title={`@${author.username}`}
              >
                @{author.username}
              </span>
            </a>

            <span className="ml-1.5 text-gray-600">&middot;</span>
            <a
              className="text-gray-400 hover:underline hover:decoration-gray-100/30 hover:underline-offset-2 ml-1.5"
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {createdAt}
            </a>
          </div>

          {/* Text */}
          <div className="mt-1 whitespace-pre-wrap text-gray-300/90">
            {text}
          </div>

          {/* Inline Media */}
          {/* {media && media.length ? (
            <div className="mt-4">
              {media.map((m) => {
                return (
                  <div
                    key={m.media_key}
                    className="overflow-hidden border border-gray-300 rounded-xl"
                    style={{ fontSize: 0 }}
                  >
                    <Image
                      alt={text}
                      height={m.height}
                      width={m.width}
                      src={m.preview_image_url || m.url}
                    />
                  </div>
                )
              })}
            </div>
          ) : null} */}

          {/* QuoteTweet */}
          {quoteTweet ? (
            <div className="mt-4">
              <Tweet {...quoteTweet} />
            </div>
          ) : null}

          {/* Actions */}
          {!type ? (
            <div className="flex mt-4 text-gray-700">
              {/* Replies */}
              <a
                className="flex items-center text-gray-500 w-28 hover:underline hover:decoration-gray-100/30 hover:underline-offset-2"
                href={replyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 mr-3 text-gray-600" viewBox="0 0 24 24">
                  <path
                    className="fill-current"
                    d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.143.225.385.347.633.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
                  />
                </svg>
                <span className="text-sm">{metrics.replies}</span>
              </a>
              {/* Retweet */}
              <a
                className="flex items-center text-gray-500 w-28 hover:underline hover:decoration-gray-100/30 hover:underline-offset-2"
                href={retweetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 mr-3 text-gray-600" viewBox="0 0 24 24">
                  <path
                    className="fill-current"
                    d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
                  />
                </svg>
                <span className="text-sm">{metrics.retweets}</span>
              </a>
              {/* Like */}
              <a
                className="flex items-center text-gray-500 w-28 hover:underline hover:decoration-gray-100/30 hover:underline-offset-2"
                href={likeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 mr-3 text-gray-600" viewBox="0 0 24 24">
                  <path
                    className="fill-current"
                    d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.813-1.148 2.353-2.73 4.644-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.375-7.454 13.11-10.037 13.156H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.035 11.596 8.55 11.658 1.52-.062 8.55-5.917 8.55-11.658 0-2.267-1.822-4.255-3.902-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.015-.03-1.426-2.965-3.955-2.965z"
                  />
                </svg>
                <span className="text-sm">{metrics.likes}</span>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}