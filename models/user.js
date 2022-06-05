const mongoose = require('mongoose');
const User = new mongoose.Schema({
   
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
   
})
const  user = mongoose.model("Users",User);
module.exports =user;