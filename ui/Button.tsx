import Link from "next/link"
import cx from "clsx"

export const Button = ({
  children,
  href,
  color = "primary",
  ...props
}: {
  href: string
  color?: "primary" | "secondary"
} & Omit<React.HTMLProps<HTMLAnchorElement>, "href">) => {
  return (
    <div>
      <Link href={href}>
        <a
          className={cx(
            "block px-8 py-2 text-center transition duration-200 border rounded focus:outline-none",
            {
              "text-white bg-gray-900  border-transparent  hover:bg-white hover:text-gray-800 hover:border-gray-800":
                color === "primary",
              "text-gray-600 border-gray-300 hover:border-gray-800 hover:text-gray-800":
                color === "secondary",
            },
          )}
          {...props}
        >
          {children}
        </a>
      </Link>
    </div>
  )
}
