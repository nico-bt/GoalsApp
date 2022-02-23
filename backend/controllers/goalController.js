const Goal = require("../models/goalModel")

// @desc    Get Goal
// @Route   GET /api/goals
// **************************************************
const getGoals = async (req,res)=>{
    try {
        const goals = await Goal.find({})
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
            text: req.body.text
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
            res.status(400).json({message: "Goal not found. No such ID"})
            return
        } else{
            const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, {text: req.body.text}, {new: true})
            res.status(200).json(updatedGoal)
        }
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