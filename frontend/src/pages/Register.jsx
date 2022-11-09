import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { reset, register } from '../features/auth/authSlice'
import { FaUser } from 'react-icons/fa'
import {toast} from "react-toastify"
import Spinner from "../components/Spinner"

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const {name, email, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Data from Redux - authSlice state
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        if (isError) {
            toast.error(message, {position: "top-center" })
        }
        if (isSuccess || user) {
            navigate("/")
        }
        dispatch(reset())
    },
    [user, isError, isSuccess, message, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        if(!name || !email || !password || !password2) {
            return toast.error("Please enter all fields", {position: "top-center" });
        }

        if (password !== password2) {
            return toast.error("Passwords dont match!", {position: "top-center" });
        }

        const userData = {name, email, password}
        dispatch(register(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

  return (
    <>
        <section className='heading'>
            <h1>
                <FaUser /> Register
            </h1>
            <p>Create an account</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Enter your name'
                        onChange={onChange}
                    />
                </div>

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
                    <input
                        type='password'
                        className='form-control'
                        id='password2'
                        name='password2'
                        value={password2}
                        placeholder='Confirm password'
                        onChange={onChange}
                    />
                </div>
          
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'> Submit </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register