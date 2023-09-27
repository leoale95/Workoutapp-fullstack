import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useLogout } from '../hooks/logoutHook'
import { Link } from 'react-router-dom'; 
import {useAuthContext} from '../hooks/useAuthContext';

export default function ButtonAppBar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            color="inherit"
            component={Link}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Workout buddy
          </Typography>
          <nav>
            {user && (
          <div>
            <span>{user.email}</span>
            <Button color="inherit" onClick={handleClick}>Log out</Button>
          </div>
            )} 
          {!user && (

            <div>
            <Button color="inherit" component={Link} to="/login">
              Log in
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign up
            </Button>
          </div>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
