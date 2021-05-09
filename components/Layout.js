import Nav from "../components/Navigation"
import Footer from "../components/Footer"

const Layout = ({ children }) => {
  return (
    <div className="max-w-5xl mx-auto antialiased">
      <Nav />

      <main>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
