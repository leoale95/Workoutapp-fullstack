import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  
  const handleClick = async () => {
    try {
      await axios.delete('http://localhost:8080/api/workouts/' + workout._id);
      
      // Elimina el objeto 'workout' del estado utilizando su _id
      dispatch({ type: 'DELETE_WORKOUT', payload: workout._id });
    } catch (error) {
      console.error('Error deleting workout:', error);
      // Maneja el error aquí si es necesario
    }
  }
    
  return (
    <Container maxWidth="xl">
      <Grid item xs={12}>
        <Card
          variant="outlined"
          sx={{
            background: '#fff',
            borderRadius: '4px',
            margin: '20px auto',
            padding: '20px',
            position: 'relative',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.05)',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{
                margin: '0 0 10px 0',
                fontSize: '1.2em',
                color: 'var(--primary)',
              }}
            >
              {workout.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ margin: '0', fontSize: '0.9em', color: '#555' }}
            >
              <strong>Load (kg):</strong> {workout.load}
            </Typography>
            <Typography
              variant="body2"
              sx={{ margin: '0', fontSize: '0.9em', color: '#555' }}
            >
              <strong>Reps:</strong> {workout.reps}
            </Typography>
            <Typography
              variant="body2"
              sx={{ margin: '0', fontSize: '0.9em', color: '#555' }}
            >
              {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}
            </Typography>
          </CardContent>
          <IconButton
            onClick={handleClick}
            sx={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              cursor: 'pointer',
              background: '#f1f1f1',
              padding: '6px',
              borderRadius: '50%',
              color: '#333',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Card>
      </Grid>
    </Container>
  );
}

export default WorkoutDetails;
