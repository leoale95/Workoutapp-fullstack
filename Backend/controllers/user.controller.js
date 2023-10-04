require('dotenv').config();
const User = require('../models/user.model')
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
  try {
    const secret = process.env.SECRET;
    if (!secret || secret.length === 0) {
      throw new Error("Invalid secret key");
    }
    return jwt.sign({_id}, secret, {expiresIn: "3d"});
  } catch (error) {
    throw new Error("Failed to create token");
  }
}

// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.login(email, password)
  
      // create a token
      const token = createToken(user._id)
  
      res.cookie('token', token, {httpOnly: true, secure: true}) // set HttpOnly and secure flags for the token cookie
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }


// Sign up user
const SignupUser = async (req, res) =>{
    const {email, password} = req.body

    try{
        const user = await User.signup(email, password)
        
        const token = createToken(user._id) // create token
        res.status(201).json({email, token}) // Suggestion 1: Use status(201) for creation operations
    } catch (error){
        res.status(400).json({error: "Invalid email or password"}) // Suggestion 2: Use a generic error message
    }
    
}



module.exports = {SignupUser, loginUser}