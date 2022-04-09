//It is highly recommended to write auth route separately for secure app
const router = require('express').Router()
const express = require('express');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//register user

router.post('/register',async(req,res)=>{
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password,process.env.Pass_AES).toString()
    });

    try{
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(200).json(savedUser);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }

});

//login user

router.post('/login', async(req,res)=>{
    try{
        
        const user = await User.findOne({username : req.body.username});
        !user && res.status(401).json("Wrong Credentials");
        
        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.Pass_AES);
        const unhashedpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        unhashedpassword !== req.body.password && res.status(401).json("Wrong Credentials");

        const accesstoken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },
            process.env.Pass_JWT,
            {expiresIn:"3d"}
        );

        //send user without password info
        const { password, ...others } = user._doc;
    
        res.status(200).json({...others,accesstoken})
    
    }catch(err){
        res.status(500).json(err);
    }

});



module.exports = router