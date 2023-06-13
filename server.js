const express = require("express");
const router = express.Router();
let uname = "Karthika";
let upassword= "12345678";



router.post('/',function(req,res,next){

     const name = req.body.username;
     const  password = req.body.password;
    
  

   if(name == uname && password == upassword)
        res.json({'result': 'Ok'});
    
     else
        res.json({'result': 'Not Valid'});

    console.log(name)
    console.log(password)  
   
   
   
    // res.json(name);


});




module.exports = {router} ;