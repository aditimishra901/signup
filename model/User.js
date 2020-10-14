
const mongoose = require("mongoose");

 const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max:20
  },
  email: {
    type: String,
    required: true,
    max: 30,
    min:6
  },
  password: {
    type: String,
    required: true,
    max:10,
    min:6
  },
  createdAt: {
   type: Date,
   default: Date.now()
 }

});

// export model user with UserSchema
module.exports = mongoose.model("User", userSchema);
