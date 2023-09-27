const express = require ('express')
const {createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout} = require('../controllers/workout.controller')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// Workouts
router.get('/', getWorkouts)//Get all workouts
router.get('/:id', getWorkout) //Get a single workout
router.post('/', createWorkout) // Post a new workout
router.delete('/:id', deleteWorkout) //Delete
router.patch('/:id', updateWorkout) // Put a workout - modify

module.exports = router