const express = require("express");
const router = express.Router();
const verify = require('./verifyToken');

router.get("/",verify,function(req,res){

   res.json({personal:{title:"secret diary", secret: "shhhh it's a secret!!"}});

});

module.exports = router;
