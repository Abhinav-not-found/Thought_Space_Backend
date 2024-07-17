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
module.exports = router;
