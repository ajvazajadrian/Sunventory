const express = require('express');
const router  = express.Router();
const mongoose= require("mongoose")

const foodItem=require("../models/foodItems");

const User=require("../models/user")


router.get("/dash",(req,res,next)=>{
  const user = req.session.currentUser;
  res.render("../views/dash",{user});
})

router.get("/inventory",(req,res,next)=>{
User.findById(req.session.currentUser._id)
.populate("foodItems")
.then(user=>{
  debugger
  res.render("../views/inventory.hbs",{user})
})

.catch(err=>{
  console.log(err)
})
  // // const user = req.session.currentUser;
  // // const foodItems=user.foodItems
  // // const foodItemsContainer=[]
  // // foodItems.forEach(element => {
  // //     foodItem.findById(element.id)
  // //     .then(food=>{
  // //       foodItemsContainer.push(food)
  // //     })
  // //     .catch(err=>{
  // //       console.log(err)
  // //     })
      
  // });


  
  // res.render("../views/inventory",{foodItemsContainer})



})
router.get("/create-item",(req,res,next)=>{
  res.render("create-item")
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
    res.render("../views/update-product.hbs")
})

module.exports=router;