const Workout = require ('../models/workout.model')
const mongoose = require('mongoose')

// Get all work out
const getWorkouts = async (req, res) =>{
   const workouts = await Workout.find({}).sort({createdAt: -1})

   res.status(200).json(workouts)
}

// Get a work out
const getWorkout = async (req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error: 'no such workout'})
    }
    res.status(200).json(workout)
}

// post all work out
const createWorkout = async (req, res) =>{
    const { title, load, reps} = req.body
    // add doc to DB
    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}
// delete all work out
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid workout ID' });
    }
  
    try {
      const workout = await Workout.findOneAndDelete({ _id: id });
  
      if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });
      }
  
      res.status(200).json(workout);
    } catch (error) {
      console.error('Error deleting workout:', error);
      res.status(500).json({ error: 'An error occurred while deleting the workout' });
    }
  };
  


// modify all work out
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

    if (!workout) {
        return res.status(404).json({ error: 'not updated' })
    }

    res.status(200).json(workout)
}

module.exports = { createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout}