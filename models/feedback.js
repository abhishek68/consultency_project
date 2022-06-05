const mongoose = require('mongoose');
const feedback = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    }
})
const  feed = mongoose.model("feedback",feedback);
module.exports =feed;