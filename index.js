require('dotenv').config();
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const authRoute = require("./routes/auth");
const personalRoute = require("./routes/personal");


// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) =>{  // To remove CROS (cross-resource-origin-platform) problem
    res.setHeader('Access-Control-Allow-Origin',"*"); // to allow all client we use *
    res.setHeader('Access-Control-Allow-Methods',"OPTIONS,GET,POST,PUT,PATCH,DELETE"); //these are the allowed methods
    res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
    next();
})

mongoose.connect("mongodb+srv://test:aditi@cluster0.403sd.mongodb.net/projectDB?retryWrites=true&w=majority",{
  useNewUrlParser: true,
        useUnifiedTopology: true
},
function(){console.log("connected to db");}
);


app.use("/api/user", authRoute);
app.use("/api/personal", personalRoute);


app.get("/", (req, res) => {
  res.send("WORKING");
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port,function(req, res) {
  console.log("Server running at port 3000");
});
