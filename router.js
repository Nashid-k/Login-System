var express = require('express')
var router = express.Router();
let logout=false
let wrongcred=false

const credential ={
    email : "admin@gmail.com",
    password : "admin123"
}

//home route
router.get('/',(req,res)=>{

    
    if(!req.session.user){
     if(logout)
     {
        logout=false
        res.render('base',{title:"Express",logout:"Logout Successfully"})
     }else if(wrongcred){

        res.render('base',{title :"Login System",failed:"Invalid username or password...!"})
       
     }else
     {
        res.render('base',{title:"Login System"});
     }
    }else{
   
        res.redirect('/dashboard')
    }
})

//login user
router.post('/login',(req,res)=>{
    
    if(req.body.email==credential.email && req.body.password==credential.password){
        req.session.user=req.body.email,
        res.redirect('/dashboard');

    }else{
        wrongcred=true
        res.redirect('/')

     
    }
})


//route for dashboard
router.get('/dashboard',(req,res)=>{

    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
       res.redirect('/')
    }
})



//route for logout
router.get('/logout',(req,res)=>{
    req.session.user=null
    req.session.destroy()
    logout=true
    res.redirect('/')
})







module.exports = router;