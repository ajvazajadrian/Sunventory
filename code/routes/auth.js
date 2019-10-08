const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User= require("../models/user");

router.get("/signup",(req,res,next)=>{
  res.render("../views/auth/signup.hbs")
})

router.post("/signup",(req,res,next)=>{

  const username= req.body.username;
  const password= req.body.password;
  
  if(username===""||password===""){
    res.render("/views/auth/signup.hbs",{
      errorMessage:"You have to fill in both password and username!"
  })

  return;

  }

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass= bcrypt.hashSync(password,salt);

  User.findOne({username:username})
  .then(user=>{
    if(user!==null){
      res.render("../views/auth/signup.hbs",{
        errorMessage:"This username does already exist!"
      })
      return;
    }else{
      User.create({username:username,password:hashPass});
      res.redirect("/login")
    }
  })
  .catch(err=>{
    console.log(err)
  })
})

router.get("/login",(req,res,next)=>{
  
  res.render("../views/auth/login.hbs")
})

router.post("/login",(req,res,next)=>{
  const username=req.body.username;
  const password= req.body.password;
  if(username===""||password===""){
    res.render("../views/auth/login.hbs",{errorMessage:"You have to enter both password and username!"
  })
    return;
  }

  User.findOne({username: username})
    .then(user=>{
      if(!user){
        res.render("../views/auth/login.hbs",{errorMessage:"Wrong username or password"})
      }

        if(bcrypt.compareSync(password,user.password)){
          req.session.currentUser=user;
          res.redirect("/dash")
        }else{
          res.render("../views/auth/login.hbs",{errorMessage:"Wrong username or password"});
          return;
        }
  })
  .catch(err=>{
    console.log(err)
  })
})

router.get('/logout', (req, res, next)=> {
  if (req.session) {
    // delete session object
    req.session.destroy(err=> {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports=router;