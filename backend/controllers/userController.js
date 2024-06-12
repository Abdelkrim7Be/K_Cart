 import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
 import jwt from 'jsonwebtoken'

// @desc  Auth user & get token 
// @route POST /api/users/login
// @access Public 
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // findOne is a mongoose method
    const user = await User.findOne({ email, });
    
    if (user && (await user.matchPassword(password))) {
        // Create the token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            // expiresIn : '1d',//1 day
            expiresIn: '120d',//1 day
        });

        // Set JWT as an HTTP Only Cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            // In production , that'll be true
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict', //That will prevent attacks
            maxAge: 120 * 24 * 60 * 60 * 1000, // 120 days in milliseconds
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin : user.isAdmin,
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
 });


// @desc  Register user 
// @route POST /api/users
// @access Public 
 const registerUser = asyncHandler(async (req, res) => {
     res.send('Register user');
 });


// @desc  Logout user / clear cookie
// @route POST /api/users/logout
// @access Private 
 const logoutUser = asyncHandler(async (req, res) => {
     res.send('Logout user');
 });


// @desc  Get user profile
// @route GET /api/users/profile
// @access Private 
 const getUserProfile = asyncHandler(async (req, res) => {
     res.send('get user profile');
 });


// @desc  Update user profile
// @route PUT /api/users/profile
// @access Private 
// We are gonna use json web tokens
 const updateUserProfile = asyncHandler(async (req, res) => {
     res.send('update user profile');
 });


// @desc  Get users 
// @route GET /api/users
// @access Private/Admin
 const getUsers = asyncHandler(async (req, res) => {
     res.send('get users');
 });

// @desc  Get user bu ID 
// @route GET /api/users/:id
// @access Private/Admin
 const getUserByID = asyncHandler(async (req, res) => {
     res.send('get user by ID');
 });


// @desc  Update user 
// @route PUT /api/users/:id
// @access Private/Admin
 const updateUser = asyncHandler(async (req, res) => {
     res.send('update user');
 });


// @desc  Delete user 
// @route DELETE /api/users/:id
// @access Private/Admin
 const deleteUser = asyncHandler(async (req, res) => {
     res.send('delete users');
 });


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
 }