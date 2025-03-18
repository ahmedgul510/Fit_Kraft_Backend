const express =require('express')
const asyncHandler=require('express-async-handler')
const User=require('../Models/UserModel')


const getUser=asyncHandler(async(req, res) => {
    const users=await User.find()
    res.status(200).json(users)
})  

const CreateUser=asyncHandler(async(req, res) => {
    try {    
        if(!req.body) {
            res.status(400).json({message: "Request body is missing"});
            return;
        }

        const {
            name,
            nickname,
            email,
            password,
            height,
            weight,
            age,
            gender,
            goal,
            activityLevel,
            bmi,    // These values are now coming from middleware
            bmr     // These values are now coming from middleware
        } = req.body;

        // Validate required fields
        if(!name || !nickname || !email || !password || !height || !weight || !age || 
           !gender || !goal || !activityLevel || !bmi || !bmr) {
            res.status(400).json({
                message: "All fields are required",
                receivedData: req.body
            });
            return;
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            res.status(400).json({message: "Email already exists"});
            return;
        }

        // Create user with all fields including BMI and BMR from middleware
        const newUser = {
            name,
            nickname,
            email,
            password,
            height,
            weight,
            age,
            gender,
            goal,
            activityLevel,
            bmi,    // From middleware calculation
            bmr,    // From middleware calculation
            workouts: [],
            badges: []
        };

        const user = await User.create(newUser);

        if(!user) {
            res.status(400).json({message: "Failed to create user"});
            return;
        }

        console.log("User created successfully", user);

        res.status(201).json({
            message: "User created successfully",
            user: user
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
})


const DeleteUser=asyncHandler(async(req, res) => {
    const {id}=req.params
    const user=await User.findByIdAndDelete(id)
    res.status(200).json({message:"User deleted successfully",user})
})  


const UpdateUser=asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        
        // BMI and BMR are already calculated by the middleware
        // and included in req.body
        const user = await User.findByIdAndUpdate(
            id, 
            req.body,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error updating user",
            error: err.message
        });
    }
})  






module.exports = {getUser, CreateUser, DeleteUser, UpdateUser};


