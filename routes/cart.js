const router = require('express').Router();
const express = require('express');
const Cart = require('../models/Cart'); 
const {verifyToken, verifyTokenandAdmin, verifyTokenandAuth} = require('./verifyToken');
const CryptoJS = require('crypto-js');

//create cart
router.post('/createCart',verifyTokenandAuth, async(req,res)=>{
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//update cart
router.put('/update-cart/:id',verifyTokenandAuth,async(req,res)=>{

    try{

        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true});

        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }

});

//delete cart
router.delete('/delete-cart/:id',verifyTokenandAuth,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
});

//get one user's cart
router.delete('/get-cart/:userId',verifyTokenandAuth,async(req,res)=>{
    try{
        const cart = await Cart.findOne({userId : req.params.userId});
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json(err);
    }
});


//get all carts of all users
router.get('/get-all-carts/',verifyTokenandAdmin,async(req,res)=>{

    try{

        const carts = await Cart.find()
        res.status(200).json(carts);

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router