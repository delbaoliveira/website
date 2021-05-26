const data = [
  {
    name: "Bob Lauer",
    title: "Principal Engineer, Lambda School",
    text: "I had the privilege of working closely with Delba while rolling out a very complex program over the course of eight months. Delba was instrumental to the program's successful roll out and continued operations. She was always eager to help wherever she could and provided excellent documentation to the rest of the team, ensuring everyone knew exactly what to do. At our weekly planning meetings she would often raise points that the rest of the team had not considered while also providing solutions to the questions of other team members. I have enjoyed working with her immensely, and would jump at the opportunity to do so again in the future.",
  },
  {
    name: "Gabriel Cabrejas",
    title: "Web Instructor, Lambda School",
    text: "Delba is a talented Web Developer with a keen eye for detail, but also a compassionate and effective leader, capable of managing difficult situations with incredible ease. This combination of skills - technical and human - made her perfect at her job helping aspiring junior programmers break into software development. The months I spent working with Delba training our African and EU students where some of the most amazing times of my working life. Delba is everywhere at once, knows how to make the most of limited resources and gets the job done. But it's the finesse in her technical work what makes me particularly envious! I hope I'm lucky enough to work with Delba again in the future.",
  },
  {
    name: "Lukasz Busk",
    title: "Technical Project Lead, Lambda School",
    text: "Delba was the core of the team for inspiration and ideas, providing tremendous help on the design and overall front-end userflow. She was a very dependable person, helping the team fix crucial bugs, pair programming and making the whole team feel great around her. She displayed strong mastery of React and CSS, implemented a chat feature using socket.io and even added emojis. She really showed devotion to the team and the project, and the outcome was an amazing application.",
  },
]

const QuoteIcon = () => {
  return (
    <svg
      className="absolute top-0 left-0 w-8 h-8 text-gray-200 transform -translate-x-12"
      fill="currentColor"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
    </svg>
  )
}

const Words = () => {
  return (
    <div className="container px-4 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Nice words</h2>
      <h4 className="mt-2 text-gray-700 lg:text-lg">
        Some feedback from the people I've had the privilege of working with.
      </h4>

      {data.map((testimonial, i) => {
        return (
          <blockquote key={i} className="pl-12 mt-10">
            <div className="relative">
              <QuoteIcon />
              <div className="text-gray-700">{testimonial.text}</div>
            </div>

            <footer className="mt-2 font-bold text-gray-500">
              {testimonial.name}{" "}
              <span className="font-normal">&middot; {testimonial.title}</span>
            </footer>
          </blockquote>
        )
      })}
    </div>
  )
}

export default Words
