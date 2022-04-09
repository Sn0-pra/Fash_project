const User = require('../models/User');
const {verifyToken,verifyTokenandAuth, verifyTokenandAdmin} = require('./verifyToken')
const router = require('express').Router();
const CryptoJS = require('crypto-js');

//get request trial
// router.get('/usertest/',(req,res)=>{
//     console.log('usertest called');
// });

//post request trial
// router.post('/posttest/',(req,res)=>{
//     const username = req.body.username
//     console.log(username)
//     res.send("Your ussername: "+username);
// })

//udpdate user info
router.put('/:id',verifyTokenandAuth,async(req,res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.Pass_AES
        ).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true});

        res.status(200).json(updatedUser);

    }catch(err){
        res.status(500).json(err);
    }
});

//delete User

router.delete('/delete-user/:id',verifyTokenandAuth,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
});

//get user

router.get('/find/:id',verifyTokenandAdmin,async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const{password, ...others} = user._doc;
        res.status(200).json({others});
    }
    catch(err){
        res.status(500).json(err)
    }
});

//get all users

router.get('/userlist',verifyTokenandAdmin,async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get only new five users when query '/new=true' is called
router.get('/',verifyTokenandAdmin,async(req,res)=>{
    const query = req.query.new
    try{
        const users = query ? await User.find().sort({_id:-1}).limit(1) : await User.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get users stats per month
//check out video at 02.05.00 - 02.06.54 

module.exports = router