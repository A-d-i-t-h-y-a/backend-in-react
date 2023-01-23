const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "HeisaGoodBoy"


// ROUTE 1: Create a User using: POST "/api/auth/createuser". No Login Required
router.post('/createuser',[
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 }),
],  async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{

        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({error: "Email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt)
        // Createing User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({authToken: authToken})
        // .then(user => res.json(user))
        // .catch(err=>{console.log("Error :", err)
        // res.json({error: "Enter unique value for email", message: err.message})})
        // res.json({nice: "nice"})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");        
    }
})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No Login Required
router.post('/login',[
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
],  async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        const passcomp = await bcrypt.compare(password, user.password);
        if(!passcomp){
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken: authToken})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");    
    }
})

// ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser". Login Required

router.post('/getuser', fetchuser, async (req, res)=>{

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
});


module.exports = router