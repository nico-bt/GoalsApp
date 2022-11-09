import React from 'react'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from 'react-icons/fa'

function Navbar() {
  return (
    <header className='header'>
        <ul>
            <li>
                <Link to='/'> <FaHome /> Home </Link>
            </li>
        </ul>
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