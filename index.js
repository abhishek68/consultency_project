const express = require('express')
const connectToDB  = require('./connection')
const app= express()
const ejs = require('ejs')
const nodemailer = require("nodemailer");
const feedback = require('./models/feedback')
const franchise = require('./models/franchise')
const bcrypt = require('bcrypt');
const user  = require("./models/user")
const session = require('express-session')
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({secret:'key'}))
// fornt page
app.get('/',(req,res)=>{
        res.render('home.ejs');
})

app.post('/feedback',async(req,res)=>{
            const feed1=req.body;
            try{
                   
                    const sender = nodemailer.createTransport({
                        service: "gmail.com",
                        secure: false,
                        port:  587,
                            auth:{
                             user:"19itr002@gmail.com",
                             pass:"SOMEONE23"
                            }
                    }) 
                const composemail={
                        from:"19itr002@gmail.com",
                        to:`${feed1.email}+"19itr002@gmail.com"`,
                        subject:feed1.subject,
                        text:feed1.message
                };
                sender.sendMail(composemail,function(error,info){
                         if(error)
                         {
                                 console.log(error);
                         }
                         else{
                                console.log("success");
                         }
                })
                await feedback.create(feed1);    
                res.render('home.ejs');
            }
            catch(err)
            {
                    res.send(err);
            }
})
// franchise 
app.get('/franchise',(req,res)=>{
    
          try{
                  res.render('getfranchise.ejs')
          }
          catch(err)
          {
              res.send(err);
          }
    }
   
)

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect("/adminLogin");
})

app.post('/franchise',async(req,res)=>{
       try{
             
             await franchise.create(req.body)
             res.render('home.ejs');

       }
       catch(err)
       {

           console.log(err)
       }
})
// admin
app.get('/adminLogin',(req,res) => {
        
        res.render('adminlogin.ejs',{msg:null})
 })

 app.get('/adminSignup',(req,res) => {
        res.render('adminSignup.ejs')
 })

    app.post('/newAdmin',async (req,res) => {
      
    })
    
    app.post("/login",async (req,res) => {
        const person = await user.findOne({email:req.body.email});   
        const data  = await feedback.find({});
        const franc  = await franchise.find({});
        console.log(franc)
        try{
             if(await bcrypt.compare(req.body.pass,person.password))
                  res.render('Adminpage.ejs',{feedback : data,franc : franc});
           
        }catch{
            res.render('adminlogin.ejs',{msg:"Incorrect Password or Email"})
                //res.send('Not Allowed');
        }
    })

    app.get("/deleteFeedback/:id",async (req,res)=>{
      
        await feedback.deleteOne( {_id : req.params.id})
    
        feedback.find({},function(err,data){
            console.log(data)    
          res.render('Adminpage.ejs',{feedback : data})
        })
     
    })
// newAdmin
app.get('/addAdmin',(req,res)=>{
    
        try{
                    res.render('addAdmin.ejs',{msg : null})
        }
        catch(err)
        {
            console.log(err);
        }
    
})
app.post('/addAdmin',async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt();
        const hasedPassword = await bcrypt.hash(req.body.password,salt);
        const newAdmin = {email: req.body.email,password : hasedPassword};
        console.log(req.body)
        await user.create(newAdmin)
        res.render('addAdmin.ejs',{msg : "Account Created"});
     }catch(err){
         console.log(err);
        res.status(500).send();
    }
})

//Franchise
app.get('/viewFranchise',async(req,res)=>{
    try{
          const franc=await franchise.find({})

              console.log(franc)
                res.render('franchise.ejs',{franc});
    }
    catch(err)
    {
        console.log(err);
    }
})
app.get("/deleteFranc/:id",async (req,res)=>{
      
    await franchise.deleteOne( {_id : req.params.id})

    franchise.find({},function(err,data){
        console.log(data)    
        res.render('franchise.ejs',{franc:data});
    })
 
})
app.listen(3000,()=>connectToDB ()
    .then((data)=>console.log("server is running"))
    .catch((err)=> console.log(err))
)