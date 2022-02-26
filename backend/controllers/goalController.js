const Goal = require("../models/goalModel")
const User = require("../models/userModel")

// req.user is filled when user log in with authMiddelware.js

// @desc    Get Goal
// @Route   GET /api/goals
// **************************************************
const getGoals = async (req,res)=>{
    try {
        // Find goals belonging to the logged user
        const goals = await Goal.find({user: req.user._id})
        res.status(200).json(goals)
    } 
    catch (error) {
        console.log(error)
    }
}

// @desc    Set Goal
// @Route   POST /api/goals
// **************************************************
const setGoal = async (req,res)=>{
    try {
        if (!req.body.text) {
            res.status(400).json({message: "Add text VALUE!"})
            return
            // throw new Error("Please add text field")
        }
        const newGoal = await Goal.create({
            text: req.body.text,
            user: req.user._id
        })
        res.status(200).json(newGoal)
        }
    catch (error) {
        console.log(error)
    }
}

// @desc    Update Goal
// @Route   PUT /api/goals/:id
// **************************************************
const updateGoal = async (req,res)=>{
    try {
        const goal = await Goal.findById(req.params.id)
        
        if (!goal) {
            return res.status(400).json({message: "Goal not found. No such ID"})
        }
        
        if(goal.user.toString() !== req.user._id){
            return res.status(401).json({message: "User not Authorized to update other people's goals"})
        }

        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, {text: req.body.text}, {new: true})
        res.status(200).json(updatedGoal)
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

// @desc    Delete Goal
// @Route   DELETE /api/goals/:id
// **************************************************
const deleteGoal = async (req,res)=>{
    try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
        if(!deletedGoal){
            res.status(400).json({message: "Not such id", id: req.params.id})
        }
        res.status(200).json({message: "Deleted", id: deletedGoal._id})

    } 
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}