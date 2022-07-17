const moongoose = require("mongoose")

const connectToDB = async()=>moongoose.connect("mongodb+srv://ak:ak@cluster0.v7oxg.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
   
    useUnifiedTopology:true,
}).then(() => console.log("DB connected"));

module.exports  = connectToDB 