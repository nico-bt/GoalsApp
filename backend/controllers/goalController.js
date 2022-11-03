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
            return res.status(400).json({message: "Add text VALUE!"})
        }
        const newGoal = await Goal.create({
            text: req.body.text,
            user: req.user._id
        })
        res.status(200).json(newGoal)
        }
    catch (error) {
        console.log(error)
        res.json(error)
    }
}

// @desc    Update Goal
// @Route   PUT /api/goals/:id
// **************************************************
const updateGoal = async (req,res)=>{
    try {
        const goal = await Goal.findById(req.params.id)
        
        if (!goal) {
            return res.status(404).json({message: "Goal not found. No such ID"})
        }
        
        // Check if (user owner of the goal) == (user logged trying to update)
        // obs: ._id in MongoDB are type ObjectID --> for compare need to use ".toString()" or can be used a mongooseMethod
        if(goal.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "User not Authorized to update other people's goals"})
        }

        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, {text: req.body.text}, {new: true})
        res.status(200).json(updatedGoal)
    }
    catch (error) {
        if(error.name == "CastError"){
            return res.status(404).json({message: "Goal not found. No such ID"})
        }
        res.status(400).json(error)
        console.log(error)
    }
}

// @desc    Delete Goal
// @Route   DELETE /api/goals/:id
// **************************************************
const deleteGoal = async (req,res)=>{
    try {
        const goal = await Goal.findById(req.params.id)

        if (!goal) {
            return res.status(404).json({message: "Goal not found. No such ID"})
        }

        // Check if (user owner of the goal) == (user logged trying to delete)
        if(goal.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "User not Authorized to delete other people's goals"})
        }

        const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Deleted", id: deletedGoal._id, text: deletedGoal.text})
    } 
    catch (error) {
        if(error.name == "CastError"){
            return res.status(404).json({message: "Goal not found. No such ID"})
        }
        res.status(400).json(error)
        console.log(error)
    }
}


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}