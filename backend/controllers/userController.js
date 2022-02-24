const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs") //for hash password
const User = require("../models/userModel")

// @desc    Create new User
// @Route   POST /api/users
// **************************************************
const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body
        
        if(!name || !email || !password){
            return res.status(400).json({message: "Please add all fields"})
        }
        
        //Check if user already exists
        const alreadyExists = await User.findOne({email})
        if(alreadyExists){
            console.log(alreadyExists)
            return res.status(400).json({message: "User already exist with that email"})
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create new User
        const newUser = await User.create({
            name, 
            email, 
            password: hashedPassword
        })
        if(newUser){
            res.status(201).json({message: "Register USER!", name, id: newUser._id})
        } else {
            res.status(400).json({message: "Something went wrong accessing database. Please try again"})
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Login
// @Route   POST /api/users/login
// **************************************************
const loginUser = async (req, res)=>{
    res.json({message: "Login USER!"})
}

// @desc    Get User data
// @Route   GET /api/users/me
// **************************************************
const getMe = async (req, res)=>{
    res.json({message: "Display user data!"})
}


module.exports = {registerUser, loginUser, getMe}