const express = require ('express')
const {createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout} = require('../controllers/workout.controller')
const router = express.Router()

// Workouts
router.get('/', getWorkouts)//Get all workouts
router.get('/:id', getWorkout) //Get a single workout
router.post('/', createWorkout) // Post a new workout
router.delete('/:id', deleteWorkout) //Delete
router.patch('/:id', updateWorkout) // Put a workout - modify

module.exports = router