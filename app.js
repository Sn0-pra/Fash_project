const express = require('express');
const app = express();

app.set('view engine','ejs');
app.set('views','views');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.use("/public", express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.Mongo_url).then(()=>{
    
    console.log("DBConnection Successfull");

    app.listen(process.env.port || 5500,()=>{
        console.log("Backend server is running");
    });

}).catch((err)=>console.log(err));

app.use((req,res,next) =>{

    console.log('new request made');
    console.log('host : ',req.hostname);
    console.log('path : ',req.path);
    console.log('method : ',req.method);
    //since no response we are sending it does not know where to go hence next function
    next();

});

app.get('/',(req,res)=>{
    res.render('page1/page1-home',{title:'Home'});
});

// app.get("/content", function (req, res) {

//     res.render('page2/page2-content',{title:'Content'});
// });

app.get("/content", function (req, res) {

    const products = [
        // {name:"Roadster",desc:"Pure Cotton",price:"Rs 224",image:"https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2275365/2019/9/10/4f24f563-c764-4f27-9fc5-9ad3dcf167621568108715062-Roadster-Men-White-Solid-Round-Neck-T-shirt-1641568108713591-1.jpg"},
        // {name:"Denim",desc:"Mixed Cotton",price:"Rs 500",image:"https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2021/3/18/1ab6d9e3-e5c3-46e6-adc0-6066105b01a81616060924389-1.jpg"},
        {title:"Blog-1",snippet:"Blog 1 content is here"},
        {title:"Blog-2",snippet:"Blog 2 content is here"},
        {title:"Blog-3",snippet:"Blog 3 content is here"},
        {title:"Blog-4",snippet:"Blog 4 content is here"}
    ]

    res.render('page2/page2-content',{title:'Content',products});

    // res.render('page6/page6-bag',{title:'Bag',orders});


});

app.get('/about',(req,res)=>{
    res.render('page3/page3-about',{title:'About'});
});

app.get('/profile',(req,res)=>{
    res.render('page4/page4-profile',{title:'Profile'});
});

app.get('/signpage',(req,res)=>{
    res.render('page4/page4-signpage',{title:'SignPage'});
});

app.get('/signInpage',(req,res)=>{
    res.render('page4/page4-signInpage',{title:'SignInPage'});
});

app.get('/signUppage',(req,res)=>{
    res.render('page4/page4-signUppage',{title:'SignUpPage'});
});

app.get('/wishlist',(req,res)=>{
    res.render('page5/page5-wishlist',{title:'Wishlist'});
});

app.get('/bag',(req,res)=>{

    const orders = [
        {title:"Blog-1",snippet:"Blog 1 content is here"},
        {title:"Blog-2",snippet:"Blog 2 content is here"},
        {title:"Blog-3",snippet:"Blog 3 content is here"},
        {title:"Blog-4",snippet:"Blog 4 content is here"}
    ]

    res.render('page6/page6-bag',{title:'Bag',orders});
    // res.render('indexDemo',{title:'Bag',blogs});
});

// 404 middleware
app.use((req,res)=>{
    res.status(404).render('404' ,{title : '404'});
})