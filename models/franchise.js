const mongoose = require('mongoose');
const franchise1 = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    number:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    pincode:{
        type:String,
        require:true
    }
})
const  franchise = mongoose.model("franchise1",franchise1);
module.exports =franchise;