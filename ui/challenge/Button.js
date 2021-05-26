const Button = ({ children, link }) => {
  return (
    <a href={link} target="_blank">
      <button className="md:w-48 w-11/12 bg-gray-900 hover:bg-white hover:text-gray-800 border border-transparent hover:border-gray-800 text-white py-2.5 px-2 rounded m-2 transition duration-200 focus:outline-none">
        {children}
      </button>
    </a>
  )
}

export default Button
