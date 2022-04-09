const router = require("express").Router()
const stripe = require("stripe")(process.env.Stripe_key)

router.post("/payment",(req,res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "inr"
    },(stripe_err,stripe_res)=>{
        if(stripe_err){
            res.status(500).json(stripe_err);
        }else{
            res.status(200).json(stripe_res);
        }
    })
})

module.exports = router;