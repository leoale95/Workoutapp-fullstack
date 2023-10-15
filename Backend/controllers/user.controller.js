require('dotenv').config();
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  try {
    const secret = process.env.SECRET;
    if (!secret || secret.length === 0) {
      throw new Error("Invalid secret key");
    }
    return jwt.sign({ _id }, secret, { expiresIn: "3d" });
  } catch (error) {
    throw new Error("Failed to create token");
  }
}

 
// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    // Create a token
    const token = createToken(user._id);

    res.cookie('token', token, { httpOnly: true, secure: true });

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Sign up user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User with that email already exists");
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hashedPassword });

    // Create a token
    const token = createToken(newUser._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { signupUser, loginUser };
