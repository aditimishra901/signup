const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const saltRounds=10;


const User = require("../model/User");

router.post("/register",[
  check('name', 'Name length should be 4 to 20 characters')
                  .isLength({ min: 4, max: 20 }),
    check('email', 'Email length should be 6 to 30 characters')
                    .isEmail().isLength({ min: 6, max: 30 }),
    check('password', 'Password length should be 6 to 10 characters')
                    .isLength({ min: 6, max: 10 })
], function (req,res) {

  const errors = validationResult(req);
       if(!errors.isEmpty()){
         res.json(errors);
       }

  const name =req.body.name ;
  const email =req.body.email ;

  User.findOne({email:email},function(err,emailExists){
      if(emailExists)
      {
        return res.status(400).json({
                     "response": "User Already Exists"
                 });
      }

      else{
        bcrypt.hash(req.body.password, saltRounds, function(req,hash){

          const user = new User({
            name:name,
            email:email,
            password:hash
          });
          user.save(function(err){
            if(!err){
              res.json({"response":"successfully added"})
            }
            else{
              res.send(err);
            }



          });



          });

        }
        });



  });



router.post("/login", function (req,res) {

      const email =req.body.email ;
      const password = req.body.password;

      console.log(email);
      console.log(password);

       User.findOne({email: email}).then(user => {
            console.log("before bcrypt");
         bcrypt.compare(password, user.password) // to compare the stored and entered password, returning because this will give us a promise
         .then(equal=>{  //will get a true or false
           if(!equal){
             res.json({"response":"password incorrect"})
        }

        //create and assign token


        const token = jwt.sign({_id:user._id}, "secret");
        console.log("after token generation");
        res.header('auth-token',token).json({token:token, userId:user._id.toString() , message:'User logged in', username:user.name})

   })
   .catch((err) => {
      res.json({"response":"something went wrong"})
     });
}).catch(err => {res.json({"response":"user not found"})})



});
module.exports = router;
