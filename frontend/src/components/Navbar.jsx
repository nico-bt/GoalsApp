import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from 'react-icons/fa'
import {useDispatch, useSelector} from "react-redux"
import { logout, reset } from '../features/auth/authSlice'

function Navbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Data from Redux - authSlice state
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/login")
    }

  return (
    <header className='header'>
        <ul>
            <li>
                <Link to='/'> <FaHome /> Home </Link>
            </li>
        </ul>

        {
            user? (
                <ul>
                    <li>
                        {user.name}
                    </li>
                    <li>
                        <button className='btn' onClick={onLogout}> <FaSignOutAlt /> Log out </button>
                    </li>
                </ul>
            )
            :
            (
            <ul>
                <li>
                    <Link to={"/login"}> <FaSignInAlt /> Log in</Link>
                </li>
                <li>
                    <Link to={"/register"}> <FaUser /> Register</Link>
                </li>
            </ul>
            )
        }
    </header>
  )
}

export default Navbar