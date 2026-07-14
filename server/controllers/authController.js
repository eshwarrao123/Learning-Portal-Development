import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc   Register new user
// @route  POST /api/auth/register
// @access Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('A user with that email already exists');
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    },
  });
});

// @desc   Authenticate user & return token
// @route  POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    },
  });
});

// @desc   Get current authenticated user
// @route  GET /api/auth/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'User profile retrieved',
    data: req.user,
  });
});

export { register, login, getMe };
