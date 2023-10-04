require('dotenv').config();
const express = require('express');
const workoutRoutes = require('./routes/workout.route');
const userRoutes = require('./routes/user.route');
const cors = require('cors');
const passport = require('passport');
const initializePassport = require('./config/passport.config');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: 'your-secret-key', // Cambia esto a una clave secreta segura
    resave: false,
    saveUninitialized: true,
  })
);

// initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);



module.exports = app;
