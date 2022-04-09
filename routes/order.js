const router = require('express').Router();
const express = require('express');
const Cart = require('../models/Order'); 
const {verifyToken, verifyTokenandAdmin, verifyTokenandAuth} = require('./verifyToken');
const CryptoJS = require('crypto-js');
const Order = require('../models/Order');

//create Order
router.post('/createOrder',verifyTokenandAuth, async(req,res)=>{
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//update Order
router.put('/update-order/:id',verifyTokenandAdmin,async(req,res)=>{

    try{

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true});

        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json(err);
    }

});

//delete Order
router.delete('/delete-order/:id',verifyTokenandAdmin,async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
});

//get one user's orders
router.delete('/get-order/:userId',verifyTokenandAuth,async(req,res)=>{
    try{
        const orders = await Order.find({ userId : req.params.userId});
        res.status(200).json(orders);
    }   
    catch(err){
        res.status(500).json(err);
    }
});


//get all orders of all users
router.get('/get-all-orders/',verifyTokenandAdmin,async(req,res)=>{

    try{

        const orders = await Order.find()
        res.status(200).json(orders);

    }catch(err){
        res.status(500).json(err);
    }

});

//get monthly Income
module.exports = router