import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { reset, login } from '../features/auth/authSlice'
import { FaSignInAlt } from 'react-icons/fa'
import {toast} from "react-toastify"
import Spinner from "../components/Spinner"

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Data from Redux - authSlice state
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        if (isError) {
            toast.error(message, {position: "top-center"})
        }
        if (isSuccess || user) {
            navigate("/")
        }
        dispatch(reset())
      },
      [user, isError, isSuccess, message, navigate, dispatch])
    
    const onSubmit = (e) => {
        e.preventDefault()
        
        if(!email || !password) {
            return toast.error("Please enter all fields", {position: "top-center" });
        }
    
        const userData = { email, password }
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
      }

  return (
    <>
        <section className='heading'>
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Welcome back</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>

                <div className='form-group'>
                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={onChange}
                    />
                </div>

                <div className='form-group'>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Enter password'
                        onChange={onChange}
                    />
                </div>
          
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'> Login </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login