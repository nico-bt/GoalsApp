const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{
    res.status(200).json({
        goal: "Goal here",
        message: "This is the GET route"
    })
})

router.post("/", (req,res)=>{
    res.status(200).json({
        goal: "Goal CREATED",
        message: "This is the POST route"
    })
})

router.put("/:id", (req,res)=>{
    res.status(200).json({
        goal: `Goal ${req.params.id} ACTUALIZED`,
        message: "This is the PUT route"
    })
})

router.delete("/:id", (req,res)=>{
    res.status(200).json({
        goal: `Goal ${req.params.id} DELETED`,
        message: "This is the DELETED route"
    })
})

module.exports = router