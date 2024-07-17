const express = require('express');
const router = express.Router();
const Model = require('../Models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require('jsonwebtoken')
// const jwtSecret = process.env.jwtSecret
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Validate inputs
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Please provide email, username, and password" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user instance
        const user = new Model({ email, username, password: hashedPassword });

        // Save user to database
        const newUser = await user.save();

        // Respond with success message and new user data
        res.status(200).json({ message: "User Created Successfully", newUser });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await Model.findOne({email})
        if(!user){
            res.status(404).json({message:'User not found'})
        }
        const username = user.username
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            res.status(400).json({message:'Invalid Credentials'})
        }
        

        const token = jwt.sign({userId:user._id, email:user.email},process.env.jwtSecret,{expiresIn:'1h'})

        res.status(200).json({message:'Login Successfull',token,username})


    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
})

router.get('/setting',async(req,res)=>{
    try {
        const users = await Model.find()
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
})
//check Email
router.post('/register/checkEmail',async(req,res)=>{
    try {
        const {email} = req.body
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const check = await Model.findOne({email:email})
        if(!check){
            res.status(201).json({message:'User Not Found'})
        }
        else{
            res.status(200).json({message:'User Found Successfully'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
})
//check Username
router.post('/register/checkUsername',async(req,res)=>{
    try {
        const {username} = req.body
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }
        const check = await Model.findOne({username:username})
        if(!check){
            res.status(201).json({message:'Username Not Found'})
        }
        else{
            res.status(200).json({message:'Username Found Successfully'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
})
module.exports = router;
