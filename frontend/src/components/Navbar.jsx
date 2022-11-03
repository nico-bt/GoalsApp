import React from 'react'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

function Navbar() {
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Home</Link>
        </div>
        <ul>
            <li>
                <Link to={"/login"}> <FaSignInAlt /> Log in</Link>
            </li>
            <li>
                <Link to={"/register"}> <FaUser /> Register</Link>
            </li>
        </ul>
    </header>
  )
}

export default Navbar