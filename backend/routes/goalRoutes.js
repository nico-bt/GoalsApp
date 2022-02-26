const express = require("express")
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require("../controllers/goalController")
const {authorize} = require("../middleware/authMiddleware")

router.get("/", authorize, getGoals)

router.post("/", authorize, setGoal)

router.put("/:id", authorize, updateGoal)

router.delete("/:id", authorize, deleteGoal)

module.exports = router