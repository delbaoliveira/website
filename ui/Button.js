import Link from "next/link"

const Button = ({ children, link, ...props }) => {
  return (
    <Link href={link}>
      <a
        className="block px-8 py-2 text-center text-white transition duration-200 bg-gray-900 border border-transparent rounded hover:bg-white hover:text-gray-800 hover:border-gray-800 focus:outline-none"
        {...props}
      >
        {children}
      </a>
    </Link>
  )
}

export default Button
