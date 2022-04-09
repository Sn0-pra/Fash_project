const router = require('express').Router();
const express = require('express');
const Product = require('../models/Product');
const {verifyToken, verifyTokenandAdmin, verifyTokenandAuth} = require('./verifyToken');
const CryptoJS = require('crypto-js');

//create product
router.post('/createProduct', verifyTokenandAdmin, async(req,res)=>{
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//update product
router.put('/update-product/:id',verifyTokenandAdmin,async(req,res)=>{

    try{

        const updatedproduct = await Product.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true});

        res.status(200).json(updatedproduct);
    }catch(err){
        res.status(500).json(err);
    }

});

//delete product
router.delete('/delete-product/:id',verifyTokenandAuth,async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
});

//get product
router.delete('/get-product/:id',async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
});


//get product list
router.get('/get-product/',async(req,res)=>{

    const qNew = req.query.new;
    const qcategory = req.query.category;

    try{

        let products ;

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5);
        }
        else if(qcategory){
            products = await Product.find({categories:{
                $in : [qcategory]
            }})
        }
        else{
            products = await Product.find();
        }

        res.status(200).json(products);

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router