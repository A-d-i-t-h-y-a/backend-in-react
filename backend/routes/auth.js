const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a User using: POST "/api/auth/createuser". Doesn't require authentication
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
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        .then(user => res.json(user))
        .catch(err=>{console.log("Error :", err)
        res.json({error: "Enter unique value for email", message: err.message})})
        // res.json({nice: "nice"})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some Error Occured");        
    }
})


module.exports = router