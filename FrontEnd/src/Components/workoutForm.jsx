import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {useAuthContext} from '../hooks/useAuthContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const {user} = useAuthContext()
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You musst be logged in')
      return
    }
    const workout = { title, load, reps };

    try {
      const response = await axios.post('http://localhost:8080/api/workouts', workout, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });

      if (response.status === 200) {
        setTitle('');
        setLoad('');
        setReps('');
        setError(null);
        console.log('New workout Added');
        const createdWorkout = response.data; // Obtener el objeto JSON de la respuesta
        dispatch({ type: 'CREATE_WORKOUT', payload: createdWorkout }); // Usar createdWorkout en lugar de json
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add new workout</h3>
      <TextField
        label="Exercise Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <TextField
        label="Load (in KG)"
        variant="outlined"
        fullWidth
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />
      <br />
      <TextField
        label="Reps"
        variant="outlined"
        fullWidth
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <br />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Add Workout
      </Button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
