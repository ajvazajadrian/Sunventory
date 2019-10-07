const express = require('express');
const router  = express.Router();


const foodItem=require("../models/foodItems");

router.get("/dash",(req,res,next)=>{
  const user = req.session.currentUser;
  res.render("../views/dash",{user})
})

router.get("/create-item",(req,res,next)=>{
  res.render("create-item")
})

router.post("create-item",(req,res,next)=>{
    const name=req.body.productName;
    const dateOfPurchase=req.body.dateOfPurchase;
    const expiryDate= req.body.expiryDate;

    foodItem.create({name:name,dateOfPurchase:dateOfPurchase, expiryDate:expiryDate})

})


module.exports=router;