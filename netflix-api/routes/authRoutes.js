require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //check user exist or not
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //password encrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user 
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();

        //token generate 
        const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        res.status(201).json({ token , message:'success'});

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});


//Login

router.post('/login', async (req,res)=>{
    try {
        const { email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.json({status:false, message: 'Invalid Email'});
        }

        const isMatch =  await bcrypt.compare(password, existingUser.password);
        if(!isMatch) {
            return res.json({ status:false, message: 'Invalid password' });
        }

        //generate token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: "Login successful",
            status :true,
            token,
            existingUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



module.exports = router;