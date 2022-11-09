const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs") //for hash password
const User = require("../models/userModel")

// req.user is filled when user log in with authMiddelware.js

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
            return res.status(400).json({message: "User already exist with that email"})
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create new User
        const newUser = await User.create({
            name, 
            email, 
            password: hashedPassword,
        })
        if(newUser){
            res.status(201).json({
                message: "Register USER!", 
                name: newUser.name, 
                id: newUser._id,
                token: generateToken(newUser._id)
            })
        } else {
            res.status(400).json({message: "Something went wrong accessing database. Please try again"})
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

// @desc    Login
// @Route   POST /api/users/login
// **************************************************
const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        //Check if user exists and if input-password vs. hashed-password in database match
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({message: "Invalid credentials"})
        }
    } catch (error) {
        res.json(error)
    }
}

// @desc    Get User data
// @Route   GET /api/users/me
// **************************************************
const getMe = async (req, res)=>{
    res.json(req.user)
}

// Generate JWT (jsonWebToken). Payload is going to be id
// **********************************************************
const generateToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "30d"})
}


module.exports = {registerUser, loginUser, getMe}