import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"


const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <header >
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>Calculator</Link>
            </li>
            <li>
              <Link to='/journal'>Articles</Link>
            </li>
            <li>
              <Link to='/team'>Team</Link>
            </li>
            {/* <li>
              <Link to='/pricing'>Pricing</Link>
            </li> */}
            
            {/* <li>
              <Link to='/courses'>State Comparision</Link>
            </li> */}
            <li>
              <Link to='/contact'>Contact Us</Link>
            </li>
            
          </ul>
          <div className='start'>
            <div>IIT ROORKEE</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
