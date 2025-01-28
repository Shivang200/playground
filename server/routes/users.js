const express = require('express');
const router = express.Router();
const zod = require('zod');
const { default: mongoose } = require('mongoose')
const authMiddleware = require('../middlewares/middleware.js')




const newUserModel = require('../models/model.js');
const jwt = require('jsonwebtoken')
require('dotenv').config();


const userValidate = zod.object({
    username : zod.string().email(),
    passwords : zod.string(),
    firstname : zod.string(),
    lastname : zod.string(),
})

const userSigninDetails = zod.object({
    username : zod.string().email(),
    passwords : zod.string(),
})
// router.get('/')
router.post('/signup',async (req,res)=>{
    const userDetails =req.body;
    const respond= userValidate.safeParse(userDetails);

    if(!respond.success){
        return res.json({
            msg : "Invalid input."
        })
    }
    const existingUser= await newUserModel.findOne({
        username : respond.data.username
    })
    if(existingUser){
        return res.json({
            msg : "user already exists."
        })
    }
    const newUser= await newUserModel.create({
        username : respond.data.username,
        passwords : respond.data.passwords,
        firstname : respond.data.firstname,
        lastname : respond.data.lastname
    })



    const userId = newUser._id
    const token = jwt.sign({
        userId : userId,


    },process.env.JWT_SECRET
);

res.json({
    msg : "User created successfully",
    token : token
})
    


})


//signin

router.post('/signin',async (req,res)=>{
    const userDetails =req.body
    const respond = userSigninDetails.safeParse(userDetails);

    if(!respond.success){
        return res.json({
            msg : "Invalid input."
        })
    }
    try {
        const user = await newUserModel.findOne({ username: respond.data.username });
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }
        const userPassword = await newUserModel.findOne({ passwords: respond.data.passwords });
        if (!userPassword) {
            return res.status(404).json({ msg: "Invalid credentials" });
        }





        
        const token = jwt.sign({
            userId : user._id
        },process.env.JWT_SECRET)
    
        res.json({ msg: "Login successful", token });
    } catch (e) {
        console.log(e);
        res.status(500).json({msg: "An error occurred during login."})
        
    }
})

router.get('/allUsers',async(req,res)=>{
    const users = await newUserModel.find();
    res.json({
        user: users.map((u)=>{{
            firstname : u.firstname
             
        }})
    })
})
router.get('/getUser', authMiddleware, async (req, res) => {
    try {
      const userId = req.userId; // Ensure authMiddleware sets req.userId
  
      // Find user by ID in the database
      const findUsername = await newUserModel.findOne({ _id: userId });
  
      // Handle case where user is not found
      if (!findUsername) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const name = findUsername.firstname; // Extract the firstname field
  
      // Respond with the user's first name
      res.json({
        firstname: name,
      });
    } catch (error) {
      console.error(error); // Log any errors
      res.status(500).json({ error: 'Server error' }); // Send generic server error response
    }
  });

module.exports= router