
// @desc    Get Goal
// @Route   GET /api/goals
const getGoals = (req,res)=>{
    res.status(200).json({
        goal: "Goal here",
        message: "This is the GET route"
    })
}

// @desc    Set Goal
// @Route   POST /api/goals
const setGoal = (req,res)=>{
    res.status(200).json({
        goal: "Goal CREATED",
        message: "This is the POST route"
    })
}

// @desc    Update Goal
// @Route   PUT /api/goals/:id
const updateGoal = (req,res)=>{
    res.status(200).json({
        goal: `Goal ${req.params.id} ACTUALIZED`,
        message: "This is the PUT route"
    })
}

// @desc    Delete Goal
// @Route   DELETE /api/goals/:id
const deleteGoal = (req,res)=>{
    res.status(200).json({
        goal: `Goal ${req.params.id} DELETED`,
        message: "This is the DELETED route"
    })
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}