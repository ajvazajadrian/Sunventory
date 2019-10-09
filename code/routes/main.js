const express = require('express');
const router  = express.Router();
const mongoose= require("mongoose")

const foodItem=require("../models/foodItems");

const User=require("../models/user")


router.get("/dash",(req,res,next)=>{
  if(req.session.currentUser){
  const user = req.session.currentUser;
  res.render("../views/dash",{user});
  }
  else{
    res.redirect("/login");
  }
})

router.get("/inventory",(req,res,next)=>{
  if(req.session.currentUser){
User.findById(req.session.currentUser._id)
.populate("foodItems")
.then(user=>{
  debugger
  res.render("../views/inventory.hbs",{user})
})

.catch(err=>{
  console.log(err)
})
  }else{
    res.redirect("/")
  }
})
router.get("/create-item",(req,res,next)=>{
  if(req.session.currentUser){   
    res.render("create-item")
  }else{
    res.redirect("/login")
  }
})

router.post("/create-item",(req,res,next)=>{
    const name=req.body.productName;
    const dateOfPurchase=req.body.dateOfPurchase;
    const expiryDate= req.body.expiryDate;
    
    foodItem.create({name:name,dateOfPurchase:dateOfPurchase, expiryDate:expiryDate})
    .then((food)=>{
      User.findByIdAndUpdate(req.session.currentUser._id,{$push:{foodItems:food._id}},{new:true})
      .then((updatedUser)=>{
        debugger
        console.log(updatedUser)
        res.redirect("/create-item")
      })
    })
    .catch(err=>{
      console.log(err)
    })
  
})

router.get("/updateItem",(req,res,next)=>{
  if(req.session.currentUser){
    res.render("../views/update-product.hbs")
  }else{
    res.redirect("/login")
  }
})

module.exports=router;