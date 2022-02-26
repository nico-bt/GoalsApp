const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const authorize = async (req, res, next)=>{
    try {
        let token
        
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            // Get token from header
            token = req.headers.authorization.split(" ")[1]

            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if (decoded) {
                // Get user id from token, get user info from DB and assign it to req.user
                req.user = await User.findById(decoded.id).select("-password")
                next()
            } else {
                res.status(401).json({message: "Not Authorized"})
            }
        } else{
            // No Token
            res.status(401).json({message: "Not Authorized"})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({message: "Not Authorized"})
    }
}

module.exports = {authorize}