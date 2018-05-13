import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="container margin-top-75">
          I am home page.
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
export default HomePage
