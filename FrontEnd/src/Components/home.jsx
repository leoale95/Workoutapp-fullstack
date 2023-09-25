import React, { useEffect } from 'react';
import axios from 'axios';
import WorkoutDetails from './workoutDetails';
import WorkoutForm from './workoutForm';
import Grid from '@mui/material/Grid';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext(); 

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/workouts');
        const json = await response.data;

        if (response.status === 200) {
          dispatch({ type: 'SET_WORKOUTS', payload: json });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </Grid>
        <Grid item xs={6}>
          <WorkoutForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
